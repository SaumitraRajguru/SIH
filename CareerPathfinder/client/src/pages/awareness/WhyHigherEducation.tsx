import { GraduationCap, TrendingUp, Users, Globe } from "lucide-react";

export default function WhyHigherEducation() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Why Higher Education Matters
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock your potential and build a brighter future through quality education
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Main Content */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                Career & Financial Growth
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Higher education opens doors to better jobs, stronger financial stability, and
                long‑term growth. It helps you build specialized knowledge and practical skills
                that employers value, while also developing critical thinking, communication, and
                problem‑solving abilities.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-400" />
                Personal Development
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Beyond careers, college or university life expands your perspective. You meet new
                people, explore ideas, and gain confidence through projects, internships, and
                campus experiences. These opportunities often lead to global exposure and networks
                that support you throughout your life.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-400" />
                Future Opportunities
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Whether you choose engineering, commerce, arts, or healthcare, higher education
                helps you grow personally and professionally—so you can adapt to future jobs and
                create more choices for yourself and your family.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Key Benefits at a Glance</h2>
              
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">40-60%</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Higher Salaries</p>
                    <p className="text-gray-400 text-sm">Graduates earn significantly more over lifetime</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">30%</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Lower Unemployment</p>
                    <p className="text-gray-400 text-sm">Better job security and stability</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">2-3x</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">More Career Paths</p>
                    <p className="text-gray-400 text-sm">Access to diverse opportunities and leadership roles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


