from django.core.management.base import BaseCommand
from quiz.models import Question

class Command(BaseCommand):
    help = 'Add sample questions for career advisor quiz'

    def handle(self, *args, **options):
        # Interest-based questions (10 questions)
        interest_questions = [
            {
                'text': 'What do you think about working with computers and technology? This involves programming, software development, hardware design, and creating digital solutions for various problems.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about helping people and providing healthcare? This involves caring for patients, diagnosing medical conditions, and improving people\'s health and wellbeing.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about working with numbers and financial analysis? This involves analyzing financial data, managing investments, and making business decisions based on economic principles.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about designing and building things? This involves creating physical products, engineering solutions, and working with materials and manufacturing processes.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about teaching and sharing knowledge? This involves explaining concepts, mentoring others, and helping people learn and grow in their understanding.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about working with nature and agriculture? This involves farming, gardening, environmental conservation, and working with plants and animals.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about writing and communication? This involves creating content, reporting news, and effectively conveying information to different audiences.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about problem-solving and analytical thinking? This involves breaking down complex issues, finding solutions, and using logic to approach challenges.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about leadership and management? This involves guiding teams, making strategic decisions, and coordinating people and resources to achieve goals.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about creativity and artistic expression? This involves designing visual content, creating innovative solutions, and expressing ideas through various mediums.',
                'category': 'interest'
            }
        ]

        # Degree-based questions (10 questions)
        degree_questions = [
            {
                'text': 'What do you think about B.Tech in Computer Science/Engineering? This 4-year degree focuses on programming, software development, computer systems, and technology innovation.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about B.Tech in Mechanical Engineering? This 4-year degree covers machine design, manufacturing, thermodynamics, and mechanical systems.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about B.Tech in Electrical Engineering? This 4-year degree focuses on electrical systems, power generation, electronics, and circuit design.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about MBBS (Bachelor of Medicine and Bachelor of Surgery)? This 5.5-year medical degree trains students to become doctors, covering human anatomy, diseases, and clinical practice.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about BDS (Bachelor of Dental Surgery)? This 5-year dental degree prepares students to become dentists, focusing on oral health, dental procedures, and patient care.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about B.Ed (Bachelor of Education)? This 2-year teacher training degree prepares students to become educators, covering teaching methods and educational psychology.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about B.Com (Bachelor of Commerce)? This 3-year degree focuses on business, accounting, economics, and finance, preparing students for business and financial careers.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about BBA (Bachelor of Business Administration)? This 3-year business degree covers management, marketing, and entrepreneurship, preparing students for leadership roles.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about LLB (Bachelor of Laws)? This 3-year law degree teaches legal principles and reasoning, preparing students for careers in law and judiciary.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about B.Sc in Agriculture? This 4-year degree covers agricultural science, crop management, and farming techniques, preparing students for agricultural careers.',
                'category': 'degree'
            }
        ]

        # Career-based questions (10 questions)
        career_questions = [
            {
                'text': 'What do you think about becoming a Computer Engineer? This career involves designing computer hardware, developing software systems, and working with computer architecture and embedded systems.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a Mechanical Engineer? This career involves designing machines, manufacturing systems, and working with mechanical components and engineering solutions.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming an Electrical Engineer? This career involves designing electrical systems, working with power generation, and developing electronic devices and circuits.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a Doctor? This career involves diagnosing and treating patients, performing medical procedures, and providing healthcare services to improve people\'s health.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a Dentist? This career involves treating dental problems, performing oral surgeries, and providing preventive dental care to maintain oral health.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a Teacher? This career involves educating students, developing lesson plans, and inspiring young minds through knowledge sharing and mentorship.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a Farmer? This career involves cultivating crops, raising livestock, and managing agricultural operations to produce food and agricultural products.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming an Investment Banker? This career involves helping companies raise capital, providing financial advisory services, and facilitating business transactions.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a Lawyer? This career involves providing legal advice, representing clients in court, and ensuring justice and legal compliance in various matters.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a News Reporter? This career involves researching news stories, interviewing people, and reporting information to keep the public informed about current events.',
                'category': 'career'
            }
        ]

        # Add all questions
        all_questions = interest_questions + degree_questions + career_questions
        
        created_count = 0
        for question_data in all_questions:
            question, created = Question.objects.get_or_create(
                text=question_data['text'],
                defaults={'category': question_data['category']}
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created question: {question.text[:50]}...')
                )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully added {created_count} new questions!')
        )
        self.stdout.write(f'Total questions in database: {Question.objects.count()}')
