import {validationResult} from 'express-validator'
import expenseModel from '../schemas/expense.mjs';

export const preventUsernameInBody = (req, res, next) => {
    if(req.body.username){
        return res.status(400).json({error: "Username cannot be in update body"});
    }

    next();
}

export const processValidationSchema = async (req,res, next) => {
    const result = validationResult(req);

    if(!result.isEmpty()){
        return res.status(400).json({
            errors: result.array()
        })
    }

    next();
}

export const checkFilterObject = async (req,res,next) => {
    const {body} = req;

    if(body && Object.keys(body).length > 0){
        req.isFiltered = true;
    }else{
        req.isFiltered = false;
    }

    next();
}
