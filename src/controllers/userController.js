import { validateUser,validatePartialUser } from "../schemas/userSchema.js"

export class UserController {
    constructor ({ userModel }) {
        this.userModel = userModel
    }

    getUser = async (req,res) => {
        const {id} = req.params
        try {
            const userFind = await this.userModel.findById(id) 
            if (!userFind) {
                return res.status(400).send({message : "User don´t exist"})
            }
            res.status(200).send(userFind)
        } catch (error) {
            res.status(400).json({ message: "Error finding user"})
        }
    } 

    deleteUser = async (req,res) => {
        const {id} = req.params
        try {
            const userDeleted = await this.userModel.findByIdAndDelete(id) 
            if (!userDeleted) {
                return res.status(400).send({message : "User don´t exist"})
            }
            res.status(200).send({message : "User deleted successfully"})
        } catch (error) {
            res.status(400).json({ message: 'Error deleting user'})
        }
    }

    updateUser = async (req,res) => {
        const {id} = req.params
        const newData = req.body

        try {
            const result = await validatePartialUser(newData)

            if (!result.success) {
                return res.status(400).json({error: JSON.parse(result.error.message)})
            }

            const newUser = await this.userModel.findOneAndUpdate(
                { _id: id },
                newData,
                { new: true } );

            res.status(200).send(newUser)
        } catch (error) {
            res.status(400).json({ message: "Error editing user"})
        }
    } 

    createUser = async (req , res) => {
        const result = validateUser(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        try {
            const newUser = await this.userModel.create(result.data)
            res.status(201).json(newUser)
        } catch (error) {
            res.status(400).json({ message: 'Error crating user'})
        }
    } 
} 