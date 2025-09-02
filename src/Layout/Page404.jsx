import { motion } from "framer-motion";

export default function Page404() {
  return (
    <div className="flex flex-col items-center w-[100%] h-[89vh] transition-all duration-1000 ease-in-out dark:bg-[linear-gradient(45deg,#000000_20%,#2563EB_100%)] dark:bg-cover dark:bg-no-repeat dark:bg-fixed bg-[white] dark:text-white  justify-center  bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800">
      {/* Animation 404 */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="text-[150px] font-extrabold text-purple-600 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Text */}
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-2xl font-medium mb-6"
      >
        Упс! Not Found 😢
      </motion.p>

      {/* Button */}
      <motion.a
        href="/"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 rounded-2xl bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition"
      >
        Go to Home
      </motion.a>
    </div>
  );
}
