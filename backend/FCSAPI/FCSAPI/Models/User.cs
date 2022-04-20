namespace FCSAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string UserName { get; set; }

        public string Telephone { get; set; }

        public string Address { get; set; }

        public int RoleId { get; set; }

        public Role? RoleName { get; set; }
    }
}
