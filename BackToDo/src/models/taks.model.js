//DataBase
import sequelize from "../db.js";
//DataTypes
import { DataTypes } from "sequelize";
//Priority Relationship
import priorityModel from "./priority.model.js";

//TaskModel
const taskModel = sequelize.define('Task',{
    nameTask : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    descriptionTask : {
        type : DataTypes.TEXT,
        allowNull : false,
    },
    dateSuccess : {
        type : DataTypes.DATE(),
        defaultValue : Date.now,
        allowNull : false,
    },
    taskStatus : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    }    
})

//Priority Foreign Key
priorityModel.hasMany(taskModel,{
    foreignKey : 'idPriority',
    sourceKey : 'id',
    allowNull : false
})

taskModel.belongsTo(priorityModel,{
    foreignKey : 'idPriority',
})

export default taskModel