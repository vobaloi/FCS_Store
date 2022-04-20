using FCSAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FCSAPI.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

    }
}
