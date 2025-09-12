# quiz/utils.py

# A sophisticated scoring map that considers both the answer and the question category
CATEGORY_SCORE_MAPPING = {
    'interest': {
        'love_it': 2,
        'strongly_like': 2,
        'like': 1,
        'neutral': 0,
        'dislike': -1,
        'strongly_dislike': -2,
        'hate_it': -2,
    },
    'degree': {
        'love_it': 1,
        'strongly_like': 1,
        'like': 0.5,
        'neutral': 0,
        'dislike': -0.5,
        'strongly_dislike': -1,
        'hate_it': -1,
    },
    'career': {
        'love_it': 2,
        'strongly_like': 2,
        'like': 1,
        'neutral': 0,
        'dislike': -1,
        'strongly_dislike': -2,
        'hate_it': -2,
    }
}

def score_quiz(user):
    """
    Scores a quiz attempt for a given user based on question category and choice.
    """
    from .models import Answer
    category_scores = {}
    
    answered_questions = Answer.objects.filter(user=user).select_related('question')

    for answer_obj in answered_questions:
        category = answer_obj.question.category
        score_text = answer_obj.choice
        
        # Get score from the specific category mapping, default to 0 if not found
        score_value = CATEGORY_SCORE_MAPPING.get(category, {}).get(score_text, 0)
        
        if category not in category_scores:
            category_scores[category] = {'score': 0, 'count': 0}
        
        category_scores[category]['score'] += score_value
        category_scores[category]['count'] += 1

    # Sort categories by score in descending order
    sorted_results = sorted(category_scores.items(), key=lambda item: item[1]['score'], reverse=True)
    
    return {
        'total_questions_answered': len(answered_questions),
        'recommendation': sorted_results
    }