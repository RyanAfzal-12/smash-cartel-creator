import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, categories } from "@/data/menuData";
import CategoryNav from "./CategoryNav";
import MenuCard from "./MenuCard";
import ItemModal from "./ItemModal";
import { MenuItem } from "@/data/menuData";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);
  const currentCategory = categories.find((c) => c.id === activeCategory);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  // Scroll to category section when category changes
  useEffect(() => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      const headerOffset = 140; // Account for sticky header and nav
      const elementPosition = menuSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [activeCategory]);

  return (
    <section id="menu" className="py-8">
      <CategoryNav activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="font-display text-4xl md:text-5xl text-gradient-fire mb-2">
            {currentCategory?.emoji} {currentCategory?.name}
          </h2>
          <p className="text-muted-foreground">
            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} available
          </p>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { delay: index * 0.05 }
                }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <MenuCard item={item} onClick={() => handleItemClick(item)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No items available in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Item Modal */}
      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default MenuSection;
