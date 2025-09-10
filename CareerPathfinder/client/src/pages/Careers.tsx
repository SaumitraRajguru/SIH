import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, TrendingUp } from "lucide-react";

// Define a type for categories
interface CareerCategory {
  id: number;
  title: string;
  description: string;
  icon: string;
  careers: string[];
  popularity: string;
  color: string;
  details: string;
}

export default function Careers() {
  const [selectedCategory, setSelectedCategory] = useState<CareerCategory | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const careerCategories: CareerCategory[] = [
    {
      id: 1,
      title: "Engineering & Technology",
      description: "Build the future with innovative solutions",
      icon: "⚙️",
      careers: ["Computer Science", "Mechanical", "Civil", "Electrical", "Chemical"],
      popularity: "High",
      color: "from-blue-600 to-cyan-500",
      details: " Engineering is the foundation of all cutting-edge technology and modern development. This field fuses advanced mathematics, physics, and creative problem-solving to design and build infrastructure, smart devices, software, machines, vehicles, and energy systems. As an engineer, you become a professional innovator—working in sectors like software development, electronics, automotive, aerospace, robotics, energy, or construction. The skills gained are globally valued, enabling you to lead integral projects, develop pioneering solutions, build smarter cities, or even invent the future",
    },
    {
      id: 2,
      title: "Medical & Healthcare",
      description: "Save lives and improve health outcomes",
      icon: "🏥",
      careers: ["Doctor", "Nurse", "Dentist", "Pharmacologist", "Medical Researcher"],
      popularity: "Very High",
      color: "from-green-600 to-emerald-500",
      details: " Medicine is the science and art of diagnosing, treating, and preventing diseases to improve and sustain human health. Through rigorous study in biology, anatomy, pharmacology, and  clinical training, medical students become future doctors, surgeons, or specialists. The field  thrives on innovation—using new technology in diagnosis, telemedicine, and research. With  strong interpersonal skills and scientific curiosity, medicine empowers you to make life  saving impacts in hospitals, research labs, and global health care settings." ,
    },

    {
      id: 3,
      title: "Business & Finance",
      description: "Drive economic growth and innovation",
      icon: "💼",
      careers: ["Investment Banker", "Business Analyst", "Entrepreneur", "Auditor", "Financial Planner"],
      popularity: "High",
      color: "from-purple-600 to-pink-500",
      details: "Business and Finance careers focus on handling money wisely, whether for individuals, companies, or even governments. People in this field help businesses grow by making smart financial decisions and creating new job opportunities. They also guide investments, loans, and savings to keep the economy moving. Their work affects markets, prices, and even how people spend and earn money every day.",
    },
    {
      id: 4,
      title: "Creative Arts & Design",
      description: "Express creativity and inspire others",
      icon: "🎨",
      careers: ["Graphic Designer", "Filmmaker", "Writer", "Fashion Designer", "Animator"],
      popularity: "Medium",
      color: "from-orange-600 to-red-500",
      details: "Creative Arts and Design careers allow you to express ideas, emotions, and stories through art, visuals, and design. They give you the chance to use your imagination to create something unique and meaningful. People in this field design everything from paintings and films to fashion, graphics, and digital media. Their work inspires others, influences culture, and brings creativity into everyday life.",
    },
    {
      id: 5,
      title: "Pharmacy",
      description: "Design and dispense medicines responsibly",
      icon: "💊",
      careers: ["Pharmacist", "Clinical Researcher", "Drug Inspector"],
      popularity: "High",
      color: "from-pink-600 to-rose-500",
      details: "Pharmacy connects chemistry, biology, and medicine to the real-world application of drugs and therapeutics. Dive into how medicines are researched, developed, approved, manufactured, and supplied. Pharmacists ensure patients receive safe and effective treatments, work with doctors for optimal prescriptions, and contribute to breakthroughs in vaccine and drug developmnt. The career spans pharmaceutical industries, hospitals, regulatory bodies, and research institutes—making you an essential expert for global healthcare solutions.",
    },
      
    {
      id: 6,
      title: "Allied Health Science",
      description: "Support diagnosis and therapy with expertise",
      icon: "🧪",
      careers: ["Lab Technician", "Physiotherapist", "Radiographer", "Optometrist"],
      popularity: "High",
      color: "from-teal-600 to-green-500",
      details: "Allied health sciences include diverse, specialized programs supporting doctors and patients using advanced diagnostic and therapeutic tech. Study fields like physiotherapy, radiology, occupational therapy, and medical lab tech. You’ll operate cutting-edge medical equipment, contribute to diagnostics, and play a vital role in multidisciplinary healthcare teams. This field ensures quality, innovation, and expertise in hospitals, clinics, and diagnostics centers.",
    },

    {
      id: 7,
      title: "Law (LLB)",
      description: "Defend justice and uphold the legal system",
      icon: "⚖️",
      careers: ["Corporate Lawyer", "Criminal Lawyer", "Civil Lawyer", "Judge"],
      popularity: "High",
      color: "from-yellow-600 to-orange-500",
      details: "Law careers focus on justice, rights, and providing legal expertise in various sectors. This specialist route dives deep into legal systems, case law, and advocacy. Study criminal,civil, corporate, and cyber law; build litigation and advisory skills for careers in courts, MNCs, government, or policy think tanks. ",
    },
    {
      id: 8,
      title: " Bachelor of Hotel Management",
      description: "Deliver hospitality and manage luxury services",
      icon: "🏨",
      careers: ["Hotel Manager", "Chef", "Event Manager", "Travel Consultant"],
      popularity: "Medium",
      color: "from-indigo-600 to-purple-500",
      details: "Hotel Management careers are about hospitality, tourism, and guest satisfaction. Comprehensive, hands-on training in culinary arts, hospitality, and management. Learn global hotel operations, customer experience, and event planning for leadership roles in the luxury service sector. ",
    },
    {
      id: 9,
      title: "Chartered Accountancy (CA)",
      description: "Specialize in taxation, audit, and finance",
      icon: "📊",
      careers: ["Auditor", "Tax Consultant", "Forensic Accountant"],
      popularity: "Very High",
      color: "from-gray-700 to-black",
      details: "Dive into advanced accounting, auditing, costing, and taxation, honing your analytical and problem-solving skills. Chartered Accountants are the gold standard in financial stewardship—trusted to manage corporate, government, and global business finances. Their expertise is essential for high-stakes audits, mergers, financial strategy, compliance, and international business consultancy. ",
    },

    {
      id: 10,
      title: "BBA (Business Administration)",
      description: "Start your journey into management",
      icon: "📈",
      careers: ["HR Manager", "Marketing Executive", "Operations Manager"],
      popularity: "High",
      color: "from-cyan-600 to-blue-500",
      details: "BBA is the technical launchpad for those aspiring to leadership in business and management. The course blends subjects like business analytics, digital marketing, supply chain, and HR. Develop communication, project management, and entrepreneurial thinking skills, opening doors to roles in global corporates, startups, and management consulting. ",
    },

    {
      id: 11,
      title: "Bachelor of Arts (BA)",
      description: "Study humanities and social sciences",
      icon: "📚",
      careers: ["Historian", "Psychologist", "Teacher", "Social Worker"],
      popularity: "Medium",
      color: "from-red-600 to-pink-500",
      details: "A gateway to creativity, analysis, and global understanding, B.A. programs blend literature, social sciences, humanities, and languages. You’ll develop critical reasoning, communication skills, and cultural literacy—ideal for careers in civil services, diplomacy, media, education, or creative industries. ",
    },

    {
      id: 12,
      title: "Bachelor of Design",
      description: "Shape the world with innovative design",
      icon: "🖌️",
      careers: ["UI/UX Designer", "Product Designer", "Interior Designer"],
      popularity: "High",
      color: "from-violet-600 to-indigo-500",
      details: "Design careers blend creativity and function to create meaningful experiences.Fuses creativity, user empathy, and technology for innovation in product, interior, graphic, or fashion design. Collaborate, prototype, and create solutions that combine aesthetics with utility—pursue careers in tech, media, manufacturing, or luxury brands.",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12" {...fadeInUp}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore <span className="gradient-text">Career Paths</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover over 500+ career opportunities tailored for Class 10 and 12 students in India
          </p>
        </motion.div>

        {/* Career Categories */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {careerCategories.map((c, i) => (
            <motion.div
              key={c.id}
              className="glass rounded-xl p-6 card-hover cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              onClick={() => setSelectedCategory(c)}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${c.color} rounded-lg flex items-center justify-center text-2xl`}
                >
                  {c.icon}
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  {c.popularity} Demand
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
              <p className="text-gray-300 mb-4">{c.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {c.careers.map((career, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                  >
                    {career}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  <span>{c.careers.length}+ careers</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>View all →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Preview Modal */}
        {selectedCategory && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-gray-900 rounded-xl p-10 max-w-4xl w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
                onClick={() => setSelectedCategory(null)}
              >
                ✕
              </button>
              <h2 className="text-3xl font-bold mb-6">{selectedCategory.title}</h2>
              <p className="text-gray-300 mb-6">{selectedCategory.details}</p>
              <div className="flex flex-wrap gap-3">
                {selectedCategory.careers.map((career, idx) => (
                  <span
                    key={idx}
                    className="text-sm bg-gray-700 text-gray-300 px-3 py-2 rounded-full"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
