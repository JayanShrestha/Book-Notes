import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


const booksData = [
        { title: "The Fresh Startup", author: "Jane Doe", price: 24.99 },
        { title: "Green Business Habits", author: "John Smith", price: 19.99 },
        { title: "Professional Minds", author: "Emily White", price: 29.99 },
        { title: "Yellow Brick Road to Success", author: "Michael Brown", price: 15.99 }
    ];

app.get("/", (req,res)=>{


res.render("index.ejs",{pageTitle: "Book Notes Demo | Favourite Books",
        books: booksData});
});



app.listen(port,()=>{
  console.log(`The Server is running on port:${port}`);
})