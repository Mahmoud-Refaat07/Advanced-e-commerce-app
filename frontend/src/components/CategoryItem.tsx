import { Link } from "react-router-dom";

interface Props {
  item: {
    href: string;
    name: string;
    imageUrl: string;
  };
}
const CategoryItem = ({ item }: Props) => {
  return (
    <div className="relative overflow-hidden h-96 w-full rounded-lg group">
      <Link to={"/category" + item.href}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-900/50">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-white text-2xl font-bold mb-2">
                {item.name}
              </h3>
              <p className="text-gray-200 text-sm">Explore {item.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
