const morgan=require("morgan");
const express=require("express");
const oracle=require("oracledb");

const router=require("express-promise-router")();

const cors=require('cors');     //for cross referencing
//const { query } = require("express");

oracle.outFormat = oracle.OBJECT;

oracle.autoCommit=true;
 
let connection;

async function db_query(query,params){
    
    try{
        connection = await oracle.getConnection({
            user:'c##asifur',
            password:'123',
            connectString : 'localhost/orcl'
            //"(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= ORCL)))"
        });
        let result=await connection.execute(query,params);
        // console.log(result.rows,"row");weniweubngwunewgoin
        return result.rows;
        

    }catch(error){
        console.log(error);
        
    }


};
function log(massage){
    console.log(massage)

}
/*const app=express();
app.use(cors());            //cross reference
app.options('*',cors());    //cross reference

app.use(express.json());
app.use(morgan("dev"));*/
module.exports.log=db_query;