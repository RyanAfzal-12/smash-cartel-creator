import { motion } from "framer-motion";
import { ShoppingCart, MapPin, Clock, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/icon.png"
              alt="Smash Burgers Icon"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-fire blur-xl opacity-50" />
              <h1 className="relative font-display text-3xl md:text-4xl text-gradient-fire tracking-wider">
                SMASH BURGERS
              </h1>
            </div>
          </motion.div>

          {/* Info & Cart */}
          <div className="flex items-center gap-6">
            
            {/* Location */}
            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">6 Byron Place, Bristol</span>
            </div>

            {/* Hours */}
            <div className="hidden lg:flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm">12:00 PM - 4:00 AM</span>
            </div>

            {/* Dashboard Link */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/orders"
                className="relative flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2.5 font-medium text-foreground transition-all hover:bg-accent"
              >
                <Package className="h-5 w-5" />
                <span className="hidden sm:inline">Orders</span>
              </Link>
            </motion.div>

            {/* Cart Button */}
            <motion.button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-gradient-fire px-4 py-2.5 font-medium text-primary-foreground transition-all hover:shadow-fire"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>

              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
          </div>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;
