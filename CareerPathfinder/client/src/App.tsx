import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import Awareness from "@/pages/Awareness";
import WhyHigherEducation from "@/pages/awareness/WhyHigherEducation";
import CareerOutcomes from "@/pages/awareness/CareerOutcomes";
import Testimonials from "@/pages/awareness/Testimonials";
import WithVsWithoutHigherEducation from "@/pages/awareness/WithVsWithoutHigherEducation";
import GuidanceArticles from "@/pages/awareness/GuidanceArticles";
import ScholarshipsSupport from "@/pages/awareness/ScholarshipsSupport";
import QaChatbot from "@/pages/awareness/QaChatbot";
import Dashboard from "@/pages/Dashboard";
import Careers from "@/pages/Careers";
import Roadmaps from "@/pages/Roadmaps";
import Quiz from "@/pages/Quiz";
import FAQ from "@/pages/FAQ";
import NotFound from "@/pages/not-found";

function AuthenticatedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <HomePage />;
  }
  
  return <Component />;
}

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/awareness" component={Awareness} />
        <Route path="/awareness/why-higher-education" component={WhyHigherEducation} />
        <Route path="/awareness/career-outcomes" component={CareerOutcomes} />
        <Route path="/awareness/testimonials" component={Testimonials} />
        <Route path="/awareness/with-vs-without-higher-education" component={WithVsWithoutHigherEducation} />
        <Route path="/awareness/guidance-articles" component={GuidanceArticles} />
        <Route path="/awareness/scholarships-support" component={ScholarshipsSupport} />
        <Route path="/awareness/qa-chatbot" component={QaChatbot} />
        <Route path="/dashboard">
          {() => <AuthenticatedRoute component={Dashboard} />}
        </Route>
        <Route path="/careers">
          {() => <AuthenticatedRoute component={Careers} />}
        </Route>
        <Route path="/roadmaps">
          {() => <AuthenticatedRoute component={Roadmaps} />}
        </Route>
        <Route path="/quiz">
          {() => <AuthenticatedRoute component={Quiz} />}
        </Route>
        <Route path="/faq">
          {() => <AuthenticatedRoute component={FAQ} />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
