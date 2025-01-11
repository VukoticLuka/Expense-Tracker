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
        const user = await userModel.findOne({"username": username});
        return user;
    }catch(error){
        console.error(`Error occured in fetchUserByUsername func: ${error.message}`);
        throw error;
    }
}

export const updateUserByUsername = async function(username, updateBody){
    //TODO
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