import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Check, Star } from "lucide-react";
import { MenuItem, AddOn } from "@/data/menuData";
import { useCart } from "@/context/CartContext";

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ItemModal = ({ item, isOpen, onClose }: ItemModalProps) => {
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    if (item) {
      // Pre-select required add-ons
      const requiredAddOns = item.addOns.filter((a) => a.required);
      setSelectedAddOns(requiredAddOns);
      setQuantity(1);
      setInstructions("");
    }
  }, [item]);

  if (!item) return null;

  const toggleAddOn = (addOn: AddOn) => {
    if (addOn.required) return; // Can't toggle required add-ons
    
    setSelectedAddOns((prev) => {
      const exists = prev.find((a) => a.id === addOn.id);
      if (exists) {
        return prev.filter((a) => a.id !== addOn.id);
      }
      return [...prev, addOn];
    });
  };

  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = (item.price + addOnsTotal) * quantity;

  const handleAddToCart = () => {
    addItem(item, selectedAddOns, instructions || undefined);
    onClose();
  };

  // Group add-ons by category
  const addOnsByCategory = item.addOns.reduce((acc, addOn) => {
    if (!acc[addOn.category]) {
      acc[addOn.category] = [];
    }
    acc[addOn.category].push(addOn);
    return acc;
  }, {} as Record<string, AddOn[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-hidden rounded-2xl bg-card border border-border shadow-2xl"
          >
            {/* Image Header */}
            <div className="relative h-48 md:h-56">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Item Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  {item.badge && (
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      {item.badge}
                    </span>
                  )}
                  {item.rating && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-background/80 text-foreground text-xs font-semibold">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      {item.rating}%
                    </span>
                  )}
                </div>
                <h2 className="font-display text-3xl text-foreground">{item.name}</h2>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[calc(90vh-12rem-5rem)] overflow-y-auto p-4 space-y-4">
              <p className="text-muted-foreground">{item.description}</p>

              {/* Add-ons by Category */}
              {Object.entries(addOnsByCategory).map(([category, addOns]) => (
                <div key={category} className="space-y-3">
                  <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                    {category}
                    {addOns.some((a) => a.required) && (
                      <span className="text-xs font-sans px-2 py-0.5 rounded bg-primary/20 text-primary">
                        Required
                      </span>
                    )}
                  </h3>
                  <div className="space-y-2">
                    {addOns.map((addOn) => {
                      const isSelected = selectedAddOns.find((a) => a.id === addOn.id);
                      return (
                        <motion.button
                          key={addOn.id}
                          onClick={() => toggleAddOn(addOn)}
                          disabled={addOn.required}
                          className={`
                            w-full flex items-center justify-between p-3 rounded-xl border transition-all
                            ${
                              isSelected
                                ? "bg-primary/10 border-primary"
                                : "bg-secondary/50 border-border hover:border-primary/50"
                            }
                            ${addOn.required ? "opacity-80 cursor-not-allowed" : "cursor-pointer"}
                          `}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`
                                flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors
                                ${
                                  isSelected
                                    ? "bg-primary border-primary"
                                    : "border-muted-foreground"
                                }
                              `}
                            >
                              {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                            <span className="font-medium">{addOn.name}</span>
                          </div>
                          <span className="text-primary font-semibold">
                            {addOn.price === 0 ? "Free" : `+£${addOn.price.toFixed(2)}`}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Special Instructions */}
              <div className="space-y-2">
                <h3 className="font-display text-lg text-foreground">Special Instructions</h3>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Add any special requests here..."
                  className="w-full p-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 p-4 bg-card border-t border-border">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-fire text-primary-foreground py-4 rounded-full font-semibold text-lg shadow-fire hover:shadow-glow transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart • £{totalPrice.toFixed(2)}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ItemModal;
