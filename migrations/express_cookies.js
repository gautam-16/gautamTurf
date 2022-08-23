//code showing the concept of express js cookies

let express = require('express');
let cookieParser = require('cookie-parser');
//setup express app
let app = express()

app.use(cookieParser());


//basic route for homepage
//this will print welcome to express app on homepage
app.get('/', (req, res)=>{
res.send('welcome to express app');
});

//JSON object to be added to cookie
let users = [{
name : "Gautam",
Age : "25",
Role:"Developer",
Comapny:"CubexO"
},{name:'AA',age:32,role:'intern'}]

//Route for adding cookie
//this line will add and save the userdata from users variable to the browser
app.get('/setuser', (req, res)=>{
res.cookie("userData", users);
res.send('user data added to cookie');
});

//Iterate users data from cookie
//this method will print all the cookies present in thw web browser
app.get('/getuser', (req, res)=>{
//shows all the cookies
res.send(req.cookies);
});

//Route for destroying cookie
//this method will delete all the cookies present on your browser
app.get('/logout', (req, res)=>{
//it will clear the userData cookie
res.clearCookie('userData');
res.send('user logout successfully');
});


//server listens to port 3000
app.listen(3000, (err)=>{
if(err)
throw err;
console.log('listening on port http://localhost:3000');
});
