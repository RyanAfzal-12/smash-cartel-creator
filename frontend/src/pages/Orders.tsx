import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ShoppingBag,
  Bell,
  Play,
  Check,
  ChevronRight,
  Wifi,
  WifiOff,
  Settings,
  LogOut
} from "lucide-react";
import { MOCK_ORDERS, Order, OrderStatus } from "@/data/orders";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

const Orders = () => {
  const { logout, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [isLive, setIsLive] = useState(true);

  // Fetch real orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/ubereats/orders');
        if (response.ok) {
          const realOrders = await response.json();
          if (realOrders.length > 0) {
            setOrders(prev => {
              // Merge real orders with mock logic or replace
              const merged = [...realOrders, ...prev.filter(o => !realOrders.find((r: any) => r.id === o.id))];
              return merged;
            });
          }
        }
      } catch (error) {
        console.log("Backend not running, using mock data");
      }
    };

    const interval = setInterval(fetchOrders, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/ubereats/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
        }
        toast.success(`Order ${orderId} updated to ${newStatus}`);
      }
    } catch (error) {
      toast.error("Failed to update order status on server");
      // Fallback for mock orders
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    }
  };

  const simulateUberEatsOrder = () => {
    const newOrder: Order = {
      id: `ord_${Math.random().toString(36).substr(2, 9)}`,
      externalId: `UBER-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 89)}`,
      source: 'ubereats',
      customerName: 'Alex Johnson',
      items: [
        { id: 'm1', name: 'Smash Classic Burger', quantity: 1, price: 12.99 },
        { id: 'm4', name: 'Coke Zero', quantity: 1, price: 2.50 }
      ],
      total: 15.49,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    setOrders(prev => [newOrder, ...prev]);
    toast("New Uber Eats Order!", {
      description: `Order from Alex Johnson just arrived via Uber Eats.`,
      icon: <Bell className="h-4 w-4 text-green-500" />,
    });
    
    // Play notification sound (simulated)
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(() => {});
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === "pending") return order.status === "pending";
    if (activeTab === "active") return ['accepted', 'preparing', 'ready'].includes(order.status);
    if (activeTab === "completed") return order.status === "delivered";
    return true;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-orange-500 text-white';
      case 'accepted': return 'bg-blue-500 text-white';
      case 'preparing': return 'bg-yellow-500 text-white';
      case 'ready': return 'bg-green-500 text-white';
      case 'delivered': return 'bg-slate-500 text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl font-display text-gradient-fire">Orders Dashboard</h1>
              {isLive ? (
                <Badge variant="outline" className="text-green-500 border-green-500/50 flex gap-1 items-center bg-green-500/5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  LIVE
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground border-muted-foreground/50">OFFLINE</Badge>
              )}
            </div>
            <p className="text-muted-foreground">Manage your website and Uber Eats orders in real-time.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden lg:flex items-center gap-4 mr-4 px-4 py-2 bg-accent/30 rounded-full border border-border/50">
               <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-[#06C167]" />
                 <span className="text-xs font-medium">Uber Eats: Connected</span>
               </div>
               <div className="h-4 w-[1px] bg-border" />
               <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-fire-500" />
                 <span className="text-xs font-medium">Website: Connected</span>
               </div>
             </div>

             <Button 
                variant="outline"
                onClick={() => setIsLive(!isLive)}
                className="gap-2"
              >
                {isLive ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
                {isLive ? 'Online' : 'Go Online'}
              </Button>

              <Button 
                variant="ghost"
                size="icon"
                onClick={() => toast.info("Settings", { description: "Uber Eats API Configuration is managed in the backend environment variables." })}
              >
                <Settings className="h-5 w-5" />
              </Button>

              <Button 
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                onClick={logout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            
            <Button 
                onClick={simulateUberEatsOrder}
                className="bg-[#06C167] hover:bg-[#05a659] text-white gap-2 shadow-lg shadow-green-500/20"
              >
                <Bell className="h-4 w-4" />
                Test Order
              </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order List */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4">
            <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-accent/20 p-1 rounded-xl">
                <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  New {orders.filter(o => o.status === 'pending').length > 0 && (
                    <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                      {orders.filter(o => o.status === 'pending').length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="active" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Active</TabsTrigger>
                <TabsTrigger value="completed" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Past</TabsTrigger>
              </TabsList>

              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {filteredOrders.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20 border-2 border-dashed rounded-3xl border-border/50 bg-accent/5"
                    >
                      <Package className="h-12 w-12 mx-auto text-muted/30 mb-4" />
                      <p className="text-muted-foreground font-medium">No {activeTab} orders</p>
                    </motion.div>
                  ) : (
                    filteredOrders.map((order) => (
                      <motion.div
                        key={order.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ y: -2 }}
                        onClick={() => setSelectedOrder(order)}
                        className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 relative overflow-hidden ${
                          selectedOrder?.id === order.id 
                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/5' 
                            : 'border-border/50 bg-card hover:bg-accent/50 group'
                        }`}
                      >
                         {order.status === 'pending' && (
                           <div className="absolute top-0 right-0 h-1 w-full bg-gradient-fire animate-pulse" />
                         )}
                        
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-2">
                             {order.source === 'ubereats' ? (
                               <Badge className="bg-[#06C167] text-white hover:bg-[#05a659] text-[10px] h-5">UBER EATS</Badge>
                             ) : (
                               <Badge className="bg-fire-500 text-white text-[10px] h-5">WEB</Badge>
                             )}
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">#{order.externalId?.split('-').pop() || order.id.slice(-4)}</span>
                        </div>
                        
                        <h3 className="font-bold text-base truncate">{order.customerName}</h3>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1.5">
                            <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground font-medium">
                              {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                            </span>
                          </div>
                          <span className="font-bold text-lg">£{order.total.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/10">
                           <div className={`h-1.5 w-1.5 rounded-full ${order.status === 'pending' ? 'bg-orange-500' : 'bg-green-500'}`} />
                           <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{order.status}</span>
                           <span className="ml-auto text-[10px] text-muted-foreground font-medium bg-muted px-1.5 py-0.5 rounded">
                             {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </Tabs>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-8 xl:col-span-9">
            <AnimatePresence mode="wait">
              {selectedOrder ? (
                <motion.div
                  key={selectedOrder.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 h-full"
                >
                  <Card className="border-none bg-accent/10 overflow-hidden rounded-3xl h-full flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-border/10 bg-accent/20 p-6 md:p-8">
                      <div className="flex items-center gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center rotate-3">
                          <ShoppingBag className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-3xl font-display">{selectedOrder.customerName}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-medium text-muted-foreground">ID: {selectedOrder.externalId || selectedOrder.id}</span>
                            <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                            <span className="text-sm font-medium text-muted-foreground">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-5xl font-black text-primary tracking-tighter">£{selectedOrder.total.toFixed(2)}</p>
                        <Badge variant="outline" className="mt-2 h-6">{selectedOrder.source.toUpperCase()}</Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6 md:p-8 flex-1 overflow-y-auto">
                      <div className="grid lg:grid-cols-2 gap-10">
                        {/* Items Section */}
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-xl flex items-center gap-3">
                               <Package className="h-6 w-6 text-primary" />
                               Order Items
                            </h4>
                            <Badge className="bg-primary/10 text-primary border-none">{selectedOrder.items.length} Items</Badge>
                          </div>
                          
                          <div className="space-y-1">
                            {selectedOrder.items.map((item, idx) => (
                              <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group flex justify-between items-center p-4 rounded-2xl hover:bg-background/40 transition-colors"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center font-bold text-lg">
                                    {item.quantity}
                                  </div>
                                  <div>
                                    <p className="font-bold text-lg leading-tight">{item.name}</p>
                                    {item.options && item.options.length > 0 && (
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {item.options.map((opt, i) => (
                                          <span key={i} className="text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary px-2 py-0.5 rounded-full border border-primary/10">{opt}</span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <span className="font-bold text-lg text-muted-foreground">£{(item.price * item.quantity).toFixed(2)}</span>
                              </motion.div>
                            ))}
                          </div>

                          <div className="mt-8 p-6 rounded-3xl bg-background/40 border border-border/50">
                             <div className="flex justify-between items-center mb-2">
                               <span className="text-muted-foreground font-medium">Subtotal</span>
                               <span className="font-bold">£{selectedOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                             </div>
                             <div className="flex justify-between items-center mb-4">
                               <span className="text-muted-foreground font-medium">Delivery & Service Fees</span>
                               <span className="font-bold">£{(selectedOrder.total - selectedOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toFixed(2)}</span>
                             </div>
                             <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                               <span className="text-xl font-bold">Total</span>
                               <span className="text-3xl font-black text-primary">£{selectedOrder.total.toFixed(2)}</span>
                             </div>
                          </div>
                        </div>

                        {/* Actions & Status */}
                        <div className="space-y-8">
                          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
                            <h4 className="font-bold text-xl mb-6 flex items-center gap-3">
                               <Play className="h-6 w-6 text-primary" />
                               Manage Workflow
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                              {selectedOrder.status === 'pending' && (
                                <div className="flex gap-4">
                                  <Button 
                                    onClick={() => updateOrderStatus(selectedOrder.id, 'accepted')}
                                    className="bg-green-600 hover:bg-green-700 h-16 text-lg font-bold flex-1 rounded-2xl shadow-lg shadow-green-500/20"
                                  >
                                    Confirm Order
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                                    className="h-16 w-16 rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                                  >
                                    <XCircle className="h-7 w-7" />
                                  </Button>
                                </div>
                              )}
                              
                              {selectedOrder.status === 'accepted' && (
                                <Button 
                                  onClick={() => updateOrderStatus(selectedOrder.id, 'preparing')}
                                  className="bg-primary h-16 text-lg font-bold w-full rounded-2xl shadow-lg shadow-primary/20"
                                >
                                  Begin Preparation
                                </Button>
                              )}
                              
                              {selectedOrder.status === 'preparing' && (
                                <Button 
                                  onClick={() => updateOrderStatus(selectedOrder.id, 'ready')}
                                  className="bg-blue-600 hover:bg-blue-700 h-16 text-lg font-bold w-full rounded-2xl shadow-lg shadow-blue-500/20"
                                >
                                  Mark as Ready for Pickup
                                </Button>
                              )}
                              
                              {selectedOrder.status === 'ready' && (
                                <Button 
                                  onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                                  className="bg-slate-800 hover:bg-slate-900 h-16 text-lg font-bold w-full rounded-2xl"
                                >
                                  Complete Delivery
                                </Button>
                              )}

                              {selectedOrder.status === 'delivered' && (
                                <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl flex items-center gap-4">
                                  <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                                    <Check className="h-7 w-7 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-green-700">Order Completed</p>
                                    <p className="text-sm text-green-600/80">Successfully delivered to customer</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="p-8 rounded-3xl bg-background/50 border border-border/50">
                             <h4 className="font-bold text-lg uppercase tracking-wider text-muted-foreground mb-6">Status History</h4>
                             <div className="space-y-8 relative">
                               <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
                               
                               <div className="relative flex gap-6">
                                 <div className={`mt-1 h-6 w-6 rounded-full border-4 border-background z-10 ${selectedOrder.status === 'pending' ? 'bg-orange-500 animate-pulse ring-4 ring-orange-500/20' : 'bg-green-500'}`} />
                                 <div>
                                   <p className="font-bold leading-none">Order Received</p>
                                   <p className="text-sm text-muted-foreground mt-1">Order successfully pushed from {selectedOrder.source}</p>
                                   <p className="text-xs text-muted-foreground font-mono mt-1">{new Date(selectedOrder.createdAt).toLocaleTimeString()}</p>
                                 </div>
                               </div>

                               {['accepted', 'preparing', 'ready', 'delivered'].includes(selectedOrder.status) && (
                                 <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="relative flex gap-6">
                                   <div className={`mt-1 h-6 w-6 rounded-full border-4 border-background z-10 ${selectedOrder.status === 'accepted' ? 'bg-blue-500 animate-pulse ring-4 ring-blue-500/20' : 'bg-green-500'}`} />
                                   <div>
                                     <p className="font-bold leading-none">Kitchen Confirmed</p>
                                     <p className="text-sm text-muted-foreground mt-1">Staff has accepted the order</p>
                                   </div>
                                 </motion.div>
                               )}

                               {['preparing', 'ready', 'delivered'].includes(selectedOrder.status) && (
                                 <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="relative flex gap-6">
                                   <div className={`mt-1 h-6 w-6 rounded-full border-4 border-background z-10 ${selectedOrder.status === 'preparing' ? 'bg-yellow-500 animate-pulse ring-4 ring-yellow-500/20' : 'bg-green-500'}`} />
                                   <div>
                                     <p className="font-bold leading-none">In Preparation</p>
                                     <p className="text-sm text-muted-foreground mt-1">Chef is working on the order</p>
                                   </div>
                                 </motion.div>
                               )}
                             </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-20 bg-accent/5 rounded-[3rem] border-2 border-dashed border-border/50">
                  <div className="h-24 w-24 rounded-3xl bg-primary/5 flex items-center justify-center mb-8 rotate-12">
                    <Package className="h-12 w-12 text-primary/30" />
                  </div>
                  <h3 className="text-3xl font-display text-muted-foreground">Select an order</h3>
                  <p className="text-muted-foreground mt-3 max-w-sm text-lg leading-relaxed">Choose an active or incoming order from the list to manage the kitchen workflow.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orders;
