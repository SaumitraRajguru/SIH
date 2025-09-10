from django.core.management.base import BaseCommand
from quiz.models import Question

class Command(BaseCommand):
    help = 'Add sample questions for career advisor quiz'

    def handle(self, *args, **options):
        # Interest-based questions
        interest_questions = [
            {
                'text': 'What do you think about gardening? Gardening involves nurturing plants, understanding soil conditions, and creating beautiful outdoor spaces. It requires patience, attention to detail, and a connection with nature.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about driving a car? Driving requires spatial awareness, quick decision-making, and the ability to navigate through traffic while following safety rules and regulations.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about advising others? Advising others involves listening to problems, analyzing situations, and providing guidance to help people make better decisions in their personal or professional lives.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about cooking? Cooking involves creativity, following recipes, understanding flavors, and the ability to prepare meals that bring joy and nourishment to people.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about teaching? Teaching involves explaining complex concepts, patience with different learning styles, and the ability to inspire and guide students in their educational journey.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about working with computers? Computer work involves problem-solving, logical thinking, and the ability to work with various software and programming languages to create digital solutions.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about helping people in need? Helping others involves empathy, compassion, and the desire to make a positive impact in people\'s lives through various forms of assistance and support.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about analyzing data? Data analysis involves working with numbers, identifying patterns, and using statistical methods to draw meaningful insights from information.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about designing things? Design involves creativity, understanding aesthetics, and the ability to create functional and visually appealing solutions for various problems.',
                'category': 'interest'
            },
            {
                'text': 'What do you think about managing projects? Project management involves planning, organizing resources, coordinating teams, and ensuring successful completion of goals within time and budget constraints.',
                'category': 'interest'
            }
        ]

        # Degree-based questions
        degree_questions = [
            {
                'text': 'What do you think about B.Com (Bachelor of Commerce)? B.Com is a 3-year undergraduate degree focusing on business, accounting, economics, and finance. It prepares students for careers in banking, finance, accounting, and business management.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about B.Tech (Bachelor of Technology)? B.Tech is a 4-year engineering degree that focuses on technical skills, problem-solving, and innovation. It covers various specializations like computer science, mechanical, civil, and electrical engineering.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about LLB (Bachelor of Laws)? LLB is a 3-year law degree that teaches legal principles, case studies, and legal reasoning. It prepares students for careers in law, judiciary, legal consulting, and corporate legal departments.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about MBBS (Bachelor of Medicine and Bachelor of Surgery)? MBBS is a 5.5-year medical degree that trains students to become doctors. It involves extensive study of human anatomy, diseases, treatments, and clinical practice.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about B.Sc (Bachelor of Science)? B.Sc is a 3-year science degree covering subjects like physics, chemistry, biology, mathematics, and computer science. It provides a strong foundation for research and technical careers.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about BBA (Bachelor of Business Administration)? BBA is a 3-year business degree focusing on management principles, marketing, human resources, and entrepreneurship. It prepares students for leadership roles in business.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about B.Arch (Bachelor of Architecture)? B.Arch is a 5-year architecture degree that combines creativity with technical skills. It involves designing buildings, understanding construction, and creating functional spaces.',
                'category': 'degree'
            },
            {
                'text': 'What do you think about B.Ed (Bachelor of Education)? B.Ed is a 2-year teacher training degree that prepares students to become educators. It covers teaching methods, child psychology, and educational theories.',
                'category': 'degree'
            }
        ]

        # Career-based questions
        career_questions = [
            {
                'text': 'What do you think about working in the IT sector? The IT sector involves developing software, managing networks, cybersecurity, data analysis, and creating digital solutions. It offers high growth potential and competitive salaries.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a lawyer? Being a lawyer involves representing clients in court, providing legal advice, drafting documents, and ensuring justice. It requires strong analytical skills and knowledge of law.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a doctor? Being a doctor involves diagnosing and treating patients, performing surgeries, and saving lives. It requires extensive medical knowledge, compassion, and the ability to work under pressure.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a teacher? Teaching involves educating students, developing lesson plans, and inspiring young minds. It requires patience, communication skills, and a passion for knowledge sharing.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming an engineer? Engineering involves designing, building, and maintaining systems and structures. It requires problem-solving skills, technical knowledge, and the ability to work with complex systems.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a business manager? Business management involves leading teams, making strategic decisions, and ensuring organizational success. It requires leadership skills, analytical thinking, and business acumen.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a designer? Design involves creating visual solutions, understanding user needs, and combining aesthetics with functionality. It requires creativity, technical skills, and attention to detail.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a researcher? Research involves investigating problems, conducting experiments, and contributing to knowledge. It requires curiosity, analytical skills, and the ability to work independently.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming a social worker? Social work involves helping vulnerable populations, advocating for social justice, and providing support services. It requires empathy, communication skills, and a desire to help others.',
                'category': 'career'
            },
            {
                'text': 'What do you think about becoming an entrepreneur? Entrepreneurship involves starting and running your own business, taking risks, and creating innovative solutions. It requires creativity, leadership, and the ability to handle uncertainty.',
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
