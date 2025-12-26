import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";
import passport from "passport";
import {Strategy} from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";


const app = express();
const port = 3000;
const saltRounds = 10;
env.config();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
        session({// Session values and properties set
                secret: process.env.SESSION_SECRET,
                resave:false,
                saveUninitialized:true,
        })
);

app.use(passport.initialize());
app.use(passport.session());

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

app.get("/register", (req,res)=>{
        res.render("Register.ejs",{pageTitle: "Book Notes | Favourite Books"});
})

app.get("/login",(req,res)=>{
        res.render("Login.ejs",{pageTitle:"Book Notes | Favourite Books"});
})



//handing register request
app.post("/registerUser",async(req,res)=>{
        console.log(req.body.firstname);
        console.log(req.body.lastname);
        console.log(req.body.inputEmail);
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.inputEmail;
        const password = req.body.inputPassword;
        try{
                const checkUser = await db.query("SELECT * FROM users WHERE email = $1",[email]);
                if(checkUser.rows.length>0){
                res.render("Register.ejs",{pageTitle:"Book Notes | Favourite Books", err:"User exist!!! Please try again with different User"});

                }
                else{
                        bcrypt.hash(password, saltRounds, async (err, hash)=>{
                                if(err){
                                        console.error("Error hashing password:", err);
                                }
                                else{
                                        const result= await db.query(
                                                "INSERT INTO users (first_name,last_name,email,password) VALUES ($1,$2,$3,$4) RETURNING *",
                                                [firstname,lastname,email,hash]
                                        );
                                        const user = result.rows[0];
                                        req.login(user,(err)=>{
                                                console.log("success");
                                                res.redirect("/review");
                                        });
                                }
                        });
                }
                
                }

                

        
        catch(err){
                console.log(err);
                res.render("Register.ejs",{pageTitle:"Book Notes | Favourite Books", err:"Error registering the user, try again"});
        }
});

//using passport package for handling authentication and session


app.listen(port,()=>{
  console.log(`The Server is running on port:${port}`);
})