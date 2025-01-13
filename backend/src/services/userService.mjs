import userModel from "../schemas/user.mjs";

export const createUser = async function(newUser){
    try{
        const user = await userModel.create(newUser);
        return user.toJSON();
    }catch(error){
        console.error(`Error occured in createUser func: ${error.message}`);
        if(error.name === "ValidationError"){
            console.error("Validation failed: " + error.errors);
            throw new Error("Validation error: " + Object.values(error.errors).map((err) => err.message).join(", "));
        }
        else{
            console.error("Error occurred in createUser:", error.message);
            throw error;
        }
    }
}

export const fetchUserByUsername = async function(username){
    try{
        const user = await userModel.findOne({"username": username},{password: 0, createdAt: 0});
        return user;
    }catch(error){
        console.error(`Error occured in fetchUserByUsername func: ${error.message}`);
        throw error;
    }
}

export const updateUserByUsername = async function(username, updateBody){
    try{
        const user = await fetchUserByUsername(username);

        if(!user){
            throw new Error(`Status 404. User ${username} not found`);
        }

        for(const key in updateBody){
            if(updateBody.hasOwnProperty(key) && key in user){
                user[key] = updateBody[key];
            }
        }

        await user.save({validateBeforeSave: true});

        return user.toJSON();
    }catch(error){
        console.error(`Error in updateUserByUsername: ${error.message}`);
        throw error;
    }
}

export const deleteUserByUsername = async function(username){
    try{
        const result = await userModel.deleteOne({"username": username});

        return result;
    }catch(error){
        console.error(`Error occured in deleteUserByUsername func: ${error.message}`);
        throw new Error("Internal server error in deleteUserByUsername function");
    }
}