import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { api, ApiError } from '@/utils/api';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

interface LoginSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginSignupModal({ isOpen, onClose }: LoginSignupModalProps) {
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Form states
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    age: '',
    bio: '',
    password: '',
  });

  const resetModal = () => {
    setIsSignupMode(false);
    setLoginForm({ username: '', password: '' });
    setSignupForm({ username: '', email: '', age: '', bio: '', password: '' });
    setIsLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.login(loginForm) as { access: string; refresh: string };
      // For Django, we need to get user info separately or from the token
      // For now, we'll create a basic user object
      const user = {
        id: 1,
        username: loginForm.username,
        email: '',
        age: null,
        bio: null
      };
      login({ access: response.access, refresh: response.refresh }, user);
      toast({
        title: "Login Successful",
        description: "Welcome back to CareerGuide!",
      });
      handleClose();
      setLocation('/dashboard');
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.signup({
        username: signupForm.username,
        email: signupForm.email,
        age: parseInt(signupForm.age),
        bio: signupForm.bio,
        password: signupForm.password,
      });
      toast({
        title: "Account Created",
        description: "Your account has been created successfully! You can now login.",
      });
      setIsSignupMode(false); // Switch to login mode
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
        data-testid="auth-modal-overlay"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="glass rounded-xl max-w-md w-full p-8 relative"
          onClick={(e) => e.stopPropagation()}
          data-testid="auth-modal"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            data-testid="close-modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Welcome to <span className="gradient-text">CareerGuide</span>
            </h2>
            <p className="text-gray-300">Start your career journey today</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex mb-6 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setIsSignupMode(false)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                !isSignupMode
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              data-testid="login-tab"
            >
              Login
            </button>
            <button
              onClick={() => setIsSignupMode(true)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                isSignupMode
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              data-testid="signup-tab"
            >
              Sign Up
            </button>
          </div>

          {!isSignupMode ? (
            <form onSubmit={handleLogin} className="space-y-4" data-testid="login-form">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                  data-testid="login-username"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                  data-testid="login-password"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 py-3 rounded-lg font-semibold transition-all duration-200 shadow-glow disabled:opacity-50 flex items-center justify-center"
                data-testid="login-submit"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4" data-testid="signup-form">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={signupForm.username}
                  onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                  data-testid="signup-username"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                  data-testid="signup-email"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Age"
                  min="14"
                  max="25"
                  required
                  value={signupForm.age}
                  onChange={(e) => setSignupForm({ ...signupForm, age: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                  data-testid="signup-age"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Bio (optional)"
                  value={signupForm.bio}
                  onChange={(e) => setSignupForm({ ...signupForm, bio: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                  data-testid="signup-bio"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                  data-testid="signup-password"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 py-3 rounded-lg font-semibold transition-all duration-200 shadow-glow disabled:opacity-50 flex items-center justify-center"
                data-testid="signup-submit"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
