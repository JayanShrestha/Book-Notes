import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import env from "dotenv";


const app = express();
const port = 3000;
const saltRounds = 10;
env.config();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


const db = new pg.Client({
        user:process.env.PG_USER,
        host:process.env.PG_HOST,
        database:process.env.PG_DATABASE,
        password:process.env.PG_PASSWORD,
        port:process.env.PG_PORT,
});

db.connect();


app.get("/",async (req,res)=>{
        try{
                const books = await db.query("SELECT * from books");
                const booksData = books.rows;
                res.render("index.ejs",{pageTitle: "Book Notes | Favourite Books",
                books: booksData});
              
        }
        catch(err){
                console.log("The data from books table wasn't retrieved",err);
        }



});



app.listen(port,()=>{
  console.log(`The Server is running on port:${port}`);
})