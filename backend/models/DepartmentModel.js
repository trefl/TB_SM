import { Sequelize } from "sequelize";
import db from "../config/Database.js"
import Users from "./UserModel.js";
import Workers from "./WorkerModel.js";

const { DataTypes } = Sequelize;

const Departments = db.define('department',{
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
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true,
        }
    },
    workerId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true,
        }
    },

}, {
    freezeTableName: true
});
Departments.hasMany(Workers);
Workers.belongsTo(Departments, {foreignKey: 'departmentId'})

Departments.hasMany(Users);
Users.belongsTo(Departments, {foreignKey: 'departmentId'})


export default Workers;