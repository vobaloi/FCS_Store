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
using Microsoft.AspNetCore.Authorization;

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
            return await _context.Users.Include(r => r.RoleName).ToListAsync();
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
                //return CreatedAtAction("GetUser", new { id = user.Id }, user);
                return Ok(new
                {
                    Success = true,
                    Message = "Register Successful",
                    Data = user
                });
            }
            else
                return Ok(new
                {
                    Success = false,
                    Message = "Email already exist!"
                });

        }
        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromBody] User user)
        {
            var newuser = _context.Users.Where(x => x.Email.Equals(user.Email)).FirstOrDefault();
            var checkTel = _context.Users.Where(x => x.Telephone.Equals(user.Telephone)).FirstOrDefault();
            if (newuser == null)
                { 
                if (checkTel == null)
                {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("GetUser", new { id = user.Id }, user);
                } else {
                    return Ok(new
                    {
                        Success = false,
                        Message = "Telephone is used"
                    });
                } 
            }
            else
                return Ok(new
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
        public async Task<IActionResult> Login([FromBody] User user)
        {
            if (user != null && user.Email != null && user.Password != null)
            {
                var userData = _context.Users.Include(r => r.RoleName).Where(a => a.Email.Equals(user.Email)).FirstOrDefault();

                if (userData != null && BCrypt.Net.BCrypt.Verify(user.Password, userData.Password))
                {
                    var token = GenerateToken(userData.Email, userData.Password);
                    return Ok(new
                    {
                        Success = true,
                        Message = "Login successfully",
                        Data = userData,
                        Token = token
                    });
                }
                else
                {
                    return Ok(new
                    {
                        Success = false,
                        Message = "User Not found"
                    });
                }
            }
            else
            {
                return BadRequest(new
                {
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
        //[NonAction]
        //[HttpGet]
        //public  Task<User> GetUserLogin(string email)
        //{
        //    return _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        //}


        private string GenerateToken(string email, string password)
        {
            var userData = _context.Users.FirstOrDefault(u => u.Email == email);
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
                        new Claim("Id",userData.Id.ToString()),
                        new Claim(ClaimTypes.Email,email),
                        new Claim(ClaimTypes.Role,userData.RoleName.RoleName),
                        new Claim(ClaimTypes.Name,userData.UserName),
                        new Claim(ClaimTypes.MobilePhone,userData.Telephone),
                        new Claim("Address",userData.Address),

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

        [HttpGet("UserLogin")]
        [Authorize]
        public async Task<IActionResult> GetUserLogin()
        {
            string userID = User.Claims.FirstOrDefault(c => c.Type == "Id").Value;
            int Id = Int32.Parse(userID);
            var user = await _context.Users.Include(r=> r.RoleName).FirstOrDefaultAsync(c=> c.Id.Equals(Id));
            if (user != null)
            {
                return Ok(new
                {
                    Succes = true,
                    Data = user,

                });
            }
            else
            {
                return Ok(new
                {
                    Success = false,
                    Message = "User not found"
                });
            }
            
        }
    }
}
