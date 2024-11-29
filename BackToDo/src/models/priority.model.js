//DataBase
import sequelize from "../db.js";
//DataTypes
import { DataTypes } from "sequelize";

//PriorityModel
const priorityModel = sequelize.define('Priority',{
    namePriority : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    }
})

export default priorityModel