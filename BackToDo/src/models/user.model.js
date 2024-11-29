//DataBase
import sequelize from '../db.js'
//Model DataType
import {DataTypes} from 'sequelize'
//Foreign Key with TaskModel
import taskModel from './taks.model.js'

//User model
const userModel = sequelize.define('User',{
    fullName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    cellPhone : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false
    },
    emailUser : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false
    },
    passwordUser : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

//Task Foreign Key
userModel.hasMany(taskModel,{
    foreignKey : 'idUser',
    sourceKey : 'id',
    allowNull : false
})

taskModel.belongsTo(userModel,{
    foreignKey : 'idUser',
})

export default userModel