import { BookOpen, TrendingUp, Award, ExternalLink, Clock, User } from "lucide-react";

export default function GuidanceArticles() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
            Guidance Articles
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Expert insights and comprehensive guides to help you make informed decisions about your educational journey
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <a
            href="#"
            className="group block bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <ExternalLink className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">
              Top 10 Reasons to Pursue Higher Education
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Understand why a degree can transform your opportunities and open doors to a brighter future.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-blue-300 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>8 min read</span>
              </div>
              <div className="flex items-center text-blue-300 text-sm">
                <User className="w-4 h-4 mr-2" />
                <span>Dr. Sarah Johnson</span>
              </div>
            </div>
          </a>

          <a
            href="#"
            className="group block bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <ExternalLink className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-200 transition-colors">
              Future of Jobs in India
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Explore the skills and roles shaping the next decade. Stay ahead of the curve in India's evolving job market.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-green-300 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>12 min read</span>
              </div>
              <div className="flex items-center text-green-300 text-sm">
                <User className="w-4 h-4 mr-2" />
                <span>Prof. Rajesh Kumar</span>
              </div>
            </div>
          </a>

          <a
            href="#"
            className="group block bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 sm:col-span-2"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <ExternalLink className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
              Scholarship Guide 2025
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Comprehensive guide to finding scholarships, understanding eligibility criteria, and mastering the application process.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-purple-300 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>15 min read</span>
              </div>
              <div className="flex items-center text-purple-300 text-sm">
                <User className="w-4 h-4 mr-2" />
                <span>Financial Aid Team</span>
              </div>
            </div>
          </a>
        </div>

        {/* Additional Resources */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">More Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Career Planning</h3>
              <p className="text-gray-400 text-sm">Step-by-step career planning guides</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Mentorship</h3>
              <p className="text-gray-400 text-sm">Connect with industry professionals</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Success Stories</h3>
              <p className="text-gray-400 text-sm">Real success stories and case studies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


