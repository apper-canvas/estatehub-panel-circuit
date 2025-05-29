import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 glass border-b border-surface-200 dark:border-surface-700"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                <ApperIcon name="Home" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gradient">EstateHub</h1>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name={darkMode ? "Sun" : "Moon"} className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary hidden sm:flex items-center space-x-2"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>List Property</span>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative py-12 sm:py-16 lg:py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold text-surface-900 dark:text-surface-100 mb-6"
          >
            Find Your Perfect
            <span className="text-gradient block mt-2">Dream Home</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg sm:text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto mb-8"
          >
            Discover thousands of properties, connect with trusted agents, and make your real estate dreams come true with EstateHub's comprehensive marketplace platform.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
              <ApperIcon name="MapPin" className="w-5 h-5 text-primary" />
              <span>500+ Cities</span>
            </div>
            <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
              <ApperIcon name="Building2" className="w-5 h-5 text-primary" />
              <span>10,000+ Properties</span>
            </div>
            <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
              <ApperIcon name="Users" className="w-5 h-5 text-primary" />
              <span>Verified Agents</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Feature */}
      <MainFeature />

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-surface-900 dark:text-surface-100 mb-4">
              Why Choose EstateHub?
            </h3>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Experience the future of real estate with our innovative platform designed for modern property seekers and sellers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "Search",
                title: "Smart Search",
                description: "Advanced filtering system to find exactly what you're looking for with precision and speed."
              },
              {
                icon: "Shield",
                title: "Verified Listings",
                description: "All properties are verified by our team ensuring accuracy and preventing fraudulent listings."
              },
              {
                icon: "MessageCircle",
                title: "Direct Communication",
                description: "Connect directly with property owners and agents through our secure messaging system."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card p-8 text-center hover:shadow-neu-light dark:hover:shadow-neu-dark transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  {feature.title}
                </h4>
                <p className="text-surface-600 dark:text-surface-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-surface-900 dark:bg-surface-950 text-surface-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <ApperIcon name="Home" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">EstateHub</h3>
              </div>
              <p className="text-surface-400 mb-6 max-w-md">
                Your trusted partner in real estate. Find, list, and manage properties with ease on our comprehensive marketplace platform.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram", "Linkedin"].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-surface-800 rounded-lg flex items-center justify-center hover:bg-surface-700 transition-colors"
                  >
                    <ApperIcon name={social} className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Browse Properties", "List Property", "Find Agents", "Market Insights"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-800 mt-12 pt-8 text-center">
            <p>&copy; 2024 EstateHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home