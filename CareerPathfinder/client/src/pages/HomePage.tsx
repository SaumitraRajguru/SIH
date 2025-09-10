import { useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Bot, Route, ClipboardCheck, Users, BookOpen, Award, TrendingUp } from 'lucide-react';
import LoginSignupModal from '@/components/LoginSignupModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" data-testid="homepage">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Orbital Gradient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <style>{`
            @keyframes orbit {
              from { transform: rotate(0deg) translate(var(--orbit-radius)) rotate(0deg); }
              to { transform: rotate(360deg) translate(var(--orbit-radius)) rotate(-360deg); }
            }
            @keyframes orbit-reverse {
              from { transform: rotate(0deg) translate(var(--orbit-radius)) rotate(0deg); }
              to { transform: rotate(-360deg) translate(var(--orbit-radius)) rotate(360deg); }
            }
            .orbit-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
          `}</style>
          <div className="orbit-center">
            <div
              className="w-72 h-72 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full filter blur-3xl opacity-40"
              style={{ '--orbit-radius': '220px', animation: 'orbit 18s linear infinite' } as CSSProperties}
            />
            <div
              className="w-56 h-56 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full filter blur-3xl opacity-40"
              style={{ '--orbit-radius': '140px', animation: 'orbit-reverse 14s linear infinite', animationDelay: '1s' } as CSSProperties}
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div {...fadeInUp}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Shape Your <span className="gradient-text">Future</span>
              <br />
              Starting <span className="gradient-text">Today</span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Discover your perfect career path with AI-powered guidance, personalized roadmaps, and expert insights designed for Class 10 & 12 students across India.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-glow animate-glow"
              data-testid="get-started-btn"
            >
              Get Started Free
            </button>
            <button className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200" data-testid="watch-demo-btn">
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-3xl font-bold gradient-text">10K+</div>
              <div className="text-gray-400">Students Guided</div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-3xl font-bold gradient-text">500+</div>
              <div className="text-gray-400">Career Paths</div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-3xl font-bold gradient-text">50+</div>
              <div className="text-gray-400">Universities</div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-3xl font-bold gradient-text">98%</div>
              <div className="text-gray-400">Success Rate</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with expert insights to provide personalized career guidance for every student.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* AI Chatbot Feature */}
            <motion.div className="glass rounded-xl p-8 card-hover" variants={fadeInUp} data-testid="feature-ai">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI Career Advisor</h3>
              <p className="text-gray-300 mb-6">
                Get instant, personalized career advice from our advanced AI chatbot trained on thousands of career paths and industry insights.
              </p>
              <div className="flex items-center text-purple-400">
                <span className="mr-2">Try Now</span>
                <TrendingUp className="w-4 h-4" />
              </div>
            </motion.div>

            {/* Roadmaps Feature */}
            <motion.div className="glass rounded-xl p-8 card-hover" variants={fadeInUp} data-testid="feature-roadmaps">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
                <Route className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Career Roadmaps</h3>
              <p className="text-gray-300 mb-6">
                Follow step-by-step roadmaps designed specifically for Class 10 and 12 students to reach your dream career goals.
              </p>
              <div className="flex items-center text-blue-400">
                <span className="mr-2">Explore Paths</span>
                <TrendingUp className="w-4 h-4" />
              </div>
            </motion.div>

            {/* Quiz Feature */}
            <motion.div className="glass rounded-xl p-8 card-hover" variants={fadeInUp} data-testid="feature-quiz">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-green-500 rounded-lg flex items-center justify-center mb-6">
                <ClipboardCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Interest Assessment</h3>
              <p className="text-gray-300 mb-6">
                Discover your strengths and interests through scientifically designed quizzes tailored for Indian students.
              </p>
              <div className="flex items-center text-green-400">
                <span className="mr-2">Take Quiz</span>
                <TrendingUp className="w-4 h-4" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-600/10 via-blue-500/10 to-transparent blur-xl pointer-events-none" />
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="font-extrabold">About </span>
              <span className="gradient-text">CareerGuide</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Our platform is built for Class 10 and 12 students who need clear, trustworthy guidance. Many students and parents are unsure about career paths, what different degrees actually lead to, and which government colleges offer the right options. This lack of awareness can cause confusion, hesitation, or the wrong choices. We make the next step simple. Get personalized career guidance based on your aptitude and interests, clear course‑to‑career roadmaps, and smart suggestions tailored to you. Explore nearby government colleges with details on courses, eligibility, and facilities—so you can plan confidently, close to home. Our promise is simple: supportive, honest advice that builds clarity and confidence—for every student and every parent.
            </p>
          </motion.div>
        </div>
      </section>

      <LoginSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
