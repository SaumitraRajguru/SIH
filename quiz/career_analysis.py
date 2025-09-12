from django.contrib.auth import get_user_model
from .models import Answer, Career, CareerRecommendation
import re
from typing import List, Dict, Tuple

User = get_user_model()

class CareerAnalyzer:
    """
    Analyzes user quiz responses and provides personalized career recommendations
    """
    
    def __init__(self):
        self.choice_weights = {
            'strongly_dislike': -2,
            'dislike': -1,
            'neutral': 0,
            'like': 1,
            'strongly_like': 2
        }
    
    def analyze_user_responses(self, user: User) -> List[Dict]:
        """
        Analyze user's quiz responses and return career recommendations
        """
        # Get all user answers
        user_answers = Answer.objects.filter(user=user)
        
        if not user_answers.exists():
            return []
        
        # Get all careers
        careers = Career.objects.all()
        
        # Calculate scores for each career
        career_scores = []
        for career in careers:
            score, reasoning = self._calculate_career_score(user_answers, career)
            if score > 0:  # Only include careers with positive scores
                career_scores.append({
                    'career': career,
                    'score': score,
                    'reasoning': reasoning
                })
        
        # Sort by score (highest first)
        career_scores.sort(key=lambda x: x['score'], reverse=True)
        
        # Save recommendations to database
        self._save_recommendations(user, career_scores[:10])  # Top 10
        
        return career_scores[:5]  # Return top 5 for display
    
    def _calculate_career_score(self, user_answers: List[Answer], career: Career) -> Tuple[float, str]:
        """
        Calculate match score for a specific career based on user answers
        """
        total_score = 0
        reasoning_parts = []
        
        # Analyze interest-based answers
        interest_score = self._analyze_interest_answers(user_answers, career)
        total_score += interest_score * 0.4  # 40% weight
        if interest_score > 0:
            reasoning_parts.append(f"Strong interest alignment ({interest_score:.1f}/10)")
        
        # Analyze degree-based answers
        degree_score = self._analyze_degree_answers(user_answers, career)
        total_score += degree_score * 0.3  # 30% weight
        if degree_score > 0:
            reasoning_parts.append(f"Educational path match ({degree_score:.1f}/10)")
        
        # Analyze career-specific answers
        career_score = self._analyze_career_answers(user_answers, career)
        total_score += career_score * 0.3  # 30% weight
        if career_score > 0:
            reasoning_parts.append(f"Career preference match ({career_score:.1f}/10)")
        
        # Convert to percentage (0-100)
        final_score = min(100, max(0, (total_score / 10) * 100))
        
        reasoning = "; ".join(reasoning_parts) if reasoning_parts else "Limited data available"
        
        return final_score, reasoning
    
    def _analyze_interest_answers(self, user_answers: List[Answer], career: Career) -> float:
        """
        Analyze interest-based answers against career keywords
        """
        interest_answers = [a for a in user_answers if a.question.category == 'interest']
        if not interest_answers:
            return 0
        
        total_score = 0
        matched_answers = 0
        
        for answer in interest_answers:
            question_text = answer.question.text.lower()
            choice_weight = self.choice_weights[answer.choice]
            
            # Check if question text contains career-related keywords
            for keyword in career.interest_keywords:
                if keyword.lower() in question_text:
                    total_score += choice_weight
                    matched_answers += 1
                    break
        
        if matched_answers == 0:
            return 0
        
        # Normalize to 0-10 scale
        return max(0, (total_score / matched_answers + 2) * 2.5)
    
    def _analyze_degree_answers(self, user_answers: List[Answer], career: Career) -> float:
        """
        Analyze degree-based answers against career degree requirements
        """
        degree_answers = [a for a in user_answers if a.question.category == 'degree']
        if not degree_answers:
            return 0
        
        total_score = 0
        matched_answers = 0
        
        for answer in degree_answers:
            question_text = answer.question.text.lower()
            choice_weight = self.choice_weights[answer.choice]
            
            # Check if question text contains career-related degree keywords
            for degree in career.degree_requirements:
                if degree.lower() in question_text:
                    total_score += choice_weight
                    matched_answers += 1
                    break
        
        if matched_answers == 0:
            return 0
        
        # Normalize to 0-10 scale
        return max(0, (total_score / matched_answers + 2) * 2.5)
    
    def _analyze_career_answers(self, user_answers: List[Answer], career: Career) -> float:
        """
        Analyze career-specific answers
        """
        career_answers = [a for a in user_answers if a.question.category == 'career']
        if not career_answers:
            return 0
        
        total_score = 0
        matched_answers = 0
        
        for answer in career_answers:
            question_text = answer.question.text.lower()
            choice_weight = self.choice_weights[answer.choice]
            
            # Check if question text mentions this career or related terms
            career_name_lower = career.name.lower()
            if career_name_lower in question_text:
                total_score += choice_weight
                matched_answers += 1
            else:
                # Check for related terms
                for skill in career.required_skills:
                    if skill.lower() in question_text:
                        total_score += choice_weight * 0.5  # Half weight for related skills
                        matched_answers += 1
                        break
        
        if matched_answers == 0:
            return 0
        
        # Normalize to 0-10 scale
        return max(0, (total_score / matched_answers + 2) * 2.5)
    
    def _save_recommendations(self, user: User, career_scores: List[Dict]):
        """
        Save career recommendations to database
        """
        # Clear existing recommendations for this user
        CareerRecommendation.objects.filter(user=user).delete()
        
        # Save new recommendations
        for item in career_scores:
            CareerRecommendation.objects.create(
                user=user,
                career=item['career'],
                match_score=item['score'],
                reasoning=item['reasoning']
            )
    
    def get_user_disliked_careers(self, user: User) -> List[str]:
        """
        Get list of careers user has strongly disliked
        """
        disliked_careers = []
        
        # Check career-specific answers for strong dislikes
        career_answers = Answer.objects.filter(
            user=user,
            question__category='career',
            choice__in=['strongly_dislike', 'dislike']
        )
        
        for answer in career_answers:
            question_text = answer.question.text.lower()
            # Extract career names from question text
            for career in Career.objects.all():
                if career.name.lower() in question_text:
                    disliked_careers.append(career.name)
        
        return list(set(disliked_careers))  # Remove duplicates

