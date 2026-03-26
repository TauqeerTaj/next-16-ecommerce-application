export default function CategoriesSidebar() {
  const categories = [
    { name: "Women's Fashion", href: "/category/women" },
    { name: "Men's Fashion", href: "/category/men" },
    { name: "Electronics", href: "/category/electronics" },
    { name: "Home & Living", href: "/category/home" },
    { name: "Medicine", href: "/category/medicine" },
    { name: "Sports & Outdoors", href: "/category/sports" },
    { name: "Baby's & Toys ", href: "/category/toys" },
    { name: "Groceries & Pets", href: "/category/groceries" },
    { name: "Health & Beauty", href: "/category/health" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="">
        {categories.map((category) => (
          <a
            key={category.name}
            href={category.href}
            className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">
              {category.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
