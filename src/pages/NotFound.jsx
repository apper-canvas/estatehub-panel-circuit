import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <ApperIcon name="Home" className="w-12 h-12 text-white" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-surface-900 dark:text-surface-100 mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-200 mb-4">
          Property Not Found
        </h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for seems to have moved or doesn't exist. Let's get you back to exploring amazing properties.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound