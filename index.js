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

const booksData = [
        { title: "The Fresh Startup", author: "Jane Doe", price: 24.99 },
        { title: "Green Business Habits", author: "John Smith", price: 19.99 },
        { title: "Professional Minds", author: "Emily White", price: 29.99 },
        { title: "Yellow Brick Road to Success", author: "Michael Brown", price: 15.99 }
    ];

app.get("/",async (req,res)=>{
        try{
                const books = await db.query("SELECT * from books");
                console.log(books.rows);
        }
        catch(err){
                console.log("The data from books table wasn't retrieved",err);
        }


res.render("index.ejs",{pageTitle: "Book Notes Demo | Favourite Books",
        books: booksData});
});



app.listen(port,()=>{
  console.log(`The Server is running on port:${port}`);
})