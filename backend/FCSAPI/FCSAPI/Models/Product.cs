using System.ComponentModel.DataAnnotations.Schema;

namespace FCSAPI.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string ProductName { get; set; }= string.Empty;

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        //[NotMapped]
        //public IFormFile ImageFile { get; set; } 

        public string ImageURL { get; set; } = string.Empty; 

        public int SubCategoryId { get; set; }

        public SubCategory? SubCategory { get; set; }

    }
}
