import { authManager } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = authManager.getToken();

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.message || response.statusText);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, 'Network error occurred');
  }
}

// Types for Django backend
export interface Question {
  id: number;
  text: string;
  category: 'interest' | 'degree' | 'career';
  created_at: string;
}

export interface Answer {
  id: number;
  question: number;
  question_text: string;
  question_category: string;
  user: number;
  choice: 'strongly_dislike' | 'dislike' | 'neutral' | 'like' | 'strongly_like';
  created_at: string;
}

export interface QuizStats {
  total_questions: number;
  questions_by_category: {
    interest: number;
    degree: number;
    career: number;
  };
  choice_options: string[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  age: number | null;
  bio: string | null;
}

export const api = {
  // Auth endpoints
  signup: (data: {
    username: string;
    email: string;
    age: number;
    bio?: string;
    password: string;
  }) => apiRequest('/api/users/register/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  login: (data: { username: string; password: string }) =>
    apiRequest('/api/users/login/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  refresh: (data: { refresh: string }) =>
    apiRequest('/api/users/refresh/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Quiz endpoints
  getQuestions: () => apiRequest<Question[]>('/api/quiz/questions/'),
  
  getQuestionsByCategory: (category: string) => 
    apiRequest<Question[]>(`/api/quiz/questions/${category}/`),
  
  getQuizStats: () => apiRequest<QuizStats>('/api/quiz/stats/'),
  
  submitAnswer: (data: { question: number; choice: string }) =>
    apiRequest('/api/quiz/answers/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  submitAnswers: (data: { answers: Array<{ question: number; choice: string }> }) =>
    apiRequest('/api/quiz/answers/submit/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getUserAnswers: () => apiRequest<Answer[]>('/api/quiz/answers/my/'),
};
