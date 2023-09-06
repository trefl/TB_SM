import { Sequelize } from "sequelize";
import db from "../config/Database.js"
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Workers = db.define('worker',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4, 
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 100]
        }
    },
    surname:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 100]
        }
    },  
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true,
        }
    },

}, {
    freezeTableName: true
});
Users.hasMany(Workers);
Workers.belongsTo(Users, {foreignKey: 'userId'})

export default Workers;