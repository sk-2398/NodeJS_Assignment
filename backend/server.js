const express = require("express");
const mysql=require("mysql");
const cors=require("cors");
const moment = require('moment')
const app=express()
app.use(cors())
app.use(express.json())

// DB connection
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node"

})


// C. Add orders
app.post('/addorders',(req,res)=>{
    const sql="INSERT INTO orders (`orderId`,`title`,`description`) Values (?)";
    const values=[
        req.body.orderId,
        req.body.title,
        req.body.description,
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){return res.json(err)}
        return res.json(data)
    })
})

//C. GET API to fetch orders from the last 7 days
app.get('/order', (req, res) => {
    const dateSevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
  
    const sql = `SELECT * FROM orders WHERE date >= '${dateSevenDaysAgo}'`;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        return res.status(500).json({ error: 'Failed to fetch data' });
      }
  
      res.json(results);
    });
  });



// D Get all fruits in color sort order
app.post('/addfruits',(req,res)=>{
    const sql="INSERT INTO fruits (`id`,`name`,`color`) Values (?)";
    const values=[
        req.body.id,
        req.body.name,
        req.body.color,
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){return res.json(err)}
        return res.json(data)
    })
})

//C. GET API to fetch orders from the last 7 days
app.get('/getfruits', (req, res) => {
  
    const sql = `SELECT * FROM fruits ORDER BY color`;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        return res.status(500).json({ error: 'Failed to fetch data' });
      }
  
      res.json(results);
    });
  });



app.listen(5000,()=>{
    console.log("App running at port 5000")
})