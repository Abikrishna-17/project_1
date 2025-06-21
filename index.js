
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const mysql = require('mysql2');

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'test'
    });


app.get("/",(req,res)=>{
    res.render("index");
});

app.post("/",(req,res)=>{
    let val = req.body;
    let q = "insert into details_from values(?,?,?,?,?,?,?,?,?)";
    let data = [
        val.id,
        val.name,
        val.age,
        val.blood_group,
        val.class,
        val.cgpa,
        val.tenth_mark,
        val.twelth_mark,
        val.aim_package,

    ]
connection.query(q, data, (err, result) => {
        if (err) {
            console.log("Error inserting:", err);
            return res.send("Error occurred while submitting the form.");
        }
        console.log("Insert successful:", result);
        res.send("Form submitted successfully.");
    });

});

app.listen(port,()=>{
    console.log("running");
});

