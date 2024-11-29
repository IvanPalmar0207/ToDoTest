//Express app
import app from "./app.js";
//Database
import sequelize from './db.js'
//User Model
import userModel from "./models/user.model.js";

async function MainRun(){
    try{
        await sequelize.sync({force : false})
        app.listen(3000,() => {
            console.log('Server is running on port 3000')
        })
    }catch(e){
        console.log('Server is not running')
    }
}

MainRun()