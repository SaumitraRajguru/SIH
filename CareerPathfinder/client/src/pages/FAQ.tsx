import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, MessageSquare, BookOpen, Users, Phone, Mail } from 'lucide-react';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const faqCategories = [
    {
      id: 1,
      title: "Getting Started",
      icon: BookOpen,
      color: "from-blue-600 to-cyan-500",
      questions: [
        {
          id: 1,
          question: "How do I create an account on CareerGuide?",
          answer: "Click the 'Login/Signup' button in the top navigation, select 'Sign Up', fill in your details including your class (10 or 12), and verify your email with the code sent to you. For demo purposes, use verification code 123456."
        },
        {
          id: 2,
          question: "What features are available for Class 10 vs Class 12 students?",
          answer: "Class 10 students get career exploration tools, interest assessments, and general guidance about stream selection. Class 12 students receive detailed career roadmaps, college recommendations, entrance exam guidance, and job market insights specific to their chosen stream."
        },
        {
          id: 3,
          question: "Is CareerGuide free to use?",
          answer: "Yes! CareerGuide offers comprehensive career guidance completely free for all Indian students. Our mission is to make quality career counseling accessible to every student regardless of their financial background."
        }
      ]
    },
    {
      id: 2,
      title: "Career Assessment",
      icon: HelpCircle,
      color: "from-purple-600 to-pink-500",
      questions: [
        {
          id: 4,
          question: "How accurate is the career assessment quiz?",
          answer: "Our assessment is developed by career psychologists and validated with thousands of students. It considers your interests, aptitudes, personality traits, and academic preferences to provide scientifically-backed career recommendations with 85%+ accuracy."
        },
        {
          id: 5,
          question: "Can I retake the assessment if I'm not satisfied with results?",
          answer: "Absolutely! You can retake the assessment as many times as you want. We recommend waiting at least a month between attempts as your interests may evolve. Each assessment builds on your learning journey."
        },
        {
          id: 6,
          question: "How long does the career assessment take?",
          answer: "The complete assessment takes approximately 15-20 minutes. It includes questions about your interests, preferred work environment, academic strengths, and career motivations. Take your time to answer thoughtfully for best results."
        }
      ]
    },
    {
      id: 3,
      title: "Career Roadmaps",
      icon: Users,
      color: "from-green-600 to-emerald-500",
      questions: [
        {
          id: 7,
          question: "What information is included in career roadmaps?",
          answer: "Each roadmap includes step-by-step learning paths, required skills, educational qualifications, entrance exams, college recommendations, internship opportunities, salary expectations, and industry growth prospects. Updated regularly with market trends."
        },
        {
          id: 8,
          question: "Are the roadmaps specific to the Indian education system?",
          answer: "Yes! All our roadmaps are tailored for Indian students, including CBSE/ICSE curricula alignment, Indian university databases, regional college options, state-specific opportunities, and understanding of local job markets and cultural contexts."
        },
        {
          id: 9,
          question: "How often are career roadmaps updated?",
          answer: "We update our roadmaps quarterly to reflect changing industry trends, new educational programs, emerging technologies, and job market demands. Our team of industry experts ensures all information remains current and relevant."
        }
      ]
    },
    {
      id: 4,
      title: "Technical Support",
      icon: MessageSquare,
      color: "from-orange-600 to-red-500",
      questions: [
        {
          id: 10,
          question: "I'm having trouble with email verification. What should I do?",
          answer: "First, check your spam/junk folder. If you don't see the email, click 'Resend Code' on the verification page. For demo purposes, you can use code 123456. If issues persist, contact our support team."
        },
        {
          id: 11,
          question: "The website is loading slowly. How can I fix this?",
          answer: "Try refreshing the page, clearing your browser cache, or switching to a different browser. Ensure you have a stable internet connection. If problems continue, try accessing the site during off-peak hours or contact support."
        },
        {
          id: 12,
          question: "Can I access CareerGuide on mobile devices?",
          answer: "Yes! CareerGuide is fully responsive and works seamlessly on smartphones, tablets, and desktops. We recommend using the latest version of Chrome, Safari, or Firefox for the best experience."
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap(category => 
    category.questions.map(q => ({ ...q, categoryTitle: category.title, categoryColor: category.color }))
  );

  const filteredQuestions = allQuestions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleQuestion = (questionId: number) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <div className="min-h-screen py-20" data-testid="faq-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12" {...fadeInUp}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about CareerGuide. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="glass rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              data-testid="faq-search"
            />
          </div>
        </motion.div>

        {searchTerm ? (
          /* Search Results */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">
              Search Results ({filteredQuestions.length})
            </h2>
            <div className="space-y-4">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <motion.div
                    key={question.id}
                    className="glass rounded-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                      data-testid={`faq-question-${question.id}`}
                    >
                      <div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs bg-gradient-to-r ${question.categoryColor} text-white mb-2`}>
                          {question.categoryTitle}
                        </span>
                        <h3 className="font-semibold">{question.question}</h3>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform ${
                          openQuestion === question.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    <AnimatePresence>
                      {openQuestion === question.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-gray-300">
                            {question.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-gray-400">Try different keywords or contact our support team</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* FAQ Categories */
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                className="glass rounded-xl p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + categoryIndex * 0.1, duration: 0.6 }}
                data-testid={`faq-category-${category.id}`}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((question, questionIndex) => (
                    <motion.div
                      key={question.id}
                      className="border border-gray-600 rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + questionIndex * 0.05, duration: 0.4 }}
                    >
                      <button
                        onClick={() => toggleQuestion(question.id)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                        data-testid={`faq-question-${question.id}`}
                      >
                        <h3 className="font-semibold">{question.question}</h3>
                        <ChevronDown 
                          className={`w-5 h-5 transition-transform ${
                            openQuestion === question.id ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      <AnimatePresence>
                        {openQuestion === question.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 text-gray-300 border-t border-gray-600 pt-4">
                              {question.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Contact Support Section */}
        <motion.div 
          className="glass rounded-xl p-8 mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-300 mb-6">
            Our support team is here to help you with any questions about your career journey
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center p-4 bg-gray-800/50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-400 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Live Chat</div>
                <div className="text-sm text-gray-400">Available 24/7</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-4 bg-gray-800/50 rounded-lg">
              <Mail className="w-6 h-6 text-green-400 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Email Support</div>
                <div className="text-sm text-gray-400">support@careerguide.in</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-4 bg-gray-800/50 rounded-lg">
              <Phone className="w-6 h-6 text-purple-400 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Phone Support</div>
                <div className="text-sm text-gray-400">1800-XXX-XXXX</div>
              </div>
            </div>
          </div>

          <button 
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-glow"
            data-testid="contact-support-btn"
          >
            Contact Support Team
          </button>
        </motion.div>
      </div>
    </div>
  );
}
