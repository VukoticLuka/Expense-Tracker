import { CurrencyEnum, 
        ExpenseStatusEnum,
        CategoryEnum } from "../schemas/enums.mjs"

export const createUserValidationSchema = {
    username: {
        in: ['body'],
        isLength: {
            options: {
                min: 4,
                max: 32
            },
            errorMessage:
				"Username must be at least 4 characters with a max of 32 characters",
        },
        notEmpty: {
			errorMessage: "Username cannot be empty",
        },
        isString: {
			errorMessage: "Username must be a string!",
		},
    },
    firstName: {
        in: ['body'],
        isLength: {
            options: {
                min:4,
                max: 32
            },
            errorMessage: "firstName must be between 4 and 32 characters"
        },
        notEmpty: {
			errorMessage: "FirstName cannot be empty",
        },
        isString: {
			errorMessage: "FirstName must be a string!",
		},
    },
    lastName: {
        in: ['body'],
        isLength: {
            options: {
                min:4,
                max: 32
            },
            errorMessage: "LastName must be between 4 and 32 characters"
        },
        notEmpty: {
			errorMessage: "LastName cannot be empty",
        },
        isString: {
			errorMessage: "LastName must be a string!",
		},
    },
    email: {
        in: ['body'],
        isEmail: {
            errorMessage: "Email must be valid email"
        },
        notEmpty: {
            errorMessage: "Email cannot be empty"
        }
    },
    password: {
        in: ['body'],
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters long',
        },
        notEmpty: {
            errorMessage: 'Password cannot be empty'
        }
    },
    currency: {
        in: ['body'],
        optional: true,
        isIn: {
            options: [Object.values(CurrencyEnum)],
            errorMessage: "Currency if provided must be EUR, RSD or USD"
        }
    },
    balance: {
        in: ['body'],
        optional: true,
        isFloat: {
            options:{
                min: 0
            },
            errorMessage: "Balance if provided must be greater or equal than 0"
        }
    }
}

export const createExpenseValidationSchema = {
    product: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Price cannot be empty!"
        },
        isString: {
            errorMessage: "Product name must be valid string!"
        }
    },
    'price.amount': {
        in: ['body'],
        notEmpty: {
            errorMessage: "Amount cannot be empty!",
        },
        isFloat: {
            options: { min: 0 },
            errorMessage: "Amount must be a positive number!",
        },
    },
    'price.currency': {
        in: ['body'],
        notEmpty: {
            errorMessage: "Currency cannot be empty!"
        },
        isIn: {
            options: [Object.values(CurrencyEnum)],
            errorMessage: `Currency must be: ${Object.values(CurrencyEnum)}`
        }
    },
    category: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Category cannot be empty!"
        },
        isIn: {
            options: [Object.values(CategoryEnum)],
            errorMessage: `Category must be one of these categores: ${Object.values(CategoryEnum)}`
        }
    },
    date: {
        in: ['body'],
        notEmpty: {
            errorMessage: "Date must bre provided!"
        },
        isDate: {
            errorMessage: "Date must be a valid date!",
        },
    },
    status: {
        in: ['body'],
        optional: true,
        isIn: {
            options: [Object.values(ExpenseStatusEnum)],
            errorMessage: `If provided status must be: ${Object.values(ExpenseStatusEnum)}`
        }
    },
    description: {
        in: ['body'],
        optional: true,
        isLength: {
            options: {
                max: 500,
            },
            errorMessage: "If provided description must be maximum length of 500 characters"
        }
    }
}