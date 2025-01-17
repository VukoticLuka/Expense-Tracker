import { response, Router } from "express";
import { checkSchema } from "express-validator";
import { processValidationSchema, checkFilterObject } from "../utils/middlewares.mjs";
import { autheticateToken } from "../controllers/refreshTokenController.mjs";
import { fetchExpenses,
        fetchExpensesByFilters,
        createExpense,
        updateExpenses,
        deleteExpensesByFilter
 } from "../services/expenseService.mjs";

export const router = Router();

router.get('/', 
    autheticateToken,
    checkFilterObject,
    async (request, response) => {
        try{
            const {
                body,
                user: {
                    userId
                }
            } = request;
            const expenses = request.isFiltered ? 
                            await fetchExpensesByFilters(userId, body) :
                            await fetchExpenses(userId);

            return response.status(200).json(expenses);
        }catch(error){
            response.status(500).json({"message": "Internal server error!"});
        }
    }
);





