#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FCSAPI.Data;
using FCSAPI.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FCSAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public IConfiguration _configuration;

        public UsersController(IConfiguration configuration, DataContext context)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.Include(r=>r.RoleName).ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Register")]
        public async Task<ActionResult<User>> Register([FromBody] User user)
        {
            var newuser = _context.Users.Where(x => x.Email.Equals(user.Email)).FirstOrDefault();

            if (newuser == null)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                var userName = RandomUserName(10, false);
                user.RoleId = 3;
                user.UserName = userName;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetUser", new { id = user.Id }, user);
            }
            else
                return BadRequest( new
                {
                    Success = false,
                    Message = "Email already exist!"
                });
            
        }
        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromBody] User user)
        {
            var newuser = _context.Users.Where(x => x.Email.Equals(user.Email)).FirstOrDefault();
            if (newuser == null)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUser", new { id = user.Id }, user);
            }
            else
                return BadRequest(new
                {
                    Success = false,
                    Message = "Email already exist!"
                });

        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Login")]
        public async Task<IActionResult> Login ([FromBody] User user)
        {
            if (user != null && user.Email != null && user.Password != null)
            {
                var userData = _context.Users.Include(r=> r.RoleName).Where(a => a.Email.Equals(user.Email)).FirstOrDefault();

                if (userData != null && BCrypt.Net.BCrypt.Verify(user.Password, userData.Password ))
                {
                    var token = GenerateToken(userData.Email, userData.Password);
                    return Ok( new
                    {
                        Success = true,
                        Message = "Login successfully",
                        Data = userData,
                        Token = token   
                    });
                }
                else
                {
                    return NotFound(new
                    {
                        Success = false,
                        Message = "User Not found"
                    });
                }
            }
            else
            {
                return BadRequest( new {
                    Success = false,
                    Message = "Invalid Credentials"
                });   
            }
            //var userLogin = _context.Users.Where(x => x.Email.Equals(user.Email)).FirstOrDefault();

            //bool isvalidPassword = BCrypt.Net.BCrypt.Verify(user.Password, userLogin.Password);
           

            //if (isvalidPassword)
            //{
            //    return userLogin;
            // }
            //return null;


        }
        [NonAction]
        [HttpGet]
        public async Task<User> GetUserLogin(string email, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }


        private string GenerateToken (string email, string password)
        {
            var userData = GetUserLogin(email,password);
            var jwt = _configuration.GetSection("Jwt").Get<Jwt>();
            if (userData != null)
            {
                var claims = new[]
                {
                        new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        //new Claim("Id", user.Id.ToString()),
                        //new Claim("Email", user.Email),
                        //new Claim("Password", user.Password),
                        //new Claim("UserName", user.UserName),
                        new Claim(ClaimTypes.Email,email),
                    };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.key));
                var login = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    jwt.Issuer,
                    jwt.Audience,
                        claims,
                        expires: DateTime.Now.AddMinutes(20),
                        signingCredentials: login
                    );
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            else
            {
                return "Invalid Credential";
            }
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private string RandomUserName(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }
    }
}
