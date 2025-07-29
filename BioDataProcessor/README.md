# BFHL API - BAJAJ FINSERV Assignment

## 📋 Assignment Details
- **Student**: Abhinav Rana
- **Student ID**: 2211981008
- **Assignment**: Backend for Frontend - Hackathon Live (BFHL) API
- **Company**: BAJAJ FINSERV

## 🎯 API Overview
This is a REST API that processes arrays of mixed data types and returns categorized results in a specific format. The API categorizes input data into:
1. Even numbers
2. Odd numbers  
3. Alphabetic characters (converted to uppercase)
4. Special characters
5. Sum of all numbers
6. Concatenated alphabets in reverse order with alternating caps

## 🚀 API Endpoint
- **Method**: `POST`
- **Endpoint**: `/api/bfhl`
- **Content-Type**: `application/json`

### Request Format
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Note**: The API automatically handles special comma characters (，、‚‛„‟) by normalizing them to standard JSON commas. This means requests with Chinese commas or other special comma types will be processed correctly.

### Response Format
```json
{
  "is_success": true,
  "user_id": "abhinav_rana_17091999",
  "email": "abhinav.rana@gmail.com", 
  "roll_number": "2211981008",
  "even_numbers": ["334", "4"],
  "odd_numbers": ["1"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## 🛠️ Technology Stack
- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: React, Vite, TailwindCSS
- **Validation**: Zod schemas
- **Deployment**: Vercel (configured)

## 📦 Installation & Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production  
npm run build

# Start production server
npm run start
```

## 🌐 Deployment
This project is configured for deployment on Vercel:

1. **GitHub Repository**: https://github.com/abhinavrana17/BajajAssignment
2. **Vercel Configuration**: `vercel.json` included
3. **Build Command**: `npm run build`
4. **No Database Required**: Completely stateless API

## ✨ Features
- ✅ Complete BFHL API implementation
- ✅ Professional web interface for testing
- ✅ Real-time API response visualization
- ✅ Special comma normalization (handles ，、‚‛„‟ and converts to standard commas)
- ✅ Error handling and validation
- ✅ TypeScript for type safety
- ✅ Responsive design
- ✅ No database dependencies (stateless)
- ✅ Ready for Vercel deployment

## 📝 API Processing Logic
1. **Numbers**: Categorized into odd/even arrays (returned as strings)
2. **Alphabets**: Converted to uppercase and stored
3. **Special Characters**: Non-alphanumeric characters extracted
4. **Sum Calculation**: All numeric values summed and returned as string
5. **String Concatenation**: Alphabets reversed with alternating capitalization

## 🔧 Project Structure
```
├── client/                 # React frontend
├── server/                 # Express.js backend  
├── shared/                 # Shared TypeScript schemas
├── vercel.json            # Vercel deployment config
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 👨‍💻 Author
**Abhinav Rana**  
Student ID: 2211981008  
Email: abhinav.rana@gmail.com  
GitHub: https://github.com/abhinavrana17/BajajAssignment

---
*This project is submitted as part of the BAJAJ FINSERV technical assignment.*