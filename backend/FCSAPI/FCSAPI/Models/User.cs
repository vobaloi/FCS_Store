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
}
