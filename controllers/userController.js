import User from '../models/user.js'
import Recording from '../models/Recording.js'

//this is just for testing
const getAllUsers = async(req,res)=>{
    try {
        const allUsers = await User.find({})
        res.status(200).json({
            allUsers
        })
    } catch (error) {
        console.error('Error in retreiving all users: this error comes from your userController')
        res.status(500).json({
            message: 'Error retriving all user information',
            error: error.message
        })
    }
}

//these are for production use
const getUserByUsername = async(req, res)=>{
    try {
        const username = req.params.username
        const userProfile = await User.findOne({username: username})
        return res.status(200).json({
            userProfile
        })
    } catch (error) {
        console.error('Error retreiving user: this error coms from your userController in the getUserByUsername')
        res.status(500).json({
            message: 'Error retriving user information',
            error: error.message
        })
    }
}

const createUser = async(req, res)=>{
    try {
        const userPayload = req.body
        const newUser = await User.create(userPayload)
        res.status(200).json({
            newUser
        })
    } catch (error) {
        console.error('Error creating user: this error comes from your userController file from the createUser function')
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        })
    }
}

const editUser = async(req, res)=>{
    try {
        const userToEdit = req.params.id
        const userPayload = req.body
        const editUser = await User.findOneAndUpdate(userToEdit,userPayload, {new: true})
        res.status(200).json({
            editUser
        })
    } catch (error) {
        console.error('Error editing user: this error comes from your userController file from the editUser function')
        res.status(500).json({
            message: 'Error editing user',
            error: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userID = req.params.id;  // Get the ID from the URL parameters

        // Attempt to find and delete the user by ID
        const deleteUser = await User.findByIdAndDelete(userID);

        if (deleteUser) {
            // If user is found and deleted, attempt to delete associated recordings
            const deleteUserData = await Recording.deleteMany({ user: deleteUser._id });
            return res.status(200).json({
                message: 'User and related data deleted successfully',
                deleteUser,
                deletedRecordings: deleteUserData
            });
        } else {
            // If no user is found, return a 404 response
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
}


export {
    getAllUsers,
    getUserByUsername,
    createUser,
    editUser,
    deleteUser
}