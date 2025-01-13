export const createUserValidationShema = {
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
            options: [["EUR", "RSD", "USD"]],
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