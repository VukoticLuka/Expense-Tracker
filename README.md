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
│   └── src
│       ├── controllers
│       │   ├── authController.mjs
│       │   ├── logoutController.mjs
│       │   └── refreshTokenController.mjs
│       ├── dbConnect.mjs
│       ├── index.mjs
│       ├── routes
│       │   ├── auth.mjs
│       │   └── users.mjs
│       ├── schemas
│       │   └── user.mjs
│       ├── services
│       │   └── userService.mjs
│       └── utils
│           ├── middlewares.mjs
│           ├── password-hashing.mjs
│           ├── pathResolver.mjs
│           └── validationSchemas.mjs
├── frontend
└── README.md
```

