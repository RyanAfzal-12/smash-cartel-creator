import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl text-gradient-fire mb-4">
              KASH SMASH
            </h3>
            <p className="text-muted-foreground mb-4">
              Halal smash burgers, crispy chicken, and loaded fries. The best comfort food in Bristol.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>6 Byron Place, Bristol, BS8 1JT</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>+44 117 XXX XXXX</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-4">Opening Hours</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p>Mon - Fri: 2:00 PM - 4:00 AM</p>
                  <p>Sat - Sun: 12:00 PM - 4:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm">
          <p>© 2024 kash smash. All rights reserved. 100% Halal.</p>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-primary transition-colors font-medium">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
