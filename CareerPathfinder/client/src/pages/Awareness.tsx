import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

type AwarenessItem = {
  title: string;
  description: string;
  href: string;
};

const items: AwarenessItem[] = [
  {
    title: "Why Higher Education Matters",
    description: "Understand the long-term benefits of pursuing higher studies.",
    href: "/awareness/why-higher-education",
  },
  {
    title: "Career Outcome Visuals",
    description: "Explore career paths and real-world outcomes across fields.",
    href: "/awareness/career-outcomes",
  },
  {
    title: "Parent & Student Testimonials",
    description: "Hear experiences and journey highlights from families.",
    href: "/awareness/testimonials",
  },
  {
    title: "Without vs With Higher Education",
    description: "Compare opportunities and growth with visual examples.",
    href: "/awareness/with-vs-without-higher-education",
  },
  {
    title: "Guidance Articles",
    description: "Read curated articles to make informed decisions.",
    href: "/awareness/guidance-articles",
  },
  {
    title: "Scholarships & Support Info",
    description: "Find financial aid, scholarships, and assistance programs.",
    href: "/awareness/scholarships-support",
  },
  {
    title: "Q&A / Chatbot Awareness",
    description: "Common questions answered and chatbot guidance.",
    href: "/awareness/qa-chatbot",
  },
];

export default function Awareness() {
  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Awareness</h1>
          <p className="mt-2 text-gray-300">Explore resources to make confident career decisions.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className="block">
                <Card className="h-full bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-0.5">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-white mb-2">{item.title}</h2>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


