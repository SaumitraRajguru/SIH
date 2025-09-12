import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Search, Filter } from "lucide-react";
import { api, type Career } from '@/utils/api';
import { GrowthProspectBadge, getGrowthProspectConfig } from '@/utils/growthProspects';

export default function Careers() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGrowthProspect, setSelectedGrowthProspect] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // Fetch careers from API
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setIsLoading(true);
        const response = await api.getAllCareers();
        setCareers(response.careers);
        setFilteredCareers(response.careers);
      } catch (error) {
        console.error('Failed to fetch careers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  // Filter careers based on search and filters
  useEffect(() => {
    let filtered = careers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(career =>
        career.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.required_skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(career => career.category === selectedCategory);
    }

    // Filter by growth prospect
    if (selectedGrowthProspect !== 'all') {
      filtered = filtered.filter(career => career.growth_prospects === selectedGrowthProspect);
    }

    setFilteredCareers(filtered);
  }, [careers, searchTerm, selectedCategory, selectedGrowthProspect]);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(careers.map(career => career.category)))];
  const growthProspects = ['all', 'very_high', 'high', 'medium', 'low'];

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading careers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20" data-testid="careers-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12" {...fadeInUp}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Explore <span className="gradient-text">Career Paths</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover {careers.length}+ career opportunities across various industries. 
            Find your passion and build a successful future.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="glass rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search careers, skills, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 appearance-none min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Growth Prospect Filter */}
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedGrowthProspect}
                onChange={(e) => setSelectedGrowthProspect(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 appearance-none min-w-[200px]"
              >
                {growthProspects.map(prospect => (
                  <option key={prospect} value={prospect}>
                    {prospect === 'all' ? 'All Demand Levels' : 
                     prospect === 'very_high' ? 'Very High Demand' :
                     prospect === 'high' ? 'High Demand' :
                     prospect === 'medium' ? 'Medium Demand' : 'Low Demand'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-gray-400">
            Showing {filteredCareers.length} of {careers.length} careers
          </p>
        </motion.div>

        {/* Careers Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {filteredCareers.map((career, index) => (
            <motion.div
              key={career.id}
              className="glass rounded-xl p-6 card-hover cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05, duration: 0.6 }}
              onClick={() => setSelectedCareer(career)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <GrowthProspectBadge prospect={career.growth_prospects} />
              </div>

              <h3 className="text-xl font-semibold mb-2">{career.name}</h3>
              <p className="text-gray-300 mb-4 text-sm line-clamp-3">{career.description}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Category:</p>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                  {career.category}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Key Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {career.required_skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {career.required_skills.length > 3 && (
                    <span className="text-xs text-gray-400 px-2 py-1">
                      +{career.required_skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>{career.salary_range}</span>
                </div>
                <span>View details →</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredCareers.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No careers found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </motion.div>
        )}

        {/* Career Detail Modal */}
        {selectedCareer && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCareer(null)}
          >
            <motion.div
              className="glass rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedCareer.name}</h2>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-300">{selectedCareer.category}</span>
                      <GrowthProspectBadge prospect={selectedCareer.growth_prospects} />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCareer(null)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedCareer.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Salary Range</h3>
                  <p className="text-gray-300">{selectedCareer.salary_range}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.required_skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Degree Requirements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.degree_requirements.map((degree, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                      >
                        {degree}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Work Environment</h3>
                <p className="text-gray-300">{selectedCareer.work_environment}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}