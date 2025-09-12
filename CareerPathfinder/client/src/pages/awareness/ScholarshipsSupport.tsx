import { Award, DollarSign, Users, Calendar, CheckCircle, ExternalLink } from "lucide-react";

export default function ScholarshipsSupport() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-yellow-100 to-orange-200 bg-clip-text text-transparent">
            Scholarships & Support Info
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Discover financial aid opportunities that can make higher education accessible and affordable for everyone
          </p>
        </div>

        {/* Intro Section */}
        <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-12">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Making Education Affordable</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Many students can reduce the cost of higher education through scholarships, government schemes, 
                and institutional support. Explore the programs below and check eligibility, deadlines, and required documents.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Scholarships Table */}
        <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <Award className="w-8 h-8 mr-3 text-yellow-400" />
              Available Scholarships
            </h2>
            <div className="text-sm text-gray-400">Updated for 2025</div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="px-6 py-4 text-left font-bold text-white text-lg">Scholarship Program</th>
                  <th className="px-6 py-4 text-left font-bold text-white text-lg">Eligibility Criteria</th>
                  <th className="px-6 py-4 text-left font-bold text-white text-lg">Benefits & Amount</th>
                  <th className="px-6 py-4 text-left font-bold text-white text-lg">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">National Talent Scholarship</div>
                        <div className="text-gray-400 text-sm">Government Program</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>Merit-based selection</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>12th grade score &gt; 85%</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>Annual family income &lt; &#8377;5L</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-4">
                      <div className="text-blue-200 font-bold text-lg">&#8377;50,000/year</div>
                      <div className="text-blue-300/70 text-sm">Full tuition coverage</div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 text-orange-400" />
                      <span>March 15, 2025</span>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">Inspire STEM Grant</div>
                        <div className="text-gray-400 text-sm">Private Foundation</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>STEM undergraduate students</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>First-generation college student</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>Maintain 3.0+ GPA</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="bg-green-900/30 border border-green-500/20 rounded-lg p-4">
                      <div className="text-green-200 font-bold text-lg">Fee Waiver + Mentoring</div>
                      <div className="text-green-300/70 text-sm">Industry mentorship program</div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 text-orange-400" />
                      <span>April 30, 2025</span>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">Equal Opportunity Fund</div>
                        <div className="text-gray-400 text-sm">Government Initiative</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>Need-based assistance</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>Annual income &lt; &#8377;3L</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>SC/ST/OBC categories</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-4">
                      <div className="text-purple-200 font-bold text-lg">Stipend + Exam Support</div>
                      <div className="text-purple-300/70 text-sm">&#8377;2,000/month + exam fees</div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 text-orange-400" />
                      <span>May 15, 2025</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-blue-400" />
              Application Tips
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Start applications early</li>
              <li>• Gather all required documents</li>
              <li>• Write compelling essays</li>
              <li>• Get recommendation letters</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-400" />
              Support Services
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Financial aid counseling</li>
              <li>• Application assistance</li>
              <li>• Document verification</li>
              <li>• Follow-up support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


