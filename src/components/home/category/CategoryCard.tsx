interface Category {
    id: number;
    name: string;
    icon: string;
}

const CategoryCard = ({data}: {data: Category}) => {
  return (
    <div className="border border-gray-300 p-4 rounded-sm flex flex-col items-center">
      <img src={data.icon} alt={data.name} />
      <h3>{data.name}</h3>
    </div>
  )
}

export default CategoryCard