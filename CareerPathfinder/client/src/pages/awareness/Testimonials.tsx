import { Quote, User, GraduationCap, Heart } from "lucide-react";

export default function Testimonials() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
            Parent & Student Testimonials
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Real stories from families who have experienced the transformative power of higher education
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-8 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mr-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm text-pink-300 font-medium">Parent</div>
                <div className="text-xl font-bold text-white">Asha Verma</div>
              </div>
            </div>
            <div className="relative">
              <Quote className="w-8 h-8 text-pink-400/50 absolute -top-2 -left-2" />
              <p className="text-gray-300 leading-relaxed text-lg pl-6">
                "Higher education opened doors I never imagined. My son is now the first
                graduate in our family and working as a software engineer in Bangalore."
              </p>
            </div>
            <div className="mt-6 flex items-center text-pink-300">
              <GraduationCap className="w-4 h-4 mr-2" />
              <span className="text-sm">Son: B.Tech Computer Science</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm text-blue-300 font-medium">Student</div>
                <div className="text-xl font-bold text-white">Rahul Singh</div>
              </div>
            </div>
            <div className="relative">
              <Quote className="w-8 h-8 text-blue-400/50 absolute -top-2 -left-2" />
              <p className="text-gray-300 leading-relaxed text-lg pl-6">
                "Internships and projects at college gave me the confidence to start my
                career in data analytics. The practical learning was invaluable."
              </p>
            </div>
            <div className="mt-6 flex items-center text-blue-300">
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm">B.Tech + MBA, Data Analyst at TechCorp</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm text-green-300 font-medium">Parent</div>
                <div className="text-xl font-bold text-white">Meera Joshi</div>
              </div>
            </div>
            <div className="relative">
              <Quote className="w-8 h-8 text-green-400/50 absolute -top-2 -left-2" />
              <p className="text-gray-300 leading-relaxed text-lg pl-6">
                "Scholarship support made it possible. My daughter is pursuing engineering
                and planning for a master's abroad. Education truly changes lives."
              </p>
            </div>
            <div className="mt-6 flex items-center text-green-300">
              <GraduationCap className="w-4 h-4 mr-2" />
              <span className="text-sm">Daughter: B.Tech Mechanical Engineering</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Share Your Story</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Have a success story about higher education? We'd love to hear from you and inspire others on their journey.
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25">
              Share Your Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


