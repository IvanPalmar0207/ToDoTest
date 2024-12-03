//DataBase
import sequelize from "../db.js";
//DataTypes
import { DataTypes } from "sequelize";
//Priority Relationship
import priorityModel from "./priority.model.js";
//Status Task Relationship
import statusTask from "./statusTask.model.js";

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

//Status Foreign Key
statusTask.hasMany(taskModel,{
    foreignKey : 'idStatus',
    sourceKey : 'id',
    allowNull : false
})

taskModel.belongsTo(statusTask,{
    foreignKey : 'idStatus',
})

export default taskModel