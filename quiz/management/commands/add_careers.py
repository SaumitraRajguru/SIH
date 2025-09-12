from django.core.management.base import BaseCommand
from quiz.models import Career

class Command(BaseCommand):
    help = 'Add career data for career analysis'

    def handle(self, *args, **options):
        careers_data = [
            {
                'name': 'Software Engineer',
                'category': 'Engineering & Technology',
                'description': 'Design, develop, and maintain software applications and systems. Work with programming languages, databases, and software development methodologies.',
                'required_skills': ['Programming', 'Problem Solving', 'Logic', 'Creativity', 'Communication'],
                'interest_keywords': ['computers', 'programming', 'software', 'technology', 'coding', 'algorithms'],
                'degree_requirements': ['B.Tech', 'Computer Science', 'Software Engineering'],
                'salary_range': '₹6-25 LPA',
                'growth_prospects': 'very_high',
                'work_environment': 'Office/Remote, Collaborative teams'
            },
            {
                'name': 'Data Scientist',
                'category': 'Engineering & Technology',
                'description': 'Analyze complex data to extract insights and make data-driven decisions. Use statistical methods, machine learning, and programming.',
                'required_skills': ['Statistics', 'Programming', 'Analysis', 'Research', 'Mathematics'],
                'interest_keywords': ['data', 'analysis', 'statistics', 'research', 'mathematics', 'patterns'],
                'degree_requirements': ['B.Tech', 'B.Sc', 'Mathematics', 'Statistics'],
                'salary_range': '₹8-30 LPA',
                'growth_prospects': 'very_high',
                'work_environment': 'Office/Remote, Research-focused'
            },
            {
                'name': 'Product Manager',
                'category': 'Business & Finance',
                'description': 'Lead product development from conception to launch. Coordinate between teams, define product strategy, and ensure successful delivery.',
                'required_skills': ['Leadership', 'Strategy', 'Communication', 'Analytics', 'Project Management'],
                'interest_keywords': ['management', 'leadership', 'strategy', 'projects', 'business', 'coordination'],
                'degree_requirements': ['BBA', 'B.Tech', 'MBA', 'Business Administration'],
                'salary_range': '₹10-35 LPA',
                'growth_prospects': 'high',
                'work_environment': 'Office, Cross-functional teams'
            },
            {
                'name': 'Doctor',
                'category': 'Medical & Healthcare',
                'description': 'Diagnose and treat patients, perform medical procedures, and provide healthcare services. Specialize in various medical fields.',
                'required_skills': ['Medical Knowledge', 'Compassion', 'Problem Solving', 'Communication', 'Attention to Detail'],
                'interest_keywords': ['helping people', 'medicine', 'health', 'patients', 'diagnosis', 'treatment'],
                'degree_requirements': ['MBBS', 'Medical', 'Healthcare'],
                'salary_range': '₹8-50 LPA',
                'growth_prospects': 'very_high',
                'work_environment': 'Hospitals, Clinics, Healthcare facilities'
            },
            {
                'name': 'Lawyer',
                'category': 'Law',
                'description': 'Provide legal advice, represent clients in court, draft legal documents, and ensure justice and legal compliance.',
                'required_skills': ['Analytical Thinking', 'Communication', 'Research', 'Problem Solving', 'Ethics'],
                'interest_keywords': ['justice', 'law', 'legal', 'court', 'advocacy', 'rights'],
                'degree_requirements': ['LLB', 'Law', 'Legal Studies'],
                'salary_range': '₹5-40 LPA',
                'growth_prospects': 'high',
                'work_environment': 'Courts, Law firms, Corporate offices'
            },
            {
                'name': 'Teacher',
                'category': 'Education',
                'description': 'Educate students, develop lesson plans, assess learning, and inspire young minds. Specialize in various subjects and age groups.',
                'required_skills': ['Communication', 'Patience', 'Knowledge Sharing', 'Creativity', 'Empathy'],
                'interest_keywords': ['teaching', 'education', 'students', 'knowledge', 'learning', 'mentoring'],
                'degree_requirements': ['B.Ed', 'B.A', 'B.Sc', 'Education'],
                'salary_range': '₹3-12 LPA',
                'growth_prospects': 'medium',
                'work_environment': 'Schools, Colleges, Educational institutions'
            },
            {
                'name': 'Engineer',
                'category': 'Engineering & Technology',
                'description': 'Design, build, and maintain systems, structures, and technologies. Apply scientific and mathematical principles to solve problems.',
                'required_skills': ['Problem Solving', 'Technical Knowledge', 'Mathematics', 'Creativity', 'Analysis'],
                'interest_keywords': ['engineering', 'design', 'building', 'systems', 'technology', 'innovation'],
                'degree_requirements': ['B.Tech', 'Engineering', 'Technical'],
                'salary_range': '₹4-20 LPA',
                'growth_prospects': 'high',
                'work_environment': 'Offices, Construction sites, Manufacturing plants'
            },
            {
                'name': 'Business Manager',
                'category': 'Business & Finance',
                'description': 'Lead teams, make strategic decisions, manage operations, and ensure organizational success and growth.',
                'required_skills': ['Leadership', 'Strategic Thinking', 'Communication', 'Analytics', 'Decision Making'],
                'interest_keywords': ['management', 'leadership', 'business', 'strategy', 'teams', 'operations'],
                'degree_requirements': ['BBA', 'MBA', 'Business Administration', 'Management'],
                'salary_range': '₹6-25 LPA',
                'growth_prospects': 'high',
                'work_environment': 'Corporate offices, Various industries'
            },
            {
                'name': 'Designer',
                'category': 'Creative Arts & Design',
                'description': 'Create visual solutions, design products, interfaces, or experiences. Combine creativity with functionality and user needs.',
                'required_skills': ['Creativity', 'Visual Design', 'User Experience', 'Communication', 'Technical Skills'],
                'interest_keywords': ['design', 'creativity', 'visual', 'aesthetics', 'art', 'innovation'],
                'degree_requirements': ['B.Des', 'Design', 'Fine Arts', 'Visual Communication'],
                'salary_range': '₹4-18 LPA',
                'growth_prospects': 'high',
                'work_environment': 'Design studios, Tech companies, Creative agencies'
            },
            {
                'name': 'Researcher',
                'category': 'Research & Development',
                'description': 'Investigate problems, conduct experiments, analyze data, and contribute to scientific knowledge and innovation.',
                'required_skills': ['Research', 'Analytical Thinking', 'Curiosity', 'Problem Solving', 'Communication'],
                'interest_keywords': ['research', 'investigation', 'experiments', 'analysis', 'discovery', 'innovation'],
                'degree_requirements': ['B.Sc', 'M.Sc', 'PhD', 'Research'],
                'salary_range': '₹5-20 LPA',
                'growth_prospects': 'medium',
                'work_environment': 'Research labs, Universities, Corporate R&D'
            },
            {
                'name': 'Social Worker',
                'category': 'Social Services',
                'description': 'Help vulnerable populations, advocate for social justice, provide support services, and work for community welfare.',
                'required_skills': ['Empathy', 'Communication', 'Problem Solving', 'Advocacy', 'Cultural Sensitivity'],
                'interest_keywords': ['helping people', 'social work', 'community', 'welfare', 'advocacy', 'support'],
                'degree_requirements': ['B.A', 'Social Work', 'Psychology', 'Sociology'],
                'salary_range': '₹3-10 LPA',
                'growth_prospects': 'medium',
                'work_environment': 'Community centers, NGOs, Government agencies'
            },
            {
                'name': 'Entrepreneur',
                'category': 'Business & Finance',
                'description': 'Start and run your own business, take calculated risks, create innovative solutions, and build successful ventures.',
                'required_skills': ['Leadership', 'Risk Taking', 'Innovation', 'Business Acumen', 'Persistence'],
                'interest_keywords': ['entrepreneurship', 'business', 'innovation', 'startup', 'leadership', 'creativity'],
                'degree_requirements': ['BBA', 'MBA', 'Any degree', 'Business'],
                'salary_range': 'Variable (₹0-100+ LPA)',
                'growth_prospects': 'high',
                'work_environment': 'Startups, Own office, Various locations'
            },
            {
                'name': 'Pharmacist',
                'category': 'Medical & Healthcare',
                'description': 'Dispense medications, provide pharmaceutical care, ensure drug safety, and work in healthcare settings.',
                'required_skills': ['Medical Knowledge', 'Attention to Detail', 'Communication', 'Ethics', 'Problem Solving'],
                'interest_keywords': ['medicine', 'pharmacy', 'healthcare', 'medications', 'drugs', 'health'],
                'degree_requirements': ['B.Pharm', 'Pharmacy', 'Medical'],
                'salary_range': '₹4-15 LPA',
                'growth_prospects': 'high',
                'work_environment': 'Pharmacies, Hospitals, Pharmaceutical companies'
            },
            {
                'name': 'Chartered Accountant',
                'category': 'Business & Finance',
                'description': 'Provide financial expertise, conduct audits, handle taxation, and ensure financial compliance for businesses.',
                'required_skills': ['Analytical Skills', 'Attention to Detail', 'Mathematics', 'Ethics', 'Communication'],
                'interest_keywords': ['accounting', 'finance', 'audit', 'taxation', 'numbers', 'compliance'],
                'degree_requirements': ['CA', 'B.Com', 'Commerce', 'Accounting'],
                'salary_range': '₹6-30 LPA',
                'growth_prospects': 'very_high',
                'work_environment': 'Accounting firms, Corporate offices, Government'
            },
            {
                'name': 'Hotel Manager',
                'category': 'Hospitality & Tourism',
                'description': 'Manage hotel operations, ensure guest satisfaction, coordinate staff, and maintain service quality.',
                'required_skills': ['Leadership', 'Customer Service', 'Communication', 'Management', 'Problem Solving'],
                'interest_keywords': ['hospitality', 'management', 'service', 'guests', 'tourism', 'coordination'],
                'degree_requirements': ['Hotel Management', 'BBA', 'Hospitality'],
                'salary_range': '₹4-20 LPA',
                'growth_prospects': 'medium',
                'work_environment': 'Hotels, Resorts, Hospitality establishments'
            }
        ]

        created_count = 0
        for career_data in careers_data:
            career, created = Career.objects.get_or_create(
                name=career_data['name'],
                defaults=career_data
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created career: {career.name}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully added {created_count} new careers!')
        )
        self.stdout.write(f'Total careers in database: {Career.objects.count()}')

