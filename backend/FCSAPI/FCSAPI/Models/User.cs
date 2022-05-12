namespace FCSAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; } = string.Empty;   

        public string Password { get; set; } = string.Empty;

        public string UserName { get; set; }= string.Empty;

        public string Telephone { get; set; } = string.Empty;   

        public string Address { get; set; } = string.Empty;
        public int RoleId { get; set; }

        public Role? RoleName { get; set; }
    }

    public class Jwt
    {
        public string key { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Subject { get; set; }
    }
}
