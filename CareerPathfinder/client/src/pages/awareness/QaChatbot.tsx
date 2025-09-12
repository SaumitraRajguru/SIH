import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Bot, Users, BookOpen } from "lucide-react";

type FaqItem = {
  q: string;
  a: string;
  category: string;
};

const faqs: FaqItem[] = [
  {
    q: "Is higher education worth the cost?",
    a: "Yes. Studies indicate graduates earn ~50% more over a lifetime and have better job stability. The investment typically pays for itself within 5-7 years of graduation.",
    category: "Financial"
  },
  {
    q: "Can I get scholarships if my family income is low?",
    a: "Many need-based programs exist at national and state levels, plus institute-specific aid. Over 60% of students receive some form of financial assistance.",
    category: "Financial"
  },
  {
    q: "What if I am unsure which degree to choose?",
    a: "Start with your interests and strengths. Explore careers, talk to mentors, and take aptitude tests. Many students change majors, and that's perfectly normal.",
    category: "Career Planning"
  },
  {
    q: "Do internships really help?",
    a: "Internships provide real-world exposure, build confidence, and often lead to job offers. 70% of students with internship experience receive job offers before graduation.",
    category: "Career Planning"
  },
  {
    q: "Can I study abroad on a budget?",
    a: "Yes. Look for scholarships, exchange programs, and countries with lower tuition for international students. Many programs offer full or partial funding.",
    category: "International"
  },
];

export default function QaChatbot() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-6">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
            Q&A / Chatbot Awareness
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Get instant answers to common questions about higher education and career planning
          </p>
        </div>

        {/* Chatbot Preview */}
        <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-12 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Bot className="w-6 h-6 mr-3 text-cyan-400" />
              AI Career Assistant
            </h2>
            <div className="flex items-center text-cyan-300 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>Online</span>
            </div>
          </div>
          <p className="text-gray-300 mb-6">
            Our intelligent chatbot can answer your questions 24/7 about career paths, scholarships, 
            college applications, and more. Try asking: "What careers are best for science students?"
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
            Start Chatting
          </button>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <HelpCircle className="w-8 h-8 mr-3 text-cyan-400" />
              Frequently Asked Questions
            </h2>
            <div className="text-sm text-gray-400">5 questions</div>
          </div>

          <div className="space-y-4">
            {faqs.map((f, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="bg-gray-800/40 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300">
                  <button
                    className="w-full text-left px-6 py-5 focus:outline-none hover:bg-gray-800/60 transition-colors group"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                          <HelpCircle className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <span className="font-semibold text-white text-lg group-hover:text-cyan-200 transition-colors">{f.q}</span>
                          <div className="text-xs text-cyan-300 mt-1">{f.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-cyan-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        )}
                      </div>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 border-t border-gray-700">
                      <div className="pt-4 text-gray-300 leading-relaxed">
                        {f.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Support */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
            <p className="text-gray-400 text-sm">Get instant help from our support team</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
            <p className="text-gray-400 text-sm">Connect with other students and parents</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Resources</h3>
            <p className="text-gray-400 text-sm">Access guides and helpful articles</p>
          </div>
        </div>
      </div>
    </div>
  );
}


