import { motion } from "framer-motion";
import { ChevronDown, Star, Flame } from "lucide-react";

const Hero = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    menuSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&h=1080&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 text-primary/20"
        >
          <Flame className="h-24 w-24" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-40 right-10 text-primary/20"
        >
          <Flame className="h-32 w-32" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
        

          {/* Main Title */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-gradient-fire mb-4 tracking-wider">
            KASH SMASH
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Halal Smash Burgers • Crispy Chicken • Loaded Fries
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToMenu}
            className="group inline-flex items-center gap-2 bg-gradient-fire text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-fire hover:shadow-glow transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Menu
            <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>

      
      </div>
    </section>
  );
};

export default Hero;
