import { BarChart3, TrendingUp, Users, Star } from "lucide-react";

export default function CareerOutcomes() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-6">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-green-100 to-blue-200 bg-clip-text text-transparent">
            Career Outcome Visuals
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Explore how different education levels impact your career trajectory and earning potential
          </p>
        </div>

        {/* Enhanced Chart placeholder */}
        <div className="mt-8 bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
              Career Growth Trajectory
            </h3>
            <div className="text-sm text-gray-400">Interactive Chart</div>
          </div>
          
          <div className="w-full h-64 md:h-80 flex items-center justify-center text-gray-300 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
            <div className="relative z-10 text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-green-400" />
              <p className="text-lg font-semibold">Career Growth Chart</p>
              <p className="text-sm text-gray-400 mt-2">Visual comparison of career progression across education levels</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400 text-center">Illustrative graph showing salary growth and career advancement opportunities</p>
        </div>

        {/* Enhanced Comparisons */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Education Level Impact</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">After 12th Only</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                  <span>Entry-level roles</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                  <span>Lower starting salary</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                  <span>Limited growth in specialized fields</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-red-500/10 rounded-lg">
                <p className="text-sm text-red-200 font-medium">Average Starting: &#8377;2-4 LPA</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">After Graduation</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span>Professional roles</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span>Better starting salary</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span>Broader career options</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                <p className="text-sm text-blue-200 font-medium">Average Starting: &#8377;4-8 LPA</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">After Post-Graduation</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span>Specialist/lead roles</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span>Higher salary band</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span>Leadership and research opportunities</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                <p className="text-sm text-green-200 font-medium">Average Starting: &#8377;8-15 LPA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


