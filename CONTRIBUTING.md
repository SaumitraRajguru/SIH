# Contributing to Career Advisor

Thank you for your interest in contributing to the Career Advisor project! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/career_advisor.git
   cd career_advisor
   ```
3. **Set up the development environment** following the [INSTALLATION.md](INSTALLATION.md) guide
4. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Workflow

### Backend Development (Django)
```bash
# Activate virtual environment
.venv\Scripts\activate  # Windows
# or
source .venv/bin/activate  # macOS/Linux

# Make your changes to Django code
# Run tests
python manage.py test

# Create migrations if you modified models
python manage.py makemigrations
python manage.py migrate
```

### Frontend Development (React)
```bash
# Navigate to frontend directory
cd CareerPathFinder

# Make your changes to React code
# Run the development server
npm run dev:frontend

# Run tests (if available)
npm test
```

## 📝 Code Style Guidelines

### Python/Django
- Follow PEP 8 style guide
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Keep functions small and focused

### JavaScript/React
- Use TypeScript for type safety
- Follow React best practices
- Use meaningful component and variable names
- Keep components small and focused

### General
- Write clear commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 🧪 Testing

### Backend Testing
```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test quiz
python manage.py test users
```

### Frontend Testing
```bash
cd CareerPathFinder
npm test
```

## 📋 Pull Request Process

1. **Ensure your code works** and passes all tests
2. **Update documentation** if you've changed APIs or added features
3. **Add tests** for new functionality
4. **Commit your changes** with clear messages:
   ```bash
   git add .
   git commit -m "Add feature: brief description"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Reference any related issues
   - Screenshots if UI changes

## 🐛 Reporting Issues

When reporting issues, please include:

1. **Clear description** of the problem
2. **Steps to reproduce** the issue
3. **Expected vs actual behavior**
4. **Environment details**:
   - Operating System
   - Python version
   - Node.js version
   - Browser (for frontend issues)

## 🎯 Areas for Contribution

### High Priority
- **Career Recommendation Algorithm**: Implement logic to analyze quiz responses and suggest careers
- **User Dashboard**: Create personalized career paths and recommendations
- **Enhanced Quiz**: Add more questions and categories
- **Mobile Responsiveness**: Improve mobile experience

### Medium Priority
- **Admin Features**: Enhanced question management and analytics
- **User Profiles**: Allow users to update their information
- **Quiz History**: Show previous quiz attempts
- **Export Results**: Allow users to download their results

### Low Priority
- **Internationalization**: Support for multiple languages
- **Advanced Analytics**: Detailed insights and statistics
- **Social Features**: Share results with friends
- **Integration**: Connect with external career databases

## 📚 Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://reactjs.org/docs/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Follow the project's coding standards

## 📞 Getting Help

- Check existing issues and pull requests
- Join our discussions on GitHub
- Review the documentation in the repository

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Career Advisor! 🚀
