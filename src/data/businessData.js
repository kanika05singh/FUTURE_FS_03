// ============================================================================
// businessData.js
// ----------------------------------------------------------------------------
// EVERYTHING editable about this website lives in this one file: business
// details, opening hours, menu/services, testimonials, gallery captions and
// the "why choose us" features. Change the values below to re-skin this
// entire site for a different restaurant/cafe without touching any component.
// ============================================================================

export const businessData = {
  name: "Urban Bite",
  shortName: "Urban Bite",
  tagline: "Modern Grill & Bar",
  type: "Restaurant & Bar",
  location: "Koramangala, Bengaluru",
  address: "142, 14th Cross Road, Koramangala 5th Block, Bengaluru, Karnataka 560095",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  // Digits only, country code first, no + or spaces — required format for wa.me links
  whatsapp: "919876543210",
  whatsappMessage: "Hi! I'd like to know more about Urban Bite.",
  email: "hello@urbanbite.in",
  mapEmbedSrc:
    "https://www.google.com/maps?q=Koramangala+5th+Block,+Bengaluru,+Karnataka&output=embed",
  mapDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Koramangala+5th+Block+Bengaluru",
  description:
    "Urban Bite opened in 2020 with one idea: cook everything the honest way, over charcoal and open flame, and pour drinks with the same care. What started as a single wood-fired grill in a small Koramangala kitchen has grown into one of the neighbourhood's most-loved tables — without losing the open kitchen, the regulars, or the smoke.",
  mission:
    "We exist to make live-fire cooking feel like an everyday joy, not an occasion — using produce sourced within a day's drive of Bengaluru, and treating every table, first-timer or regular, the same way.",
  founded: 2020,
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },
  openingHours: [
    { days: "Monday – Thursday", hours: "12:00 PM – 11:00 PM" },
    { days: "Friday – Saturday", hours: "12:00 PM – 12:30 AM" },
    { days: "Sunday", hours: "11:00 AM – 11:00 PM" },
  ],
  stats: [
    { label: "Years on the Block", value: 6, suffix: "+" },
    { label: "Covers Served Monthly", value: 12000, suffix: "+" },
    { label: "Dishes on the Menu", value: 60, suffix: "+" },
    { label: "Average Rating", value: 4.8, suffix: "/5", decimals: 1 },
  ],
};

// ----------------------------------------------------------------------------
// Menu / services — rendered with .map() in Services.jsx. "art" refers to a
// key in the GraphicTile palette map (see components/ui/GraphicTile.jsx) —
// swap it for a real photo later by adding an `image` field and using it
// instead of <GraphicTile> in Services.jsx.
// ----------------------------------------------------------------------------
export const serviceCategories = ["All", "Starters", "Grill", "Seafood", "Bar", "Dessert"];

export const services = [
  {
    id: "smoked-burrata",
    name: "Smoked Burrata",
    category: "Starters",
    description: "Charred sourdough, heirloom tomato, basil oil, hickory smoke under glass.",
    price: "₹495",
    icon: "flame",
    art: "starters",
  },
  {
    id: "charred-corn",
    name: "Charred Corn Ribs",
    category: "Starters",
    description: "Sweet corn split and grilled, chilli-lime butter, cotija, coriander.",
    price: "₹365",
    icon: "flame",
    art: "starters",
  },
  {
    id: "tomahawk",
    name: "Charcoal Tomahawk",
    category: "Grill",
    description: "1kg grass-fed tomahawk, rested and carved tableside, smoked jus.",
    price: "₹4,250",
    icon: "beef",
    art: "grill",
  },
  {
    id: "lamb-chops",
    name: "Applewood Lamb Chops",
    category: "Grill",
    description: "Marinated 24 hours, applewood smoke, mint-pea puree, jus.",
    price: "₹1,150",
    icon: "beef",
    art: "grill",
  },
  {
    id: "whole-snapper",
    name: "Whole Grilled Snapper",
    category: "Seafood",
    description: "Coastal catch of the day, banana leaf, coconut-curry butter.",
    price: "₹1,450",
    icon: "fish",
    art: "seafood",
  },
  {
    id: "prawn-skewers",
    name: "Charcoal Prawn Skewers",
    category: "Seafood",
    description: "Tiger prawns, garlic-chilli glaze, charred lime.",
    price: "₹825",
    icon: "fish",
    art: "seafood",
  },
  {
    id: "smoked-old-fashioned",
    name: "Smoked Old Fashioned",
    category: "Bar",
    description: "Bourbon, applewood smoke, Demerara, orange oils, tableside pour.",
    price: "₹725",
    icon: "martini",
    art: "bar",
  },
  {
    id: "salted-caramel-negroni",
    name: "Salted Caramel Negroni",
    category: "Bar",
    description: "House-infused gin, Campari, salted caramel vermouth.",
    price: "₹695",
    icon: "martini",
    art: "bar",
  },
  {
    id: "burnt-basque",
    name: "Burnt Basque Cheesecake",
    category: "Dessert",
    description: "Deliberately scorched top, cardamom cream, dark chocolate soil.",
    price: "₹385",
    icon: "cake",
    art: "dessert",
  },
  {
    id: "smoked-chocolate-tart",
    name: "Smoked Chocolate Tart",
    category: "Dessert",
    description: "70% dark chocolate, sea salt, hazelnut praline, torched marshmallow.",
    price: "₹365",
    icon: "cake",
    art: "dessert",
  },
];

// ----------------------------------------------------------------------------
// Why Choose Us — feature cards, rendered with Lucide icons by name.
// ----------------------------------------------------------------------------
export const features = [
  {
    icon: "flame",
    title: "Everything Over Fire",
    description: "No gas hobs in the kitchen — charcoal and wood are the only heat we cook with.",
  },
  {
    icon: "leaf",
    title: "Sourced Within a Day",
    description: "Produce, seafood and meat sourced from farms and coast within a day's drive.",
  },
  {
    icon: "martini",
    title: "Bar-Led Program",
    description: "An in-house bar team building the cocktail list around what's on the grill.",
  },
  {
    icon: "users",
    title: "Service That Remembers You",
    description: "Small enough that the team still learns regulars' names and their usual order.",
  },
  {
    icon: "calendar-check",
    title: "Private Dining & Events",
    description: "A 14-seat private room for birthdays, offsites and long, slow celebrations.",
  },
  {
    icon: "clock",
    title: "Open Late, Every Night",
    description: "Kitchen runs until 30 minutes before close — no last-order panic at 9pm.",
  },
];

// ----------------------------------------------------------------------------
// Testimonials
// ----------------------------------------------------------------------------
export const testimonials = [
  {
    name: "Ananya Rao",
    role: "Regular, since 2021",
    rating: 5,
    review:
      "The tomahawk is worth every rupee, but it's the little touches — they remembered my usual drink on my second visit — that keep bringing us back.",
  },
  {
    name: "Karthik Iyer",
    role: "Food blogger",
    rating: 5,
    review:
      "Best live-fire cooking in Koramangala, full stop. The burnt basque cheesecake alone deserves a special trip.",
  },
  {
    name: "Meera Nair",
    role: "Booked for a birthday dinner",
    rating: 5,
    review:
      "Hosted our anniversary in the private room. The team planned the whole menu with us over WhatsApp beforehand — zero stress on the night.",
  },
  {
    name: "Rohit Sharma",
    role: "First-time visitor",
    rating: 4,
    review:
      "Walked in without a reservation on a Friday and they still found us a spot at the bar. The smoked old fashioned is now my standard order.",
  },
  {
    name: "Priya Desai",
    role: "Weekend brunch regular",
    rating: 5,
    review:
      "Their weekend brunch doesn't get enough credit — it's just as considered as the dinner menu, and the patio seating is unbeatable at 10am.",
  },
  {
    name: "Arjun Mehta",
    role: "Corporate offsite host",
    rating: 5,
    review:
      "Ran a 12-person team dinner here. The staff handled a group booking better than restaurants twice the size.",
  },
];

// ----------------------------------------------------------------------------
// Gallery — graphic mood tiles (see GraphicTile.jsx) standing in for
// photography. Swap `art` usage for a real <img> once photos are available.
// ----------------------------------------------------------------------------
export const galleryItems = [
  { id: "open-kitchen", caption: "The Open Kitchen", art: "grill" },
  { id: "wood-fired-grill", caption: "Wood-Fired Grill Station", art: "grill" },
  { id: "craft-cocktails", caption: "Craft Cocktail Bar", art: "bar" },
  { id: "coastal-catch", caption: "Coastal Catch of the Day", art: "seafood" },
  { id: "chefs-table", caption: "The Chef's Table", art: "starters" },
  { id: "weekend-brunch", caption: "Weekend Brunch on the Patio", art: "dessert" },
  { id: "late-night-bar", caption: "Late Night at the Bar", art: "bar" },
  { id: "private-dining", caption: "Private Dining Room", art: "grill" },
];
