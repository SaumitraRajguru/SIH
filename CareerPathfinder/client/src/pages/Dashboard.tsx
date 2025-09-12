import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Briefcase, Route, ClipboardCheck, HelpCircle, CheckCircle, Eye, MessageSquare } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const getRecentActivities = () => {
    const activities = [];
    
    // Check if user has taken quiz (based on localStorage or user actions)
    const hasCompletedQuiz = localStorage.getItem('quiz_completed');
    if (hasCompletedQuiz) {
      activities.push({
        id: 1,
        title: "Completed Interest Assessment Quiz",
        time: "Recently",
        icon: CheckCircle,
        color: "text-green-400",
        bgColor: "bg-purple-600"
      });
    }
    
    // Check career exploration
    const viewedCareers = localStorage.getItem('viewed_careers');
    if (viewedCareers) {
      activities.push({
        id: 2,
        title: "Explored Career Opportunities",
        time: "Today",
        icon: Eye,
        color: "text-blue-400",
        bgColor: "bg-blue-600"
      });
    }
    
    // Check if user signed up recently
    if (user) {
      activities.push({
        id: 3,
        title: "Joined CareerGuide Platform",
        time: "Welcome!",
        icon: MessageSquare,
        color: "text-green-400",
        bgColor: "bg-green-600"
      });
    }
    
    // If no activities, show welcome message
    if (activities.length === 0) {
      activities.push({
        id: 1,
        title: "Start your career journey",
        time: "Take the quiz or explore careers",
        icon: CheckCircle,
        color: "text-purple-400",
        bgColor: "bg-purple-600"
      });
    }
    
    return activities.slice(0, 3); // Show max 3 activities
  };
  
  const recentActivities = getRecentActivities();

  return (
    <div className="min-h-screen py-20" data-testid="dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div className="glass rounded-xl p-8 mb-12" {...fadeInUp}>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome, <span className="gradient-text" data-testid="user-name">{user?.name || 'Student'}!</span>
            </h1>
            <p className="text-gray-300">Ready to shape your career? </p>
          </div>
        </motion.div>

        {/* Dashboard Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {/* Careers Card */}
          <motion.div variants={fadeInUp}>
            <Link href="/careers">
              <a className="block glass rounded-xl p-6 card-hover cursor-pointer" data-testid="card-careers">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Explore Careers</h3>
                <p className="text-gray-300 text-sm mb-4">Discover 500+ career paths tailored for your interests</p>
                <div className="flex items-center text-purple-400">
                  <span className="mr-2">Explore</span>
                  <span>→</span>
                </div>
              </a>
            </Link>
          </motion.div>

          {/* Roadmaps Card */}
          <motion.div variants={fadeInUp}>
            <Link href="/roadmaps">
              <a className="block glass rounded-xl p-6 card-hover cursor-pointer" data-testid="card-roadmaps">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Route className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Roadmaps</h3>
                <p className="text-gray-300 text-sm mb-4">Step-by-step guides to your dream career</p>
                <div className="flex items-center text-blue-400">
                  <span className="mr-2">View Plans</span>
                  <span>→</span>
                </div>
              </a>
            </Link>
          </motion.div>

          {/* Quiz Card */}
          <motion.div variants={fadeInUp}>
            <Link href="/quiz">
              <a className="block glass rounded-xl p-6 card-hover cursor-pointer" data-testid="card-quiz">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Take Quiz</h3>
                <p className="text-gray-300 text-sm mb-4">Assess your interests and strengths by taking a short quiz</p>
                <div className="flex items-center text-green-400">
                  <span className="mr-2">Start Now</span>
                  <span>→</span>
                </div>
              </a>
            </Link>
          </motion.div>

          {/* FAQ Card */}
          <motion.div variants={fadeInUp}>
            <Link href="/faq">
              <a className="block glass rounded-xl p-6 card-hover cursor-pointer" data-testid="card-faq">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Help</h3>
                <p className="text-gray-300 text-sm mb-4">Find answers to common questions and get expert advice</p>
                <div className="flex items-center text-yellow-400">
                  <span className="mr-2">Learn More</span>
                  <span>→</span>
                </div>
              </a>
            </Link>
          </motion.div>
        </motion.div>

        {/* Recent Activity */}
        {/* <motion.div 
          className="glass rounded-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                data-testid={`activity-${activity.id}`}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 ${activity.bgColor} rounded-full flex items-center justify-center mr-4`}>
                    <activity.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-gray-400">{activity.time}</div>
                  </div>
                </div>
                <div className={activity.color}>
                  <activity.icon className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}
