import { Router } from "express";

import {createUser,
        fetchUserByUsername,
        deleteUserByUsername,
        updateUserByUsername}
        from "../services/userService.mjs"

const router = Router();

router.get("/:username", async (req, res) => {
    try{
        const username = req.params.username;

        const user = await fetchUserByUsername(username);

        if(!user) return res.status(404).send({msg: `User ${username} not found`});

        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({msg: "Internal server error in fetchUser function"});
    }   
});

router.post("/", async (req,res) => {
    try{
        const {body} = req;
        const newUser = await createUser(body);

        res.status(201).json(newUser);
    }catch(error){
        if(error.message.startsWith("Validation error: ")){
            return res.status(400).json({"error": error.message});
        }
        return res.status(500).json({"error": "Internal server error"});
    }
});

router.put("/:username", async (req, res) => {
    try{
        const {
            body,
            params:{
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


export default router;