//Sequelize Mysql
import { Sequelize } from "sequelize";

//DataBase Connection
const sequelize = new Sequelize(
    'todotest',
    'root',
    '',
    {
        host : 'localhost',
        dialect : 'mysql'
    }
)

export default sequelize