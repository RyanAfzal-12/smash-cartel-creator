export interface AddOn {
  id: string;
  name: string;
  price: number;
  required?: boolean;
  category: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  badge?: string;
  addOns: AddOn[];
}

export interface Category {
  id: string;
  name: string;
  emoji?: string;
}

export const categories: Category[] = [
  { id: "meal-deals", name: "Meal Deals"},
  { id: "burgers", name: "Smash Burgers" },
  { id: "sandos", name: "Cartel Sandos" },
  { id: "conspiracy", name: "Conspiracy" },
  { id: "tenders-wings", name: "Tenders & Wings" },
  { id: "loaded-fries", name: "Loaded Fries" },
  { id: "sides", name: "Sides" },
  { id: "kids", name: "Kids Meal" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
];

const burgerAddOns: AddOn[] = [
  { id: "extra-patty", name: "Extra Beef Patty", price: 2.50, category: "Extras" },
  { id: "extra-cheese", name: "Extra American Cheese", price: 0.80, category: "Extras" },
  { id: "turkey-bacon", name: "Turkey Bacon", price: 1.50, category: "Extras" },
  { id: "pickles", name: "Extra Pickles", price: 0.50, category: "Toppings" },
  { id: "jalapenos", name: "Jalapeños", price: 0.50, category: "Toppings" },
  { id: "onions", name: "Crispy Onions", price: 0.50, category: "Toppings" },
  { id: "lettuce", name: "Fresh Lettuce", price: 0.40, category: "Toppings" },
  { id: "tomato", name: "Fresh Tomato", price: 0.40, category: "Toppings" },
  { id: "house-sauce", name: "House Sauce", price: 0.00, category: "Sauces" },
  { id: "truffle-mayo", name: "Truffle Mayo", price: 0.60, category: "Sauces" },
  { id: "hot-sauce", name: "OG Hot Sauce", price: 0.50, category: "Sauces" },
  { id: "bbq-sauce", name: "BBQ Sauce", price: 0.50, category: "Sauces" },
  { id: "garlic-mayo", name: "Garlic Mayo", price: 0.50, category: "Sauces" },
];

const chickenAddOns: AddOn[] = [
  { id: "extra-tender", name: "Extra Tender", price: 1.80, category: "Extras" },
  { id: "ranch-dip", name: "Ranch Dip", price: 0.80, required: true, category: "Dips" },
  { id: "bbq-dip", name: "BBQ Dip", price: 0.80, category: "Dips" },
  { id: "hot-honey-dip", name: "Hot Honey Dip", price: 0.80, category: "Dips" },
  { id: "garlic-dip", name: "Garlic Dip", price: 0.80, category: "Dips" },
  { id: "cheese-dip", name: "Cheese Dip", price: 0.80, category: "Dips" },
];

const sideAddOns: AddOn[] = [
  { id: "cajun-seasoning", name: "Cajun Seasoning", price: 0.50, category: "Seasoning" },
  { id: "cheese-sauce", name: "Cheese Sauce", price: 1.00, category: "Extras" },
  { id: "truffle-drizzle", name: "Truffle Drizzle", price: 1.20, category: "Extras" },
];

const drinkAddOns: AddOn[] = [
  { id: "extra-ice", name: "Extra Ice", price: 0.00, category: "Options" },
  { id: "no-ice", name: "No Ice", price: 0.00, category: "Options" },
];

export const menuItems: MenuItem[] = [
  // Meal Deals
  {
    id: "smugglers-meal-1",
    name: "Smugglers Meal For 1",
    description: "A Smash Cartel Double Cheeseburger served with a side of Classy Fries and Drink",
    price: 14.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "meal-deals",
    rating: 78,
    badge: "#2 Most Liked",
    addOns: burgerAddOns,
  },
  {
    id: "sinaloa-meal-2",
    name: "Sinaloa Meal For 2",
    description: "2x Smash Cartel Double Cheeseburgers served with 2x Fries, 2x Drinks and 3x Smashin Tenders",
    price: 31.95,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop",
    category: "meal-deals",
    rating: 66,
    addOns: burgerAddOns,
  },
  {
    id: "intent-supply-4",
    name: "Intent to Supply For 4",
    description: "The BIG 4 - 4x Burgers, 4x Classy Fries, 3x Smashin Tenders and 4x Drinks",
    price: 63.45,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
    category: "meal-deals",
    addOns: burgerAddOns,
  },
  
  // Smash Burgers
  {
    id: "the-sicaria",
    name: "The Sicaria",
    description: "Petite Hitwoman - Juicy smashed single beef patty with cheese, onions, ketchup and silky garlic mayo on toasted buns",
    price: 7.40,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop",
    category: "burgers",
    rating: 100,
    addOns: burgerAddOns,
  },
  {
    id: "the-godfather",
    name: "The Godfather",
    description: "A Legend, The Don of Smashburgers! - Smashed Double Cheeseburger with Onions, Fresh Pickles, a hint of Mustard & our Secret Cartel House Sauce",
    price: 10.40,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
    category: "burgers",
    badge: "Best Seller",
    addOns: burgerAddOns,
  },
  {
    id: "the-escobar",
    name: "The Escobar",
    description: "Double Smashed Juicy Cheeseburger, Loaded with Lettuce, Tomato, Onions, Fresh Pickles & our Biggy Mac Sauce",
    price: 11.25,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop",
    category: "burgers",
    rating: 100,
    addOns: burgerAddOns,
  },
  {
    id: "el-chapo",
    name: "El Chapo",
    description: "Guzman's Double Smashed Juicy Cheeseburger with Crispy Onions, fresh Pickles & House Truffle Mayo",
    price: 11.25,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    category: "burgers",
    rating: 66,
    addOns: burgerAddOns,
  },
  {
    id: "scarface",
    name: "Scarface",
    description: "Tony Montana's Double Smashed Juicy Cheeseburger with Onions, Fresh Pickles, Green Chillies & our OG Hot Sauce",
    price: 11.25,
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
    category: "burgers",
    addOns: burgerAddOns,
  },
  {
    id: "the-gotti",
    name: "The Gotti",
    description: "Gambino Mafia - American Style Double Smashed Juicy Cheeseburger with Onions, Mustard and Ketchup",
    price: 11.25,
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop",
    category: "burgers",
    addOns: burgerAddOns,
  },
  {
    id: "black-widow",
    name: "The Black Widow",
    description: "BBQ & Ranch Doused Double Smashed Cheeseburger with Turkey Bacon & Fresh Onions",
    price: 12.20,
    image: "https://images.unsplash.com/photo-1608767221051-2b9d18f35a2f?w=400&h=300&fit=crop",
    category: "burgers",
    addOns: burgerAddOns,
  },
  
  // Cartel Sandos
  {
    id: "the-snitch",
    name: "The Snitch",
    description: "Juicy, Crispy, Fried Chicken Sando with Smooth Garlic Mayo, Lettuce, Fresh Pickles and our Secret House Sauce",
    price: 10.25,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop",
    category: "sandos",
    addOns: chickenAddOns,
  },
  {
    id: "yakuza",
    name: "Yakuza",
    description: "Juicy Crispy Chicken smothered in our Korean BBQ Sauce served in a Toasted Brioche Bun with Gochujang, Crunchy Lettuce, House Garlic Slaw",
    price: 10.95,
    image: "https://images.unsplash.com/photo-1626645738196-c2a72c7e0ec1?w=400&h=300&fit=crop",
    category: "sandos",
    addOns: chickenAddOns,
  },
  {
    id: "honey-im-home",
    name: "Honey I'm Home",
    description: "Juicy Crispy Chicken smothered in Hot Honey sauce served in a soft brioche bun with crunchy lettuce, house garlic slaw, jalapenos",
    price: 10.95,
    image: "https://images.unsplash.com/photo-1619881590738-a111d176d936?w=400&h=300&fit=crop",
    category: "sandos",
    badge: "Popular",
    addOns: chickenAddOns,
  },
  {
    id: "ms-13",
    name: "MS-13",
    description: "Our Classic Grilled Cheese Sandwich with American Melted, Gooey Cheese, a layer of our House Sauce, Onions",
    price: 5.40,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
    category: "sandos",
    addOns: burgerAddOns,
  },
  
  // Conspiracy (Customizable)
  {
    id: "double-smash",
    name: "Double Smash",
    description: "Double Smashed Juicy Cheeseburger with your toppings and sauce of choice",
    price: 10.85,
    image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=400&h=300&fit=crop",
    category: "conspiracy",
    rating: 75,
    addOns: burgerAddOns,
  },
  {
    id: "trippple-smash",
    name: "Trippple Smash",
    description: "Triple Smashed Juicy Cheeseburger with your toppings and sauce of choice",
    price: 11.95,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop",
    category: "conspiracy",
    rating: 68,
    badge: "#1 Most Liked",
    addOns: burgerAddOns,
  },
  {
    id: "southern-fried",
    name: "Southern Fried",
    description: "Juicy and Crispy Chicken Fillet Burger With Your Toppings and Sauce of Choice",
    price: 10.65,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop",
    category: "conspiracy",
    rating: 62,
    addOns: chickenAddOns,
  },
  
  // Tenders & Wings
  {
    id: "3x-tenders",
    name: "3x Smashin Tenders",
    description: "3 Large Crispy Seasoned Chicken Tenders with your pick of sauce. Served with a dip of your choice",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop",
    category: "tenders-wings",
    addOns: chickenAddOns,
  },
  {
    id: "4x-tenders",
    name: "4x Smashin Tenders",
    description: "4 Large Crispy Seasoned Chicken Tenders with your pick of sauce. Served with a dip of your choice",
    price: 7.95,
    image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&h=300&fit=crop",
    category: "tenders-wings",
    rating: 75,
    addOns: chickenAddOns,
  },
  {
    id: "7x-tenders",
    name: "7x Smashin Tenders",
    description: "7 Large Crispy Seasoned Chicken Tenders with your pick of sauce. Served with a dip of your choice",
    price: 11.95,
    image: "https://images.unsplash.com/photo-1585325701165-351af916e581?w=400&h=300&fit=crop",
    category: "tenders-wings",
    rating: 85,
    addOns: chickenAddOns,
  },
  {
    id: "5x-wings",
    name: "5x Smashin Wings",
    description: "5 XL Juicy and Crunchy Wings! Choose your sauce which will blow your mind!",
    price: 7.95,
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop",
    category: "tenders-wings",
    rating: 71,
    addOns: chickenAddOns,
  },
  {
    id: "8x-wings",
    name: "8x Smashin Wings",
    description: "8 XL Juicy and Crunchy Wings! Choose your sauce which will blow your mind!",
    price: 11.45,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop",
    category: "tenders-wings",
    addOns: chickenAddOns,
  },
  
  // Loaded Fries
  {
    id: "lock-n-loaded",
    name: "Lock n Loaded Fries",
    description: "Crispy fries loaded with your choice of smashed beef patty or chicken tenders, topped with crispy onions, jalapeños, chives",
    price: 10.95,
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop",
    category: "loaded-fries",
    addOns: sideAddOns,
  },
  {
    id: "american-cheese-fries",
    name: "American Cheese Burger Loaded Fries",
    description: "Crispy golden fries topped with all the flavors of a classic cheeseburger! Smothered in rich cheese sauce",
    price: 10.25,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    category: "loaded-fries",
    rating: 100,
    addOns: sideAddOns,
  },
  {
    id: "house-special-fries",
    name: "House Special Loaded Fries",
    description: "The ultimate comfort food. Crispy fries with our signature burger sauce and creamy cheese sauce",
    price: 10.50,
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&h=300&fit=crop",
    category: "loaded-fries",
    rating: 100,
    addOns: sideAddOns,
  },
  {
    id: "truffle-fries",
    name: "Truffle Mayo Loaded Fries",
    description: "Crispy golden fries topped with cheesy sauce and a drizzle of rich, aromatic truffle mayo",
    price: 10.65,
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=300&fit=crop",
    category: "loaded-fries",
    rating: 80,
    addOns: sideAddOns,
  },
  
  // Sides
  {
    id: "fries",
    name: "Fries",
    description: "Classic hot and crispy fries with the option of seasoning",
    price: 3.95,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    category: "sides",
    addOns: sideAddOns,
  },
  {
    id: "curly-fries",
    name: "Curly Fries",
    description: "Crunchy Curly Fries with the option of seasoning for a smashin' flavour",
    price: 3.95,
    image: "https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=400&h=300&fit=crop",
    category: "sides",
    rating: 71,
    addOns: sideAddOns,
  },
  {
    id: "popcorn-chicken",
    name: "Chicken Popcorn Bandits",
    description: "Juicy chicken breast popcorn pieces triple coated in southern style batter",
    price: 6.95,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop",
    category: "sides",
    rating: 75,
    addOns: chickenAddOns,
  },
  {
    id: "onion-rings",
    name: "Onion Rings",
    description: "Crispy golden onion rings served with dipping sauce",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop",
    category: "sides",
    addOns: sideAddOns,
  },
  
  // Desserts
  {
    id: "churros",
    name: "Cartel Churros",
    description: "Golden crispy churros dusted with cinnamon sugar, served with chocolate sauce",
    price: 4.95,
    image: "https://images.unsplash.com/photo-1624371414361-e670edf4898a?w=400&h=300&fit=crop",
    category: "desserts",
    addOns: [],
  },
  {
    id: "brownie",
    name: "Chocolate Brownie",
    description: "Rich, fudgy chocolate brownie served warm",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop",
    category: "desserts",
    addOns: [],
  },
  
  // Drinks
  {
    id: "coca-cola",
    name: "Coca-Cola",
    description: "Classic Coca-Cola 330ml",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop",
    category: "drinks",
    addOns: drinkAddOns,
  },
  {
    id: "sprite",
    name: "Sprite",
    description: "Refreshing Sprite 330ml",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=300&fit=crop",
    category: "drinks",
    addOns: drinkAddOns,
  },
  {
    id: "milkshake",
    name: "Oreo Milkshake",
    description: "Creamy vanilla milkshake blended with Oreo cookies",
    price: 5.95,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
    category: "drinks",
    addOns: [],
  },
];
