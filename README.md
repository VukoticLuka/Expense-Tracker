# Expense Tracker

This application helps you manage your finances, track your budget, 
and plan future expenses effectively.

## Technologies

### Backend
- **Express JS** -> JavaScript framework
- **Mongoose** -> ODM for MongoDB
- **MongoDB** -> NoSQL database
- **JWT** -> (JSON Web Token) for authentication
- **Express-validator** -> Data validation
- **Docker** -> Used for containerizing application

### Frontend
- **Angular 16** -> (most likely)

## :memo: Installation

### Prerequisites
- Node.js 16+
- MongoDB 6.0+
  
1. **Clone the Repository**:
   Clone the repository to your local machine:
   ```bash
   git clone <repo_url>
   cd <project_directory>

2. **Run the app**
   Everything you need to do is to run runBack.sh.
   This bash script will install all neccessary dependencies that are in package.json.
   Just write in your terminal:
    ```bash
    ./runBack.sh

## Project structure

(current structure)

```markdown
Expense Tracker
├── backend
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── runBack.sh
│   └── src
│       ├── controllers
│       │   ├── authController.mjs
│       │   ├── logoutController.mjs
│       │   └── refreshTokenController.mjs
│       ├── dbConnect.mjs
│       ├── index.mjs
│       ├── routes
│       │   ├── auth.mjs
│       │   ├── expenses.mjs
│       │   └── users.mjs
│       ├── schemas
│       │   ├── enums.mjs
│       │   ├── expense.mjs
│       │   └── user.mjs
│       ├── services
│       │   ├── expenseService.mjs
│       │   └── userService.mjs
│       └── utils
│           ├── middlewares.mjs
│           ├── password-hashing.mjs
│           ├── pathResolver.mjs
│           └── validationSchemas.mjs
├── docker-compose.yaml
├── frontend
└── README.md
```

