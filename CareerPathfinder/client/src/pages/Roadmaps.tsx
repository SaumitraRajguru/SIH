import { motion } from 'framer-motion';
import { MapPin, Clock, CheckCircle, ArrowRight, BookOpen, Trophy } from 'lucide-react';

export default function Roadmaps() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const roadmaps = [
    {
      id: 1,
      title: "Software Engineer",
      description: "Complete roadmap from beginner to industry-ready developer",
      duration: "18-24 months",
      difficulty: "Intermediate",
      students: "12K+",
      steps: [
        { title: "Programming Fundamentals", completed: true, duration: "3 months" },
        { title: "Data Structures & Algorithms", completed: true, duration: "4 months" },
        { title: "Web Development", completed: false, duration: "6 months" },
        { title: "System Design", completed: false, duration: "3 months" },
        { title: "Interview Preparation", completed: false, duration: "2 months" }
      ],
      color: "from-blue-600 to-cyan-500"
    },
    {
      id: 2,
      title: "Data Scientist",
      description: "Master data analysis, machine learning, and AI technologies",
      duration: "20-26 months",
      difficulty: "Advanced",
      students: "8K+",
      steps: [
        { title: "Statistics & Mathematics", completed: false, duration: "4 months" },
        { title: "Python Programming", completed: false, duration: "3 months" },
        { title: "Data Analysis & Visualization", completed: false, duration: "5 months" },
        { title: "Machine Learning", completed: false, duration: "6 months" },
        { title: "Deep Learning & AI", completed: false, duration: "4 months" }
      ],
      color: "from-purple-600 to-pink-500"
    },
    {
      id: 3,
      title: "Digital Marketing",
      description: "Build expertise in modern marketing strategies and tools",
      duration: "12-16 months",
      difficulty: "Beginner",
      students: "15K+",
      steps: [
        { title: "Marketing Fundamentals", completed: false, duration: "2 months" },
        { title: "Social Media Marketing", completed: false, duration: "3 months" },
        { title: "Content Creation", completed: false, duration: "3 months" },
        { title: "SEO & Analytics", completed: false, duration: "4 months" },
        { title: "Paid Advertising", completed: false, duration: "3 months" }
      ],
      color: "from-green-600 to-emerald-500"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen py-20" data-testid="roadmaps-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12" {...fadeInUp}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Career <span className="gradient-text">Roadmaps</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow step-by-step guides designed by industry experts to reach your dream career
          </p>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <MapPin className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Career Roadmaps <span className="gradient-text">Coming Soon</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're working hard to bring you comprehensive, step-by-step career roadmaps tailored for Indian students. 
            Stay tuned for personalized learning paths that will guide you to your dream career.
          </p>
          
          <div className="glass rounded-xl p-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">What to expect:</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-300">Step-by-step learning paths</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-300">Industry-aligned curriculum</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-300">Skill assessments & tracking</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-300">Career outcome guarantees</span>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-glow mr-4">
              Get Notified When Ready
            </button>
            <button className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Explore Careers Instead
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
