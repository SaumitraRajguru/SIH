import json
from django.shortcuts import get_object_or_404
from .models import Question, Choice

def quiz_scoring_logic(answers):
    """
    Calculates the final score for each career based on user's answers.

    Args:
        answers (dict): A dictionary mapping question_id (str) to choice_id (str).
    
    Returns:
        tuple: A tuple containing a dictionary of final scores and a list of
               sorted top recommendations.
    """
    final_scores = {}

    for q_id, c_id in answers.items():
        try:
            question = get_object_or_404(Question, id=int(q_id))
            choice = get_object_or_404(Choice, id=int(c_id), question=question)

            # Accumulate scores from the choice's JSON field
            for career_slug, score in choice.scores.items():
                if career_slug in final_scores:
                    final_scores[career_slug] += score
                else:
                    final_scores[career_slug] = score
        except (ValueError, Question.DoesNotExist, Choice.DoesNotExist):
            # Log this error in a real app
            continue

    # Sort the careers by score in descending order
    sorted_scores = sorted(final_scores.items(), key=lambda item: item[1], reverse=True)
    
    # Get the top 3 recommendations with their scores
    recommendations = []
    for career_slug, score in sorted_scores[:3]:
        # You can fetch more career details here if needed
        recommendations.append({
            'name': career_slug.replace('-', ' ').title(),
            'slug': career_slug,
            'score': score
        })

    return final_scores, recommendations

def load_initial_data():
    """
    A helper function to seed the database with initial quiz questions and careers.
    This can be called from a management command or a simple script.
    """
    from .models import Career, Question, Choice

    # Create careers first
    careers_data = [
        {'name': 'Computer Science Engineering', 'slug': 'cse', 'description': 'Focuses on software, hardware, and algorithms.', 'pros': ['High demand', 'High salaries'], 'cons': ['Fast-paced changes', 'Long hours']},
        {'name': 'Information Technology', 'slug': 'it', 'description': 'Focuses on managing information systems and networks.', 'pros': ['Broad application', 'Good work-life balance'], 'cons': ['Less R&D focused', 'High-stress support roles']},
        {'name': 'Electronics & Communication Engineering', 'slug': 'ece', 'description': 'Deals with electronic devices and communication systems.', 'pros': ['Hardware and software skills', 'Foundation for many fields'], 'cons': ['Competitive', 'Needs continuous learning']},
        {'name': 'Mechanical Engineering', 'slug': 'me', 'description': 'Focuses on the design and maintenance of mechanical systems.', 'pros': ['Versatile', 'Hands-on work'], 'cons': ['Can be traditional', 'Often requires physical work']},
        {'name': 'Civil Engineering', 'slug': 'ce', 'description': 'Involves designing and building infrastructure like bridges and roads.', 'pros': ['Tangible impact', 'High societal value'], 'cons': ['Can be slow-paced', 'Weather-dependent projects']},
        {'name': 'Biotechnology Engineering', 'slug': 'biotech', 'description': 'Applies engineering principles to biological systems.', 'pros': ['Cutting-edge research', 'Solving global health problems'], 'cons': ['Highly regulated', 'Requires deep scientific knowledge']},
    ]

    for data in careers_data:
        Career.objects.get_or_create(slug=data['slug'], defaults=data)

    # Create questions and choices based on provided screenshots
    questions_data = [
        {
            'question_text': 'Which academic subject do you enjoy or excel in most?',
            'academic_level': '12th',
            'stream': 'Engineering',
            'choices': [
                {'choice_text': 'Computer Science', 'scores': {'cse': 5, 'it': 4, 'ece': 2}},
                {'choice_text': 'Physics', 'scores': {'cse': 2, 'ece': 3, 'me': 5, 'ce': 4, 'biotech': 1}},
                {'choice_text': 'Chemistry', 'scores': {'biotech': 5, 'me': 3, 'ce': 2}},
                {'choice_text': 'Biology', 'scores': {'biotech': 5, 'me': 1, 'ce': 1}},
            ]
        },
        {
            'question_text': 'Which of these practical activities sounds the most fun?',
            'academic_level': '12th',
            'stream': 'Engineering',
            'choices': [
                {'choice_text': 'Coding games or web apps', 'scores': {'cse': 5, 'it': 5, 'ece': 2}},
                {'choice_text': 'Fixing bikes or machines', 'scores': {'me': 5, 'ece': 3}},
                {'choice_text': 'Constructing model bridges/buildings', 'scores': {'ce': 5, 'me': 3}},
                {'choice_text': 'Setting up gadgets or simple circuits', 'scores': {'ece': 5, 'it': 3}},
            ]
        },
        {
            'question_text': 'Which science fair display would you most want to present?',
            'academic_level': '12th',
            'stream': 'Engineering',
            'choices': [
                {'choice_text': 'A mobile app that solves a problem', 'scores': {'cse': 5, 'it': 4}},
                {'choice_text': 'An engine or robot model', 'scores': {'me': 5}},
                {'choice_text': 'A self-cleaning water filter', 'scores': {'ce': 4, 'biotech': 3}},
                {'choice_text': 'A chemical experiment/demonstration', 'scores': {'biotech': 5, 'me': 2}},
            ]
        },
        {
            'question_text': 'Imagine you win a national contest—what is it most likely for?',
            'academic_level': '12th',
            'stream': 'Engineering',
            'choices': [
                {'choice_text': 'Designing a security system', 'scores': {'cse': 5, 'it': 5, 'ece': 3}},
                {'choice_text': 'Building a race car prototype', 'scores': {'me': 5}},
                {'choice_text': 'Sustainable city planning', 'scores': {'ce': 5}},
                {'choice_text': 'Biotechnology innovation', 'scores': {'biotech': 5}},
            ]
        },
        {
            'question_text': 'Which industry headline excites you most?',
            'academic_level': '12th',
            'stream': 'Engineering',
            'choices': [
                {'choice_text': 'Indian student team wins for AI project in Silicon Valley', 'scores': {'cse': 5, 'it': 4}},
                {'choice_text': 'Solar airplane completes global journey', 'scores': {'me': 4, 'ece': 2}},
                {'choice_text': 'Skyscraper survives record earthquake', 'scores': {'ce': 5}},
                {'choice_text': 'Lab grows insulin using gene editing', 'scores': {'biotech': 5}},
            ]
        },
    ]

    for q_data in questions_data:
        question_obj, created = Question.objects.get_or_create(
            question_text=q_data['question_text'],
            academic_level=q_data['academic_level'],
            stream=q_data['stream']
        )
        for c_data in q_data['choices']:
            Choice.objects.get_or_create(
                question=question_obj,
                choice_text=c_data['choice_text'],
                defaults={'scores': c_data['scores']}
            )