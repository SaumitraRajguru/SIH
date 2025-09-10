#!/usr/bin/env python3
"""
Setup script for Career Advisor project
This script helps set up the development environment
"""

import os
import sys
import subprocess
import platform

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e.stderr}")
        return False

def check_python_version():
    """Check if Python version is compatible"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 11):
        print("❌ Python 3.11+ is required. Please upgrade Python.")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} is compatible")
    return True

def check_node_version():
    """Check if Node.js is installed and compatible"""
    try:
        result = subprocess.run(["node", "--version"], capture_output=True, text=True)
        version = result.stdout.strip()
        print(f"✅ Node.js {version} is installed")
        return True
    except FileNotFoundError:
        print("❌ Node.js is not installed. Please install Node.js 18+")
        return False

def setup_backend():
    """Setup Django backend"""
    print("\n🚀 Setting up Django Backend...")
    
    # Create virtual environment
    if not os.path.exists(".venv"):
        if not run_command("python -m venv .venv", "Creating virtual environment"):
            return False
    
    # Activate virtual environment and install dependencies
    if platform.system() == "Windows":
        activate_cmd = ".venv\\Scripts\\activate"
        pip_cmd = ".venv\\Scripts\\pip"
        python_cmd = ".venv\\Scripts\\python"
    else:
        activate_cmd = "source .venv/bin/activate"
        pip_cmd = ".venv/bin/pip"
        python_cmd = ".venv/bin/python"
    
    # Install requirements
    if not run_command(f"{pip_cmd} install -r requirements.txt", "Installing Python dependencies"):
        return False
    
    # Run migrations
    if not run_command(f"{python_cmd} manage.py migrate", "Running database migrations"):
        return False
    
    # Add sample questions
    if not run_command(f"{python_cmd} manage.py add_sample_questions", "Adding sample questions"):
        return False
    
    print("✅ Backend setup completed!")
    return True

def setup_frontend():
    """Setup React frontend"""
    print("\n🚀 Setting up React Frontend...")
    
    # Navigate to frontend directory
    frontend_dir = "CareerPathFinder"
    if not os.path.exists(frontend_dir):
        print(f"❌ Frontend directory '{frontend_dir}' not found")
        return False
    
    # Install npm dependencies
    if not run_command(f"cd {frontend_dir} && npm install", "Installing Node.js dependencies"):
        return False
    
    print("✅ Frontend setup completed!")
    return True

def main():
    """Main setup function"""
    print("🎯 Career Advisor Setup Script")
    print("=" * 40)
    
    # Check prerequisites
    if not check_python_version():
        return False
    
    if not check_node_version():
        return False
    
    # Setup backend
    if not setup_backend():
        print("❌ Backend setup failed")
        return False
    
    # Setup frontend
    if not setup_frontend():
        print("❌ Frontend setup failed")
        return False
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Create a superuser: python manage.py createsuperuser")
    print("2. Start the development servers:")
    if platform.system() == "Windows":
        print("   - Windows: Double-click start_dev.bat")
    else:
        print("   - macOS/Linux: ./start_dev.sh")
    print("3. Access your application:")
    print("   - Frontend: http://localhost:5173")
    print("   - Backend: http://127.0.0.1:8000")
    print("   - Admin: http://127.0.0.1:8000/admin/")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
