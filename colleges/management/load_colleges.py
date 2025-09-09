import csv
from django.core.management.base import BaseCommand
from colleges.models import College
import json

class Command(BaseCommand):
    help = 'Loads college data from a CSV file.'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The path to the colleges CSV file.')

    def handle(self, *args, **kwargs):
        file_path = kwargs['csv_file']
        self.stdout.write(self.style.SUCCESS(f'Starting to load colleges from {file_path}...'))
        
        # A simple CSV with columns: name, city, state, courses_offered (pipe-separated)
        # e.g., "IIT Bombay,Mumbai,Maharashtra,cse|ece|me"
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                college_list = []
                for row in reader:
                    # Clean up and normalize data as needed
                    courses = [course.strip().lower() for course in row['courses_offered'].split('|')]
                    
                    college_list.append(
                        College(
                            name=row['name'],
                            city=row['city'],
                            state=row['state'],
                            courses_offered=courses
                        )
                    )
                
                # Use bulk_create for efficiency
                College.objects.bulk_create(college_list)
                self.stdout.write(self.style.SUCCESS(f'Successfully loaded {len(college_list)} colleges.'))
                
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'File not found at {file_path}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {e}'))