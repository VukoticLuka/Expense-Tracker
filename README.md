# Expense Tracker

This application helps you manage your finances, track your budget, 
and plan future expenses effectively.

## Technologies

### Backend
- **Express JS** -> JavaScript framework
- **Mongoose** -> ODM for MongoDB
- **MongoDB** -> NoSQL database
- **JWT** -> (JSON Web Token) for authentication

### Frontend
- **Angular 16** -> (most likely)

## Project structure

(current structure)

```markdown
Expense Tracker
├── backend
│   ├── package.json
│   ├── package-lock.json
│   ├── runBack.sh
│   └── src
│       ├── controllers
│       │   ├── authController.mjs
│       │   ├── logoutController.mjs
│       │   └── refreshTokenController.mjs
│       ├── dbConnect.mjs
│       ├── index.mjs
│       ├── routes
│       │   ├── auth.mjs
│       │   ├── expenses.mjs
│       │   └── users.mjs
│       ├── schemas
│       │   ├── enums.mjs
│       │   ├── expense.mjs
│       │   └── user.mjs
│       ├── services
│       │   ├── expenseService.mjs
│       │   └── userService.mjs
│       └── utils
│           ├── middlewares.mjs
│           ├── password-hashing.mjs
│           ├── pathResolver.mjs
│           └── validationSchemas.mjs
├── frontend
└── README.md
```

