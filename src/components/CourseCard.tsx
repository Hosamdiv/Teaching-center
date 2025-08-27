import { motion } from "framer-motion";

interface Course {
  id: number;
  title: string;
  instructor: string;
  image: string;
  price: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.15)" }}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2">By {course.instructor}</p>
        <p className="font-semibold text-indigo-600">{course.price}</p>
      </div>
    </motion.div>
  );
};

export default CourseCard;
