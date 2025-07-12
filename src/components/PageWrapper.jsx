// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
        {children}
        </motion.div>
    );
};

export default PageWrapper;