#!/bin/bash

echo "Starting Career Advisor Development Environment..."

echo ""
echo "Starting Django Backend..."
# Start Django backend in background
cd "$(dirname "$0")"
source .venv/bin/activate
python manage.py runserver &
DJANGO_PID=$!

echo ""
echo "Starting React Frontend..."
# Start React frontend in background
cd CareerPathFinder
npm run dev:frontend &
REACT_PID=$!

echo ""
echo "Both servers are starting..."
echo "Backend: http://127.0.0.1:8000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $DJANGO_PID 2>/dev/null
    kill $REACT_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Wait for user to stop
wait
