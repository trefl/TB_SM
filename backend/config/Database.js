import { Sequelize } from 'sequelize';


const db = new Sequelize("sm", "root", "", {
    host: "localhost",
    dialect: "mysql",
    decimalNumbers: true

});

// db.authenticate().then(()=>{
//     console.log("Connection has ben established to the database");

// }).catch((error)=>{
//     console.error(error);
// })


export default db;