import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { MenuItem } from "@/data/menuData";

interface MenuCardProps {
  item: MenuItem;
  onClick: () => void;
}

const MenuCard = ({ item, onClick }: MenuCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-gradient-card rounded-2xl overflow-hidden shadow-card hover:shadow-fire transition-all duration-300 cursor-pointer border border-border/50"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Badge */}
        {item.badge && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            {item.badge}
          </div>
        )}

        {/* Quick Add Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-fire text-primary-foreground shadow-fire opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <Plus className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          {item.rating && (
            <div className="flex items-center gap-1 text-primary shrink-0">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{item.rating}%</span>
            </div>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl text-primary">
            £{item.price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">
            {item.addOns.length > 0 ? `${item.addOns.length} add-ons available` : ""}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
