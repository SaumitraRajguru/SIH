# Career Advisor API Documentation

## Base URL
```
http://127.0.0.1:8000/api/
```

## Authentication
The API uses JWT (JSON Web Token) authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### 1. User Management

#### Register User
- **POST** `/users/register/`
- **Description**: Create a new user account
- **Body**:
```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "age": 25,
    "bio": "I am interested in technology and programming"
}
```

#### Login
- **POST** `/users/login/`
- **Description**: Get JWT tokens for authentication
- **Body**:
```json
{
    "username": "john_doe",
    "password": "securepassword123"
}
```
- **Response**:
```json
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

#### Refresh Token
- **POST** `/users/refresh/`
- **Description**: Get new access token using refresh token
- **Body**:
```json
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### 2. Quiz Questions

#### Get All Questions
- **GET** `/quiz/questions/`
- **Description**: Get all quiz questions
- **Response**:
```json
[
    {
        "id": 1,
        "text": "What do you think about gardening? Gardening involves nurturing plants...",
        "category": "interest",
        "created_at": "2025-09-11T00:00:00Z"
    }
]
```

#### Get Questions by Category
- **GET** `/quiz/questions/{category}/`
- **Description**: Get questions filtered by category
- **Categories**: `interest`, `degree`, `career`
- **Example**: `/quiz/questions/interest/`

#### Get Quiz Statistics
- **GET** `/quiz/stats/`
- **Description**: Get quiz statistics and available choice options
- **Response**:
```json
{
    "total_questions": 28,
    "questions_by_category": {
        "interest": 10,
        "degree": 8,
        "career": 10
    },
    "choice_options": [
        "strongly_dislike",
        "dislike", 
        "neutral",
        "like",
        "strongly_like"
    ]
}
```

### 3. Quiz Answers

#### Submit Single Answer
- **POST** `/quiz/answers/`
- **Description**: Submit a single quiz answer (requires authentication)
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
    "question": 1,
    "choice": "like"
}
```

#### Submit Multiple Answers
- **POST** `/quiz/answers/submit/`
- **Description**: Submit multiple quiz answers at once (requires authentication)
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
    "answers": [
        {
            "question": 1,
            "choice": "like"
        },
        {
            "question": 2,
            "choice": "strongly_like"
        },
        {
            "question": 3,
            "choice": "neutral"
        }
    ]
}
```

#### Get User's Answers
- **GET** `/quiz/answers/my/`
- **Description**: Get all answers submitted by the authenticated user
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
[
    {
        "id": 1,
        "question": 1,
        "question_text": "What do you think about gardening?",
        "question_category": "interest",
        "user": 1,
        "choice": "like",
        "created_at": "2025-09-11T00:00:00Z"
    }
]
```

## Choice Options
The quiz uses a 5-point scale for all questions:
- `strongly_dislike` - Strongly Dislike
- `dislike` - Dislike  
- `neutral` - Neutral
- `like` - Like
- `strongly_like` - Strongly Like

## Question Categories
1. **Interest** (10 questions) - Questions about personal interests and activities
2. **Degree** (8 questions) - Questions about educational degrees and programs
3. **Career** (10 questions) - Questions about different career paths and professions

## Sample Questions

### Interest Category
- "What do you think about gardening?"
- "What do you think about driving a car?"
- "What do you think about advising others?"
- "What do you think about cooking?"
- "What do you think about teaching?"

### Degree Category  
- "What do you think about B.Com (Bachelor of Commerce)?"
- "What do you think about B.Tech (Bachelor of Technology)?"
- "What do you think about LLB (Bachelor of Laws)?"
- "What do you think about MBBS (Bachelor of Medicine and Bachelor of Surgery)?"

### Career Category
- "What do you think about working in the IT sector?"
- "What do you think about becoming a lawyer?"
- "What do you think about becoming a doctor?"
- "What do you think about becoming a teacher?"

## Frontend Integration Example

### React.js Example
```javascript
// Login and get token
const login = async (username, password) => {
    const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    localStorage.setItem('access_token', data.access);
    return data;
};

// Get questions by category
const getQuestions = async (category) => {
    const response = await fetch(`http://127.0.0.1:8000/api/quiz/questions/${category}/`);
    return await response.json();
};

// Submit quiz answers
const submitAnswers = async (answers) => {
    const token = localStorage.getItem('access_token');
    const response = await fetch('http://127.0.0.1:8000/api/quiz/answers/submit/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ answers })
    });
    return await response.json();
};
```

## Error Handling
The API returns standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error responses include details:
```json
{
    "error": "Error message",
    "details": "Additional error details"
}
```

## CORS Configuration
The API is configured to allow all origins for development. For production, update the `CORS_ALLOWED_ORIGINS` setting in Django settings.

## Admin Panel
Access the Django admin panel at: `http://127.0.0.1:8000/admin/`
- Username: `admin`
- Use your admin password to manage questions and view user answers
