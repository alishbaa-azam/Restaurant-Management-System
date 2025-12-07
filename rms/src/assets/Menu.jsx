import { motion } from "framer-motion";
// import EggsBenedict from ".././assets/EggsBenedict.png";
// import AvocadoToast from ".././assets/AvocadoToast.png";
//  import PancakesMapleSyrup from ".././assets/PancakesMapleSyrup.png";
// import FruitSmoothieBowl from ".././assets/FruitSmoothieBowl.png";

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Mexican",
  "Italian",
  "Desserts",
  "Drinks",
];

const menuItems = [
  {
    title: "Eggs Benedict",
    desc: "Poached eggs over toasted English muffins with hollandaise sauce.",
    price: "RS80",
    // img: EggsBenedict,
  },
  {
    title: "Avocado Toast",
    desc: "Toasted bread topped with smashed avocado and spices.",
    price: "RS70",
    // img: AvocadoToast,
  },
  {
    title: "Pancakes with Maple Syrup",
    desc: "Fluffy pancakes drizzled with pure maple syrup.",
    price: "RS60",
    // img: PancakesMapleSyrup,
  },
  {
    title: "Fruit Smoothie Bowl",
    desc: "A bowl full of fresh fruits blended into a refreshing smoothie.",
    price: "RS90",
    // img: FruitSmoothieBowl,
  },
];

export default function MenuSection() {
  return (
    <section className="bg-[#1d0f06] text-white py-20 w-full">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-5xl font-serif text-yellow-400 tracking-wide">
          Our Exquisite Menu
        </h2>
        <p className="text-xl mt-2 text-yellow-200 font-light">
          A Symphony of Flavours
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-10 flex-wrap">
        {categories.map((cat, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            className="px-6 py-2 rounded-full border border-yellow-600
            hover:bg-yellow-600/20 transition text-yellow-300 font-medium 
            shadow-[0_0_10px_rgba(255,200,50,0.3)]"
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 mt-14 px-10 lg:px-32">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ delay: index * 0.15, type: "spring" }}
            className="bg-[#2a1a0e] rounded-2xl p-6 shadow-xl text-center 
            border border-yellow-900/40 hover:shadow-yellow-700/40 
            hover:shadow-2xl transition-all"
          >
            <motion.img
              src={item.img}
              alt={item.title}
              className="w-40 h-40 mx-auto object-contain drop-shadow-[0_0_10px_rgba(255,200,50,0.4)]"
              whileHover={{ scale: 1.1, rotate: 2 }}
            />

            <h3 className="mt-6 text-xl font-semibold text-yellow-300">
              {item.title}
            </h3>

            <p className="text-sm text-yellow-100 mt-2 leading-relaxed">
              {item.desc}
            </p>

            <div className="flex justify-between items-center mt-6">
              <span className="px-4 py-1 bg-yellow-600 text-black rounded-full text-sm shadow-lg">
                {item.price}
              </span>

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="px-4 py-1 border border-yellow-700 text-yellow-300 
                rounded-full hover:bg-yellow-600 hover:text-black transition"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Explore Button */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-8 py-3 rounded-full bg-yellow-700 
          hover:bg-yellow-600 text-black font-medium shadow-lg"
        >
          Explore Full Menu
        </motion.button>
      </motion.div>

    </section>
  );
}
