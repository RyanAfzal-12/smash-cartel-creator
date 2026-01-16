import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, User, Smartphone, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Cart = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Guest Form States
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestAddress, setGuestAddress] = useState("");
  
  // OTP States
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  
  // Success States
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const deliveryFee = 2.99;
  const serviceFee = 0.99;
  const total = subtotal + deliveryFee + serviceFee;

  const requestOTP = async () => {
    const phone = isAuthenticated ? user?.phone : guestPhone;
    
    if (!phone) {
        toast.error("Phone number missing", { description: "Please enter your phone number." });
        return;
    }
    
    setIsSendingOTP(true);
    try {
        const response = await fetch('http://localhost:3001/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });
        if (response.ok) {
            setShowOTPInput(true);
            toast.success("OTP Sent!", { description: `Sent to ${phone}. Check server console!` });
        }
    } catch (error) {
        toast.error("Failed to send OTP");
    } finally {
        setIsSendingOTP(false);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    const isAdmin = user?.role === 'admin';
    const name = isAuthenticated ? (user?.fullName || user?.username) : guestName;
    const phone = isAuthenticated ? user?.phone : guestPhone;
    const address = isAuthenticated ? "Admin Office" : guestAddress; // Admins don't need address? Or use a placeholder.

    if (!name || !phone || (!address && !isAdmin)) {
      toast.error("Missing Information", { description: "Please fill in all fields." });
      return;
    }

    // If not showing OTP yet, request it
    if (!showOTPInput && !isAdmin) {
        requestOTP();
        return;
    }

    setIsCheckingOut(true);
    try {
      const response = await fetch('http://localhost:3001/api/website/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          total,
          customerName: name,
          phone: phone,
          address: address,
          otp: otpValue,
          isAdmin: isAdmin
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTrackingId(data.trackingId);
        toast.success("Order Verified!", {
          description: `Tracking ID: ${data.trackingId}`,
        });
        clearCart();
      } else {
        toast.error(data.error || "Verification failed");
      }
    } catch (error) {
      toast.error("Checkout Failed");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const resetCart = () => {
      setIsCartOpen(false);
      setTrackingId(null);
      setShowOTPInput(false);
      setOtpValue("");
  };

  if (trackingId) {
      return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={resetCart} />
                <motion.div 
                    initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                    className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col items-center justify-center p-8 text-center"
                >
                    <div className="h-24 w-24 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                        <CheckCircle2 className="h-12 w-12 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-display text-gradient-fire mb-2">ORDER PLACED!</h2>
                    <p className="text-muted-foreground mb-8">Your Smash Burgers are on the way.</p>
                    
                    <div className="w-full p-6 rounded-2xl bg-secondary/50 border border-border mb-8">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Tracking ID</p>
                        <p className="font-mono text-3xl font-bold text-primary">{trackingId}</p>
                    </div>

                    <Button onClick={resetCart} className="w-full bg-gradient-fire py-6 rounded-2xl text-lg font-bold">
                        Great, Thanks!
                    </Button>
                </motion.div>
                </>
            )}
        </AnimatePresence>
      );
  }

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-fire">
                    <ShoppingBag className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl">Your Cart</h2>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {isAuthenticated && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-bold mr-2">
                      <User className="h-3 w-3 text-primary" />
                      <span className="max-w-[80px] truncate">{user?.fullName?.split(' ')[0]}</span>
                      <button onClick={logout} className="text-[10px] text-muted-foreground hover:text-destructive">Exit</button>
                    </div>
                  )}
                  <button onClick={() => setIsCartOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="font-display text-xl mb-2">Your cart is empty</h3>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Items Section */}
                    <div className="space-y-4">
                      {items.map((item, index) => (
                        <div key={item.id} className="bg-secondary/30 rounded-2xl p-4 border border-border/50">
                          <div className="flex gap-4">
                            <img src={item.menuItem.image} alt={item.menuItem.name} className="w-16 h-16 object-cover rounded-xl" />
                            <div className="flex-1">
                              <h4 className="font-bold text-sm truncate">{item.menuItem.name}</h4>
                              <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-2 bg-background rounded-full px-2 py-1 border border-border">
                                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-primary transition-colors"><Minus className="h-3 w-3" /></button>
                                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-primary transition-colors"><Plus className="h-3 w-3" /></button>
                                  </div>
                                  <span className="font-bold text-primary text-sm">£{((item.menuItem.price + (item.selectedAddOns?.reduce((a,b)=>a+b.price, 0)||0)) * item.quantity).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Guest Checkout Form */}
                    {!isAuthenticated && items.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Smartphone className="h-4 w-4 text-primary" />
                          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Order Details</h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Full Name</label>
                            <Input 
                              placeholder="John Doe" 
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              className="bg-secondary/30 border-border/50 h-11"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Phone Number</label>
                            <Input 
                              placeholder="07XXX XXXXXX" 
                              value={guestPhone}
                              onChange={(e) => setGuestPhone(e.target.value)}
                              className="bg-secondary/30 border-border/50 h-11"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Delivery Address</label>
                            <Input 
                              placeholder="123 Burger Street, London" 
                              value={guestAddress}
                              onChange={(e) => setGuestAddress(e.target.value)}
                              className="bg-secondary/30 border-border/50 h-11"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-border p-6 space-y-4 bg-card">
                  {showOTPInput && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-primary/5 border border-primary/20 mb-4">
                          <div className="flex items-center gap-2 mb-3">
                              <ShieldCheck className="h-4 w-4 text-primary" />
                              <span className="text-xs font-bold uppercase tracking-widest">Verify Phone (SMS Sent)</span>
                          </div>
                          <Input 
                            placeholder="Enter 6-digit OTP" 
                            className="text-center font-mono text-2xl tracking-[0.5em] h-14"
                            value={otpValue}
                            onChange={(e) => setOtpValue(e.target.value)}
                            maxLength={6}
                          />
                          <button onClick={requestOTP} className="w-full text-center text-[10px] uppercase font-bold text-muted-foreground mt-3 hover:text-primary">
                              Didn't get it? Resend code
                          </button>
                      </motion.div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between text-base font-bold">
                      <span>Total</span>
                      <span className="text-primary text-xl">£{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut || isSendingOTP || (showOTPInput && otpValue.length < 6)}
                    className="w-full bg-gradient-fire py-7 rounded-2xl text-lg font-bold shadow-fire mt-4"
                  >
                    {isCheckingOut ? "Placing Order..." :
                     isSendingOTP ? "Sending OTP..." :
                     showOTPInput ? "Verify & Place Order" : "Place Order"}
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
