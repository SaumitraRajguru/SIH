# Installation Guide - Career Advisor

This guide will help you set up the Career Advisor project on your local machine.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

### Required Software
- **Python 3.11+** - [Download from python.org](https://www.python.org/downloads/)
- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **Git** - [Download from git-scm.com](https://git-scm.com/)

### Verify Installation
```bash
# Check Python version
python --version
# Should show Python 3.11.x or higher

# Check Node.js version
node --version
# Should show v18.x.x or higher

# Check npm version
npm --version
# Should show 9.x.x or higher

# Check Git version
git --version
# Should show git version 2.x.x or higher
```

## 🚀 Quick Setup (Automated)

### Option 1: Using Setup Script
```bash
# Clone the repository
git clone <repository-url>
cd career_advisor

# Run the automated setup script
python setup.py
```

### Option 2: Using Batch/Script Files
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

## 🛠️ Manual Setup

If you prefer to set up manually or the automated setup fails:

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd career_advisor
```

### Step 2: Backend Setup (Django)

#### Create Virtual Environment
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate
```

#### Install Dependencies
```bash
# Install Python packages
pip install -r requirements.txt
```

#### Database Setup
```bash
# Run database migrations
python manage.py migrate

# Create superuser (optional but recommended)
python manage.py createsuperuser

# Add sample questions
python manage.py add_sample_questions
```

#### Start Backend Server
```bash
python manage.py runserver
```
Backend will be available at: http://127.0.0.1:8000

### Step 3: Frontend Setup (React)

#### Navigate to Frontend Directory
```bash
cd CareerPathFinder
```

#### Install Dependencies
```bash
npm install
```

#### Start Frontend Server
```bash
npm run dev:frontend
```
Frontend will be available at: http://localhost:5173

## 🔧 Troubleshooting

### Common Issues

#### 1. Python Virtual Environment Issues
```bash
# If virtual environment creation fails
python -m venv .venv --clear

# If activation fails on Windows
.venv\Scripts\activate.bat

# If activation fails on macOS/Linux
source .venv/bin/activate
```

#### 2. Django Migration Issues
```bash
# If migrations fail
python manage.py makemigrations
python manage.py migrate

# If database is corrupted
rm db.sqlite3
python manage.py migrate
python manage.py add_sample_questions
```

#### 3. Node.js/NPM Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# If npm install fails, try with different registry
npm install --registry https://registry.npmjs.org/
```

#### 4. Port Already in Use
```bash
# If port 8000 is in use (Django)
python manage.py runserver 8001

# If port 5173 is in use (React)
npm run dev:frontend -- --port 5174
```

#### 5. Permission Issues (macOS/Linux)
```bash
# Make scripts executable
chmod +x start_dev.sh
chmod +x setup.py

# If permission denied for virtual environment
chmod -R 755 .venv
```

### Platform-Specific Issues

#### Windows
- Use Command Prompt or PowerShell as Administrator if needed
- Ensure Python and Node.js are added to PATH
- Use `python` instead of `python3`

#### macOS
- You might need to install Xcode Command Line Tools: `xcode-select --install`
- Use `python3` instead of `python` if both versions are installed

#### Linux
- Install build essentials: `sudo apt-get install build-essential`
- Install Python development headers: `sudo apt-get install python3-dev`

## ✅ Verification

After setup, verify everything is working:

### 1. Backend Verification
```bash
# Test Django server
curl http://127.0.0.1:8000/api/quiz/questions/

# Should return JSON with questions
```

### 2. Frontend Verification
- Open http://localhost:5173 in your browser
- You should see the Career Advisor homepage
- Try clicking "Get Started Free" to test the modal

### 3. Admin Panel Verification
- Open http://127.0.0.1:8000/admin/
- Login with your superuser credentials
- You should see the Django admin interface

## 🎯 Next Steps

1. **Create Admin User** (if not done during setup):
   ```bash
   python manage.py createsuperuser
   ```

2. **Access Your Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://127.0.0.1:8000
   - Admin Panel: http://127.0.0.1:8000/admin/

3. **Test the Complete Flow**:
   - Register a new user
   - Login with credentials
   - Take the quiz
   - Check admin panel for submitted answers

## 📞 Getting Help

If you encounter issues not covered in this guide:

1. Check the main README.md for additional information
2. Review the API documentation in API_DOCUMENTATION.md
3. Check Django and React documentation for framework-specific issues
4. Ensure all prerequisites are properly installed and up to date

## 🔄 Updating the Project

To update the project with latest changes:

```bash
# Pull latest changes
git pull origin main

# Update backend dependencies
.venv\Scripts\activate  # Windows
# or
source .venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python manage.py migrate

# Update frontend dependencies
cd CareerPathFinder
npm install
```

---

**Happy coding! 🚀**
