//Database
import sequelize from "../db.js";
//DataTypes
import { DataTypes } from "sequelize";

//Status Task Model
const statusTask = sequelize.define('statusTask',{
    nameStatus : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

export default statusTask