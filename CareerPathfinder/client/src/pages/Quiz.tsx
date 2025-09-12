import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, BarChart3, Target, Brain } from 'lucide-react';
import { api, type Question } from '@/utils/api';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { GrowthProspectBadge } from '@/utils/growthProspects';

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<'interest' | 'degree' | 'career'>('interest');
  const [careerResults, setCareerResults] = useState<any[]>([]);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Choice options for the 5-point scale
  const choiceOptions = [
    { value: 'strongly_dislike', label: 'Strongly Dislike' },
    { value: 'dislike', label: 'Dislike' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'like', label: 'Like' },
    { value: 'strongly_like', label: 'Strongly Like' }
  ];

  // Load questions by category
  useEffect(() => {
    const loadQuestions = async () => {
      if (currentStep === 'quiz') {
        setIsLoading(true);
        try {
          const categoryQuestions = await api.getQuestionsByCategory(currentCategory);
          setQuestions(categoryQuestions);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load questions. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadQuestions();
  }, [currentCategory, currentStep, toast]);

  // Default career results (fallback)
  const defaultCareerResults = [
    {
      career: "Software Engineer",
      match: 92,
      description: "Your analytical thinking and problem-solving skills align perfectly with software development.",
      skills: ["Programming", "Logic", "Creativity"],
      color: "from-blue-600 to-cyan-500",
      growth_prospects: "very_high"
    },
    {
      career: "Data Scientist", 
      match: 87,
      description: "Your love for mathematics and research makes you ideal for data analysis roles.",
      skills: ["Statistics", "Analysis", "Research"],
      color: "from-purple-600 to-pink-500",
      growth_prospects: "very_high"
    },
    {
      career: "Product Manager",
      match: 74,
      description: "Your communication skills and strategic thinking suit product management.",
      skills: ["Leadership", "Strategy", "Communication"],
      color: "from-green-600 to-emerald-500",
      growth_prospects: "high"
    }
  ];

  const handleAnswer = (questionId: number, choice: string) => {
    setAnswers({ ...answers, [questionId]: choice });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Move to next category or finish quiz
      if (currentCategory === 'interest') {
        setCurrentCategory('degree');
        setCurrentQuestion(0);
      } else if (currentCategory === 'degree') {
        setCurrentCategory('career');
        setCurrentQuestion(0);
      } else {
        submitQuiz();
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      // Go back to previous category
      if (currentCategory === 'degree') {
        setCurrentCategory('interest');
        setCurrentQuestion(questions.length - 1);
      } else if (currentCategory === 'career') {
        setCurrentCategory('degree');
        setCurrentQuestion(questions.length - 1);
      }
    }
  };

  const startQuiz = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to take the quiz.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep('quiz');
    setCurrentQuestion(0);
    setAnswers({});
    setCurrentCategory('interest');
  };

  const submitQuiz = async () => {
    setIsLoading(true);
    try {
      const answersArray = Object.entries(answers).map(([questionId, choice]) => ({
        question: parseInt(questionId),
        choice: choice
      }));

      // Submit answers
      console.log('Submitting answers:', answersArray);
      await api.submitAnswers({ answers: answersArray });
      console.log('Answers submitted successfully');
      
      // Analyze career recommendations
      console.log('Analyzing career recommendations...');
      const analysisResult = await api.analyzeCareerRecommendations();
      console.log('Analysis result:', analysisResult);
      
      // Format results for display
      const formattedResults = analysisResult.recommendations.map((rec, index) => ({
        career: rec.name,
        match: Math.round(rec.match_score),
        description: rec.reasoning,
        skills: rec.required_skills,
        color: getCareerColor(index),
        category: rec.category,
        salary_range: rec.salary_range,
        growth_prospects: rec.growth_prospects,
        work_environment: rec.work_environment
      }));
      
      setCareerResults(formattedResults);
      setCurrentStep('results');
      
      toast({
        title: "Quiz Completed",
        description: "Your personalized career recommendations are ready!",
      });
    } catch (error) {
      console.error('Quiz submission error:', error);
      console.error('Error details:', error);
      
      // Try to get saved recommendations if analysis fails
      try {
        const savedRecommendations = await api.getUserRecommendations();
        if (savedRecommendations.recommendations && savedRecommendations.recommendations.length > 0) {
          const formattedResults = savedRecommendations.recommendations.map((rec, index) => ({
            career: rec.career_name,
            match: Math.round(rec.match_score),
            description: rec.reasoning,
            skills: rec.career_skills,
            color: getCareerColor(index),
            category: rec.career_category,
            salary_range: "Not specified",
            growth_prospects: "medium", // Default to medium for saved recommendations
            work_environment: "Not specified"
          }));
          setCareerResults(formattedResults);
          setCurrentStep('results');
          toast({
            title: "Quiz Completed",
            description: "Showing your saved career recommendations!",
          });
          return;
        }
      } catch (savedError) {
        console.error('Failed to get saved recommendations:', savedError);
      }
      
      // Fallback to default results if everything fails
      setCareerResults(defaultCareerResults);
      setCurrentStep('results');
      toast({
        title: "Quiz Completed",
        description: "Your answers have been submitted. Showing sample results.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCareerColor = (index: number) => {
    const colors = [
      "from-blue-600 to-cyan-500",
      "from-purple-600 to-pink-500", 
      "from-green-600 to-emerald-500",
      "from-orange-600 to-red-500",
      "from-indigo-600 to-purple-500"
    ];
    return colors[index % colors.length];
  };

  const resetQuiz = () => {
    setCurrentStep('intro');
    setCurrentQuestion(0);
    setAnswers({});
    setCurrentCategory('interest');
    setCareerResults([]);
  };
  
  // Track quiz completion
  useEffect(() => {
    if (currentStep === 'results') {
      localStorage.setItem('quiz_completed', 'true');
    }
  }, [currentStep]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center" data-testid="quiz-intro">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Brain className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Career Interest <span className="gradient-text">Assessment</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover your ideal career path through our scientifically designed assessment. 
              Answer a few questions to get personalized career recommendations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass rounded-xl p-6">
                <Target className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Personalized Results</h3>
                <p className="text-sm text-gray-300">Get career recommendations tailored to your interests and skills</p>
              </div>
              <div className="glass rounded-xl p-6">
                <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Detailed Analysis</h3>
                <p className="text-sm text-gray-300">Understand your strengths and areas for development</p>
              </div>
              <div className="glass rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Actionable Insights</h3>
                <p className="text-sm text-gray-300">Get next steps and learning recommendations</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={startQuiz}
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-glow"
                data-testid="start-quiz-btn"
              >
                Start Assessment (5 minutes)
              </button>
              <div className="text-sm text-gray-400">
                <span>✨ Free • Science-backed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (currentStep === 'quiz') {
    if (isLoading) {
      return (
        <div className="min-h-screen py-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-300">Loading questions...</p>
          </div>
        </div>
      );
    }

    if (questions.length === 0) {
      return (
        <div className="min-h-screen py-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-300">No questions available for this category.</p>
            <button
              onClick={resetQuiz}
              className="mt-4 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }

    const totalQuestions = 28; // Total questions across all categories
    const currentQuestionIndex = currentCategory === 'interest' ? currentQuestion :
                                currentCategory === 'degree' ? currentQuestion + 10 :
                                currentQuestion + 18;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    const question = questions[currentQuestion];

    return (
      <div className="min-h-screen py-20" data-testid="quiz-questions">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-sm text-gray-400">
                {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} • {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-purple-600 to-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-xl p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                {question.text}
              </h2>
              
              <div className="space-y-4 mb-8">
                {choiceOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      answers[question.id] === option.value
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-testid={`option-${index}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-4 ${
                        answers[question.id] === option.value
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-500'
                      }`} />
                      <span>{option.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  data-testid="prev-question"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>
                
                <button
                  onClick={nextQuestion}
                  disabled={!answers[question.id]}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all"
                  data-testid="next-question"
                >
                  {currentCategory === 'career' && currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Results page
  return (
    <div className="min-h-screen py-20" data-testid="quiz-results">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" {...fadeInUp}>
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your Career <span className="gradient-text">Assessment Results</span>
          </h1>
          <p className="text-xl text-gray-300">
            Based on your responses, here are your top career matches
          </p>
        </motion.div>

        <div className="space-y-6 mb-12">
          {(careerResults.length > 0 ? careerResults : defaultCareerResults).map((result, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              data-testid={`result-${index}`}
            >
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${result.color} rounded-lg flex items-center justify-center mr-4`}>
                      <span className="text-white font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{result.career}</h3>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-400 mr-2">Match Score:</span>
                          <span className="text-green-400 font-semibold">{result.match}%</span>
                        </div>
                        {result.growth_prospects && (
                          <GrowthProspectBadge prospect={result.growth_prospects} />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{result.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {result.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="w-16 h-16 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-700"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.match / 100)}`}
                        className="text-green-400"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold">{result.match}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className={`w-full mt-4 py-3 bg-gradient-to-r ${result.color} rounded-lg font-semibold hover:opacity-90 transition-opacity`}>
                Explore {result.career} Roadmap
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button
            onClick={resetQuiz}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors mr-4"
            data-testid="retake-quiz"
          >
            Retake Assessment
          </button>
          <button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-6 py-3 rounded-lg font-semibold transition-all">
            Download Results
          </button>
        </motion.div>
      </div>
    </div>
  );
}
