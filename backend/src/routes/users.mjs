import { Router } from "express";
import {checkSchema} from 'express-validator'
import mongoose from "mongoose";
import { hashPassword, checkPassword } from "../utils/password-hashing.mjs";
import { createUserValidationShema } from "../utils/validationSchemas.mjs";
import { processValidationSchema,
        preventUsernameInBody}
         from '../utils/middlewares.mjs'
import {createUser,
        fetchUserByUsername,
        deleteUserByUsername,
        updateUserByUsername,
        addBalance,
        deleteUser }
        from "../services/userService.mjs"
import { deleteAllConnectedExpenses } from "../services/expenseService.mjs";
import { autheticateToken } from "../controllers/refreshTokenController.mjs";

export const router = Router();

router.get("/", async (req, res) => {
    try{
        const {username} = req.query;

        const user = await fetchUserByUsername(username);

        if(!user) return res.status(404).send({msg: `User ${username} not found`});

        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({msg: "Internal server error in fetchUser function"});
    }   
});

router.post("/", 
    checkSchema(createUserValidationShema),
    processValidationSchema,
    async (req,res) => {
    try{
        const {body} = req;
        body.password = await hashPassword(body.password);
        const newUser = await createUser(body);

        res.status(201).json(newUser);
    }catch(error){
        if(error.message.startsWith("Validation error: ") || error.message.startsWith("Username or email")){
            return res.status(400).json({"error": error.message});
        }
        else if(error.message.startsWith("Error hashing")){
            return res.status(500).json({"error": "Internal server error while hashing password"});
        }
        return res.status(500).json({"error": "Internal server error"});
    }
});

router.put("/", 
    preventUsernameInBody,
    async (req, res) => {
    try{
        const {
            body,
            query: {
                username
            }
        } = req;
        const updatedUser = await updateUserByUsername(username, body);

        return res.status(200).json(updatedUser);


    }catch(error){
        if(error.message.startsWith("Status 404")){
            return res.status(404).send({"error": error.message});
        }
        else{
            return res.status(500).send({"error": "Internal server error"});
        }
    }
});

router.delete("/",
    autheticateToken,
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try{
            const {
                user: {
                    userId
                }
            } = req;
            
            const deleteResult = await deleteAllConnectedExpenses(userId,session);

            const result = await deleteUser(userId, session);

            await session.commitTransaction();
            res.sendStatus(200);
        }catch(error){
            await session.abortTransaction();
            res.status(500).json({message: "Internal server error!"});
        }finally{
            session.endSession();
        }
    }
)

router.delete("/:username", async (req, res) => {
    try{
        const username = req.params.username;

        const {deletedCount, acknowledged} = await deleteUserByUsername(username);

        if(deletedCount === 0) return res.status(404).send({msg: `Unsuccessful deletion of User ${username}`});
            
        return res.status(200).json({msg: `Successful deletion of User ${username}`});

    }catch(error){
        res.status(500).json({"error": error.message});
    }
});

router.patch("/balance",
    autheticateToken, 
    async (req, res) => {
        try{
            const {
                body: {
                    balance
                },
                user: {
                    userId
                }
            } = req;
            
            const updatedUser = await addBalance(userId, balance);
    
            return res.status(200).json(updatedUser);
        }catch(error){
            return res.status(500).json({message: "Internal server error!"});
        }
})