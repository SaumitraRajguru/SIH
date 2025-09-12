import { TrendingDown, TrendingUp, Star, Shield, DollarSign, Users } from "lucide-react";

export default function WithVsWithoutHigherEducation() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-6">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-orange-100 to-red-200 bg-clip-text text-transparent">
            Without vs With Higher Education
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive comparison showing the impact of education on career opportunities and life outcomes
          </p>
        </div>

        {/* Enhanced Comparison Table */}
        <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="px-6 py-4 text-left font-bold text-white text-lg">Category</th>
                  <th className="px-6 py-4 text-center font-bold text-red-300 text-lg">After 12th Only</th>
                  <th className="px-6 py-4 text-center font-bold text-blue-300 text-lg">After Graduation</th>
                  <th className="px-6 py-4 text-center font-bold text-green-300 text-lg">After Post‑Graduation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-6 text-gray-300 font-semibold flex items-center">
                    <Users className="w-5 h-5 mr-3 text-gray-400" />
                    Job Opportunities
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="bg-red-900/30 border border-red-500/20 rounded-lg p-4">
                      <p className="text-red-200 font-medium">Entry-level, limited roles</p>
                      <p className="text-red-300/70 text-xs mt-1">Basic positions only</p>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-blue-200 font-medium">Professional roles</p>
                      <p className="text-blue-300/70 text-xs mt-1">Diverse opportunities</p>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="bg-green-900/30 border border-green-500/20 rounded-lg p-4">
                      <p className="text-green-200 font-medium">Specialist/leadership roles</p>
                      <p className="text-green-300/70 text-xs mt-1">Executive positions</p>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-6 text-gray-300 font-semibold flex items-center">
                    <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
                    Salary Range
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="bg-red-900/30 border border-red-500/20 rounded-lg p-4">
                      <p className="text-red-200 font-medium">&#8377;2-4 LPA</p>
                      <p className="text-red-300/70 text-xs mt-1">Lower starting band</p>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-blue-200 font-medium">&#8377;4-8 LPA</p>
                      <p className="text-blue-300/70 text-xs mt-1">Competitive starting</p>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="bg-green-900/30 border border-green-500/20 rounded-lg p-4">
                      <p className="text-green-200 font-medium">&#8377;8-15+ LPA</p>
                      <p className="text-green-300/70 text-xs mt-1">Higher band + growth</p>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-6 text-gray-300 font-semibold flex items-center">
                    <TrendingUp className="w-5 h-5 mr-3 text-gray-400" />
                    Career Growth
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="bg-red-900/30 border border-red-500/20 rounded-lg p-4">
                      <p className="text-red-200 font-medium">Slower growth</p>
                      <p className="text-red-300/70 text-xs mt-1">Fewer advancement paths</p>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-blue-200 font-medium">Balanced growth</p>
                      <p className="text-blue-300/70 text-xs mt-1">More options available</p>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="bg-green-900/30 border border-green-500/20 rounded-lg p-4">
                      <p className="text-green-200 font-medium">Fast growth</p>
                      <p className="text-green-300/70 text-xs mt-1">Advanced roles</p>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-6 text-gray-300 font-semibold flex items-center">
                    <Shield className="w-5 h-5 mr-3 text-gray-400" />
                    Job Stability
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="bg-red-900/30 border border-red-500/20 rounded-lg p-4">
                      <p className="text-red-200 font-medium">Less stable</p>
                      <p className="text-red-300/70 text-xs mt-1">Vulnerable to changes</p>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-blue-200 font-medium">Moderate stability</p>
                      <p className="text-blue-300/70 text-xs mt-1">Better security</p>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="bg-green-900/30 border border-green-500/20 rounded-lg p-4">
                      <p className="text-green-200 font-medium">High stability</p>
                      <p className="text-green-300/70 text-xs mt-1">Maximum security</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <TrendingDown className="w-8 h-8 text-red-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Without Higher Education</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Limited opportunities, lower earning potential, and reduced job security in an increasingly competitive market.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-bold text-white">With Graduation</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Significant improvement in opportunities, better starting salaries, and access to professional networks.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Star className="w-8 h-8 text-green-400 mr-3" />
              <h3 className="text-xl font-bold text-white">With Post-Graduation</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Maximum opportunities, leadership roles, highest earning potential, and excellent job security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


