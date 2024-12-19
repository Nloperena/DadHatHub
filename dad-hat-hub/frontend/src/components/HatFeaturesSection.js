import React from "react";
import { motion } from "framer-motion";
import BackgroundImage from "../assets/DadHatTransparentBlank.png"; // Importing the image

const HatFeaturesSection = () => {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      className="relative py-12 px-6 md:py-16 md:px-12 bg-[#7E846B] text-[#D0DDD7]"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div> {/* Overlay for better text contrast */}
      <div className="relative max-w-6xl mx-auto text-center">
        <motion.div
          className="mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why You'll Love Our Hats
          </h2>
          <p className="text-lg md:text-xl">
            Discover the perfect blend of style, comfort, and quality with every
            hat we offer.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Feature 1 */}
          <motion.div
            className="bg-[#2F2504] rounded-lg p-6 shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-3">Timeless Design</h3>
            <p>
              Featuring a low-profile crown and curved visor, our hats bring
              effortless style to any outfit.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-[#2F2504] rounded-lg p-6 shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-3">Premium Comfort</h3>
            <p>
              Made with soft chino cotton twill, these hats are lightweight,
              breathable, and designed for all-day wear.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-[#2F2504] rounded-lg p-6 shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-3">Perfect Fit</h3>
            <p>
              An adjustable strap with a sleek antique buckle ensures the ideal
              fit for every head size.
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <a
            href="/shop"
            className="inline-block px-8 py-3 text-lg font-bold rounded-full shadow-lg transition-all duration-300"
            style={{
              backgroundColor: "#D0DDD7",
              color: "#1C1C1B",
              border: "2px solid #D0DDD7",
            }}
          >
            Shop Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HatFeaturesSection;
