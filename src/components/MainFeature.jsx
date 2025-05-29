import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    propertyType: 'all',
    listingType: 'all',
    priceRange: 'all',
    bedrooms: 'all',
    location: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [properties, setProperties] = useState([])
  const [savedProperties, setSavedProperties] = useState(new Set())
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock property data
  const mockProperties = [
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      description: 'Stunning 2-bedroom apartment in the heart of the city with panoramic views and modern amenities.',
      price: 450000,
      propertyType: 'apartment',
      listingType: 'sale',
      address: { street: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001' },
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        'https://images.unsplash.com/photo-1551361415-69c87624334f?w=800'
      ],
      amenities: ['Gym', 'Pool', 'Parking', 'Balcony'],
      agentId: 'agent1',
      agentName: 'Sarah Johnson',
      agentPhone: '+1 (555) 123-4567',
      createdDate: new Date('2024-01-15'),
      status: 'available'
    },
    {
      id: '2',
      title: 'Luxury Family Villa',
      description: 'Spacious 4-bedroom villa with private garden, perfect for families seeking comfort and elegance.',
      price: 850000,
      propertyType: 'house',
      listingType: 'sale',
      address: { street: '456 Oak Avenue', city: 'Los Angeles', state: 'CA', zipCode: '90210' },
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      images: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
      ],
      amenities: ['Garden', 'Garage', 'Pool', 'Security'],
      agentId: 'agent2',
      agentName: 'Michael Chen',
      agentPhone: '+1 (555) 987-6543',
      createdDate: new Date('2024-01-10'),
      status: 'available'
    },
    {
      id: '3',
      title: 'Cozy Studio Rental',
      description: 'Perfect studio apartment for young professionals, fully furnished with all amenities included.',
      price: 1200,
      propertyType: 'studio',
      listingType: 'rent',
      address: { street: '789 Pine St', city: 'San Francisco', state: 'CA', zipCode: '94102' },
      bedrooms: 1,
      bathrooms: 1,
      area: 500,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800'
      ],
      amenities: ['Furnished', 'WiFi', 'Kitchen', 'Laundry'],
      agentId: 'agent3',
      agentName: 'Emily Rodriguez',
      agentPhone: '+1 (555) 456-7890',
      createdDate: new Date('2024-01-20'),
      status: 'available'
    },
    {
      id: '4',
      title: 'Penthouse with City Views',
      description: 'Exclusive penthouse offering breathtaking city views and luxury finishes throughout.',
      price: 2500000,
      propertyType: 'penthouse',
      listingType: 'sale',
      address: { street: '101 Skyline Blvd', city: 'Miami', state: 'FL', zipCode: '33101' },
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800',
        'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800'
      ],
      amenities: ['Terrace', 'Concierge', 'Spa', 'Wine Cellar'],
      agentId: 'agent4',
      agentName: 'David Kim',
      agentPhone: '+1 (555) 321-0987',
      createdDate: new Date('2024-01-05'),
      status: 'available'
    }
  ]

  useEffect(() => {
    setProperties(mockProperties)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    filterProperties()
    toast.success('Search updated successfully!')
  }

  const filterProperties = () => {
    let filtered = mockProperties

    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (filters.propertyType !== 'all') {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType)
    }

    if (filters.listingType !== 'all') {
      filtered = filtered.filter(property => property.listingType === filters.listingType)
    }

    if (filters.bedrooms !== 'all') {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedrooms))
    }

    if (filters.location) {
      filtered = filtered.filter(property =>
        property.address.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.address.state.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number)
      filtered = filtered.filter(property => {
        if (max) {
          return property.price >= min && property.price <= max
        } else {
          return property.price >= min
        }
      })
    }

    setProperties(filtered)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const toggleSaveProperty = (propertyId) => {
    const newSaved = new Set(savedProperties)
    if (newSaved.has(propertyId)) {
      newSaved.delete(propertyId)
      toast.info('Property removed from saved list')
    } else {
      newSaved.add(propertyId)
      toast.success('Property saved successfully!')
    }
    setSavedProperties(newSaved)
  }

  const openPropertyModal = (property) => {
    setSelectedProperty(property)
    setCurrentImageIndex(0)
  }

  const closePropertyModal = () => {
    setSelectedProperty(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) =>
        (prev + 1) % selectedProperty.images.length
      )
    }
  }

  const prevImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProperty.images.length - 1 : prev - 1
      )
    }
  }

  const formatPrice = (price, listingType) => {
    if (listingType === 'rent') {
      return `$${price.toLocaleString()}/month`
    }
    return `$${price.toLocaleString()}`
  }

  const handleContactAgent = (property) => {
    toast.success(`Contact request sent to ${property.agentName}!`)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="card p-6 lg:p-8 mb-12"
        >
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Main Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ApperIcon name="Search" className="w-5 h-5 text-surface-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, property type, or keywords..."
                className="input-field pl-12 pr-20"
              />
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`absolute inset-y-0 right-0 px-4 flex items-center text-surface-600 dark:text-surface-400 hover:text-primary transition-colors ${
                  showFilters ? 'text-primary' : ''
                }`}
              >
                <ApperIcon name="SlidersHorizontal" className="w-5 h-5" />
              </button>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 border-t border-surface-200 dark:border-surface-700">
                    {/* Property Type */}
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Property Type
                      </label>
                      <select
                        value={filters.propertyType}
                        onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                        className="input-field"
                      >
                        <option value="all">All Types</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="studio">Studio</option>
                        <option value="penthouse">Penthouse</option>
                      </select>
                    </div>

                    {/* Listing Type */}
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Listing Type
                      </label>
                      <select
                        value={filters.listingType}
                        onChange={(e) => handleFilterChange('listingType', e.target.value)}
                        className="input-field"
                      >
                        <option value="all">Buy & Rent</option>
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                      </select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Price Range
                      </label>
                      <select
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                        className="input-field"
                      >
                        <option value="all">Any Price</option>
                        <option value="0-100000">Under $100K</option>
                        <option value="100000-500000">$100K - $500K</option>
                        <option value="500000-1000000">$500K - $1M</option>
                        <option value="1000000">Above $1M</option>
                      </select>
                    </div>

                    {/* Bedrooms */}
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Bedrooms
                      </label>
                      <select
                        value={filters.bedrooms}
                        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                        className="input-field"
                      >
                        <option value="all">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        placeholder="City or State"
                        className="input-field"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Button */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <button type="submit" className="btn-primary">
                <ApperIcon name="Search" className="w-4 h-4 mr-2" />
                Search Properties
              </button>
              
              <div className="text-sm text-surface-600 dark:text-surface-400">
                {properties.length} properties found
              </div>
            </div>
          </form>
        </motion.div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="property-card group cursor-pointer"
                onClick={() => openPropertyModal(property)}
              >
                {/* Property Image */}
                <div className="relative overflow-hidden h-48 lg:h-56">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Save Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSaveProperty(property.id)
                    }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-surface-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-surface-800 transition-colors"
                  >
                    <ApperIcon
                      name={savedProperties.has(property.id) ? "Heart" : "Heart"}
                      className={`w-5 h-5 ${
                        savedProperties.has(property.id)
                          ? 'text-red-500 fill-current'
                          : 'text-surface-600 dark:text-surface-400'
                      }`}
                    />
                  </button>

                  {/* Property Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                      {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 group-hover:text-primary transition-colors line-clamp-2">
                      {property.title}
                    </h3>
                  </div>

                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  {/* Price */}
                  <div className="text-2xl font-bold text-primary mb-4">
                    {formatPrice(property.price, property.listingType)}
                  </div>

                  {/* Property Features */}
                  <div className="flex items-center space-x-4 text-sm text-surface-600 dark:text-surface-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Bed" className="w-4 h-4" />
                      <span>{property.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Bath" className="w-4 h-4" />
                      <span>{property.bathrooms} bath</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Home" className="w-4 h-4" />
                      <span>{property.area} sqft</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2 text-sm text-surface-600 dark:text-surface-400">
                    <ApperIcon name="MapPin" className="w-4 h-4" />
                    <span>{property.address.city}, {property.address.state}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {properties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="SearchX" className="w-8 h-8 text-surface-400" />
            </div>
            <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
              No Properties Found
            </h3>
            <p className="text-surface-600 dark:text-surface-400">
              Try adjusting your search criteria or browse all properties.
            </p>
          </motion.div>
        )}

        {/* Property Detail Modal */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closePropertyModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-surface-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Carousel */}
                <div className="relative h-64 sm:h-80 lg:h-96">
                  <img
                    src={selectedProperty.images[currentImageIndex]}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {selectedProperty.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-surface-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-surface-800 transition-colors"
                      >
                        <ApperIcon name="ChevronLeft" className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-surface-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-surface-800 transition-colors"
                      >
                        <ApperIcon name="ChevronRight" className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  <button
                    onClick={closePropertyModal}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-surface-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-surface-800 transition-colors"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </button>

                  {/* Image indicators */}
                  {selectedProperty.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {selectedProperty.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="lg:flex-1">
                      <h2 className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                        {selectedProperty.title}
                      </h2>
                      <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400 mb-4">
                        <ApperIcon name="MapPin" className="w-4 h-4" />
                        <span>
                          {selectedProperty.address.street}, {selectedProperty.address.city}, {selectedProperty.address.state} {selectedProperty.address.zipCode}
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-primary mb-6">
                        {formatPrice(selectedProperty.price, selectedProperty.listingType)}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 lg:ml-8">
                      <button
                        onClick={() => toggleSaveProperty(selectedProperty.id)}
                        className={`btn-secondary flex items-center space-x-2 ${
                          savedProperties.has(selectedProperty.id) ? 'bg-red-50 text-red-600 border-red-200' : ''
                        }`}
                      >
                        <ApperIcon
                          name="Heart"
                          className={`w-4 h-4 ${
                            savedProperties.has(selectedProperty.id) ? 'fill-current' : ''
                          }`}
                        />
                        <span>{savedProperties.has(selectedProperty.id) ? 'Saved' : 'Save'}</span>
                      </button>
                      <button
                        onClick={() => handleContactAgent(selectedProperty)}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <ApperIcon name="MessageCircle" className="w-4 h-4" />
                        <span>Contact Agent</span>
                      </button>
                    </div>
                  </div>

                  {/* Property Features Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="text-center p-4 bg-surface-50 dark:bg-surface-900 rounded-lg">
                      <ApperIcon name="Bed" className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="font-semibold text-surface-900 dark:text-surface-100">{selectedProperty.bedrooms}</div>
                      <div className="text-sm text-surface-600 dark:text-surface-400">Bedrooms</div>
                    </div>
                    <div className="text-center p-4 bg-surface-50 dark:bg-surface-900 rounded-lg">
                      <ApperIcon name="Bath" className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="font-semibold text-surface-900 dark:text-surface-100">{selectedProperty.bathrooms}</div>
                      <div className="text-sm text-surface-600 dark:text-surface-400">Bathrooms</div>
                    </div>
                    <div className="text-center p-4 bg-surface-50 dark:bg-surface-900 rounded-lg">
                      <ApperIcon name="Home" className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="font-semibold text-surface-900 dark:text-surface-100">{selectedProperty.area}</div>
                      <div className="text-sm text-surface-600 dark:text-surface-400">Sq Ft</div>
                    </div>
                    <div className="text-center p-4 bg-surface-50 dark:bg-surface-900 rounded-lg">
                      <ApperIcon name="Calendar" className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="font-semibold text-surface-900 dark:text-surface-100">
                        {selectedProperty.createdDate.getFullYear()}
                      </div>
                      <div className="text-sm text-surface-600 dark:text-surface-400">Listed</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
                      Description
                    </h3>
                    <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                      {selectedProperty.description}
                    </p>
                  </div>

                  {/* Amenities */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {selectedProperty.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-3 bg-surface-50 dark:bg-surface-900 rounded-lg"
                        >
                          <ApperIcon name="Check" className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-surface-700 dark:text-surface-300">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agent Information */}
                  <div className="border-t border-surface-200 dark:border-surface-700 pt-6">
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
                      Listed by
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <ApperIcon name="User" className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-surface-900 dark:text-surface-100">
                          {selectedProperty.agentName}
                        </div>
                        <div className="text-surface-600 dark:text-surface-400">
                          Real Estate Agent
                        </div>
                        <div className="text-sm text-surface-500 dark:text-surface-400">
                          {selectedProperty.agentPhone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default MainFeature