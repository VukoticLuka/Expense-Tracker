import {validationResult} from 'express-validator'

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