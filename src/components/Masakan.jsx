import { motion } from "framer-motion";
import resep1 from "../assets/puaba.png";  
import resep2 from "../assets/salad.png";
import resep3 from "../assets/jus.png";
import resep4 from "../assets/Dessert.png"

const Masakan = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen-85 bg-white flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div data-aos="fade-up" data-aos-duration="300">
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold text-white bg-primaryDark rounded-[10px] py-2">
            Hasil Olahan dari <span className="text-white">Strawberry</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto">
            Strawberry adalah buah yang luar biasa serbaguna dan dapat diolah menjadi berbagai macam hidangan lezat. Berkat rasa manis dan sedikit asamnya, strawberry bisa digunakan dalam berbagai resep, mulai dari makanan penutup hingga minuman.
          </p>
        </div>
          <div id="products"></div>
        <div data-aos="fade-up" data-aos-duration="300" className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-10">
          {[resep1, resep2, resep3, resep4].map((src, index) => (
            <div key={index} className="flex flex-col items-center mb-2">
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.img
                  src={src}
                  alt={`Recipe ${index + 1}`}
                  className="w-40 h-40 mb-2 transition-transform duration-300 img-shadow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                />
              </motion.div>
              
              <h2 className="text-xl font-bold mt-15">
                {index === 0 ? (
                  <span className="text-secondary">Selai</span>
                ) : index === 1 ? (
                  <span className="text-secondary">Salad</span>
                ) : index === 2 ? (
                  <span className="text-secondary">Juice</span>
                ) : (
                  <span className="text-secondary">Dessert</span>
                )}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Masakan;
