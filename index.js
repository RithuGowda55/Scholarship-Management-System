import express from "express";
import bodyParser from "body-parser";
import mysql from 'mysql2/promise';

const app = express();
app.set("view engine", "ejs");
const port = 3000;

const db = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Chinmayi@2003',
  database: 'users'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }

  console.log('Connected to the database as ID ' + db.threadId);
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  // console.log(req.body.username);
  // console.log(req.body.password);
  const email= req.body["username"];
  const password= req.body["password"];

  try{
  const checkResult = await db.query("SELECT * FROM users WHERE email = ?", [email,])
  
  // if(checkResult.length > 0){
  //   res.send("Email already exists, Try logging in");
  // }

  // else if(!email){
  //   return res.status(400).send("Email is required.");
  // }

  {
    const result = await db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)", [email, password]
    );
    console.log(result);
  res.render("secrets.ejs");
  }
}
  catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }

});


app.post("/login", async (req, res) => {
  
  const email= req.body["username"];
  const password= req.body["password"];
  try{
    const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", [email] );
    // const result = await db.query("SELECT * FROM users WHERE email = ?", [email] );
    if(user){
      console.log(user.password);
       console.log(user.password);
        const storedPassword = user.password;  
      
      // console.log(result[0].password);
      // console.log(JSON.stringify(result[0]));
      // const user = JSON.stringify(result[0]);

        console.log(storedPassword);
        
        if(password === storedPassword){
        res.render("secrets.ejs");
      }
    
      else{
        res.send("Incorrect Password");
      }
    }
    else{
      res.send("User not found");
    }
  }
  
  catch{
    console.log(err);
  }

}  );



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
