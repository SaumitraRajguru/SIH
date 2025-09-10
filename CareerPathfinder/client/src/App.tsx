import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
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
