import expenseModel from '../schemas/expense.mjs';

export const createExpense = async(newExpense) => {
    try{
        const newExpense = await expenseModel.create(newExpense);

        return newExpense.toJSON();
    }catch(error){
        console.error('Error occured in creteExpense utility function: ', error.message);
        throw error;
    }
}

export const fetchExpenses = async(userId) => {
    const expenses = await expenseModel.find({user_id: userId});
    //we can use .lean() function instead of .toJSON directly on query 
    //but this looks more intuitive to me
    return expenses.map((expense) => expense.toJSON());
}

export const fetchExpensesByFilters = async(userId, filterObj) => {
    try{
        const queryObj = {user_id: userId, ...filterObj};

        const expenses = await expenseModel.find(queryObj);

        return expenses.map((expense) => expense.toJSON());
    }catch(error){
        console.error('Error occured while performing fetchExpensesByFilters function: ', error.message);
        throw error;
    }
}

export const updateExpenses = async(updateObj, filterObj) => {
    try{
        const result = await expenseModel.updateMany(filterObj, { $set: updateObj });
        //if everything is all right matchCount needs to be equal to updateCount in result obj
        return result;
    }catch(error){
        console.error('Error occured while updating expenses: ', error.message);
        throw error;
    }
}


export const deleteExpensesByFilter = async(userId, filterObj) => {
    try{
        const queryObj = {user_id: userId, ...filterObj};

        const result = await expenseModel.deleteMany(queryObj);

        return result;
    }catch(error){
        console.error('Error occured while deleting expenses by filter: ', error.message);
        throw error;
    }
}
