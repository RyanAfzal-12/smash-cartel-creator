import { motion } from "framer-motion";
import { categories } from "@/data/menuData";

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryNav = ({ activeCategory, onCategoryChange }: CategoryNavProps) => {
  return (
    <div className="sticky top-[73px] z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <nav className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium transition-all
                ${
                  activeCategory === category.id
                    ? "bg-gradient-fire text-primary-foreground shadow-fire"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoryNav;
