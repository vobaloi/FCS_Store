namespace FCSAPI.Models
{
    public class SubCategory
    {
        public int Id { get; set; }

        public string SubCategoryName { get; set; } = string.Empty;

        public string SubCategoryDescription { get; set; } = string.Empty;

        public int CategoryId { get; set; }

        public Category? CategoryName { get; set; }
    }
}
