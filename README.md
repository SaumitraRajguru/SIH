# Career Advisor - SIH India Project

A full-stack career guidance platform built with Django REST API backend and React frontend for Class 10 & 12 students.

## 🚀 Quick Start

### Prerequisites
- Python 3.11+ installed
- Node.js 18+ installed
- Git installed

### Quick Setup Options

#### Option 1: Automated Setup (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd career_advisor

# Run automated setup
python setup.py
```

#### Option 2: Platform-Specific Scripts
```bash
# Clone the repository
git clone <repository-url>
cd career_advisor

# Windows users
start_dev.bat

# macOS/Linux users
chmod +x start_dev.sh
./start_dev.sh
```

#### Option 3: Manual Setup
See [INSTALLATION.md](INSTALLATION.md) for detailed manual setup instructions.

### Access Your Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://127.0.0.1:8000
- **Admin Panel**: http://127.0.0.1:8000/admin/

## 🎯 Features

### ✅ Completed Features
- **User Authentication**: JWT-based login/signup system
- **Quiz System**: 28 questions across 3 categories (Interest, Degree, Career)
- **Real-time API**: Connected frontend to Django backend
- **Responsive UI**: Modern, mobile-friendly interface
- **Admin Panel**: Manage questions and view user responses

### 🔧 Technical Stack
- **Backend**: Django 4.2 + Django REST Framework
- **Frontend**: React 18 + TypeScript + Vite
- **Database**: SQLite (development)
- **Authentication**: JWT tokens
- **UI**: Tailwind CSS + Framer Motion

## 📊 Quiz Structure

### Question Categories
1. **Interest Questions** (10 questions)
   - Gardening, driving, advising, cooking, teaching, etc.
   
2. **Degree Questions** (8 questions)
   - B.Com, B.Tech, LLB, MBBS, B.Sc, BBA, B.Arch, B.Ed
   
3. **Career Questions** (10 questions)
   - IT sector, lawyer, doctor, teacher, engineer, etc.

### Response Scale
- Strongly Dislike
- Dislike
- Neutral
- Like
- Strongly Like

## 🔗 API Endpoints

### Authentication
- `POST /api/users/register/` - User registration
- `POST /api/users/login/` - User login
- `POST /api/users/refresh/` - Refresh JWT token

### Quiz
- `GET /api/quiz/questions/` - Get all questions
- `GET /api/quiz/questions/{category}/` - Get questions by category
- `GET /api/quiz/stats/` - Get quiz statistics
- `POST /api/quiz/answers/submit/` - Submit quiz answers
- `GET /api/quiz/answers/my/` - Get user's answers

## 🛠️ Development

### Backend Development
```bash
# Activate virtual environment first
.venv\Scripts\activate  # Windows
# or
source .venv/bin/activate  # macOS/Linux

# Create superuser
python manage.py createsuperuser

# Run migrations
python manage.py migrate

# Add sample questions
python manage.py add_sample_questions

# Access admin panel
http://127.0.0.1:8000/admin/
```

### Frontend Development
```bash
# Navigate to frontend directory
cd CareerPathFinder

# Install dependencies
npm install

# Start development server
npm run dev:frontend

# Build for production
npm run build
```

## 📁 Project Structure

```
career_advisor/
├── career_advisor/          # Django project settings
├── users/                   # User management app
├── quiz/                    # Quiz functionality app
├── CareerPathFinder/        # React frontend
│   ├── client/
│   │   ├── src/
│   │   │   ├── components/  # React components
│   │   │   ├── pages/       # Page components
│   │   │   ├── utils/       # API utilities
│   │   │   └── hooks/       # Custom hooks
│   │   └── public/
│   └── package.json
├── db.sqlite3              # SQLite database
├── requirements.txt        # Python dependencies
├── setup.py               # Automated setup script
├── start_dev.bat          # Windows development script
├── start_dev.sh           # Unix development script
├── .gitignore             # Git ignore rules
├── README.md              # This file
├── INSTALLATION.md        # Detailed installation guide
├── CONTRIBUTING.md        # Contribution guidelines
└── API_DOCUMENTATION.md   # API documentation
```

## 🔐 Admin Access

- **URL**: http://127.0.0.1:8000/admin/
- **Username**: [Create your own superuser]
- **Password**: [Set during superuser creation]

To create an admin user:
```bash
python manage.py createsuperuser
```

## 🎨 Frontend Features

- **Homepage**: Landing page with features overview
- **Authentication**: Login/Signup modal with JWT integration
- **Quiz Interface**: Multi-step quiz with progress tracking
- **Results**: Career recommendations based on responses
- **Responsive Design**: Works on desktop and mobile

## 🚀 Deployment Ready

The project is structured for easy deployment:
- Django backend can be deployed to any Python hosting service
- React frontend can be built and deployed to static hosting
- Database can be migrated to PostgreSQL for production

## 📝 Next Steps

1. **Career Recommendation Algorithm**: Implement logic to analyze quiz responses
2. **User Dashboard**: Show personalized career paths and recommendations
3. **Roadmaps**: Add detailed career roadmaps for each profession
4. **Admin Features**: Enhanced question management and analytics

## 🤝 Contributing

This is a SIH India hackathon project. For contributions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

---

**Built for SIH India 2025** 🚀
