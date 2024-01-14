import  express, { urlencoded }  from "express";
import { connectDb } from "./src/config/mongodb.js";
import { createUserRouter } from "./src/routes/users.js";
import { userModel } from "./src/models/userModel.js";

const app = express();

app.use(express.json())
app.use(urlencoded({extended:true}))

connectDb()

app.use('/user', createUserRouter({ userModel }))



const PORT = 8080


app.listen(PORT,  () => {
    console.log(`server is running in localhost/${PORT}`);
})

