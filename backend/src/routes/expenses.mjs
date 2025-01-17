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
                    _id
                }
            } = request;
            const expenses = request.isFiltered ? 
                            await fetchExpensesByFilters(_id, body) :
                            await fetchExpenses(_id);

            return response.status(200).json(expenses);
        }catch(error){
            response.status(500).json({"message": "Internal server error!"});
        }
    }
);

router.post('/',
    autheticateToken,
    async (request, response) => {
        try{
            const {
                body,
                user: {
                    _id
                }
            } = request;
            const newExpense = {user_id: _id, ...body};

            const result = await createExpense(newExpense);

            return response.status(201).json(result);

        }catch(error){
            if(error.code === 11000){
                return response.status(409).json({message: "Expense already exists"});
            }

            return response.status(500).json({"message": "Internal server error!"});
        }
    }
);

router.patch('/',
    autheticateToken,
    async(request, response) => {
        try{
            const {
                body,
                query,
                user: {
                    _id
                }
            } = request;
    
            const filterObj = {userId: _id, ...query};
            const result = await updateExpenses(body, filterObj);
            
            if(result.matchedCount === 0){
                return response.status(404).json({message: "No expense found!"});
            }
    
            if(result.matchedCount !== result.modifiedCount){
                return response.status(500).json({message: "Internal server error!"});
            }
    
            return response.sendStatus(200);
        }catch(error){
            return response.sendStatus(500);
        }
    }
)

