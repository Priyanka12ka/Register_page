let express=require("express");
let path=require("path");
let bodyParser=require("body-parser");
let mysql=require("mysql2");
let conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"mca"
});
conn.connect((err)=>{
    if(err)
    {
        console.log("Mysql connection is failed")
    }
    else{
        console.log("mysql connection is successful")
    }
})
let app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded(
    {
        extended:true
    }
));
let p=path.join(__dirname+"/public");
app.get("/",(req,res)=>{
     res.sendFile(p+"/MyHtml.html");
});
app.post("/save",(req,res)=>{
	 let{name,email,contact}=req.body;
    let qualification = req.body.qualification;
    let dob = req.body.date;
    let university = req.body.University;
	console.log(name);
    console.log(email);
    console.log(contact);
    console.log(qualification);
    console.log(dob);
    console.log(university);

conn.query("insert into employee values('0', ? , ? , ? , ? , ? , ?)",[name,email,contact,qualification,dob,university],(err,result)=>{
  if(err)
  {
     console.log("Couldn't insert data...");
     res.send(err);
     res.end();
  }
  else{
    console.log("data inserted in Employee table");
    res.send("<h1>Data inserted</h1> ")
  }
})
})
app.listen(3000,(req,res)=>{
   console.log("server started");
});
