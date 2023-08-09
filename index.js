const path=require('path')
const express = require('express')
const bodyParser = require('body-parser');// is a middleware in exprs.js used to parse the body of http request like data submitted through the forms of html and any parsing required data
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));// .use() is used to mount the middleware on specific routes or gloabal routes


const users = [];
const questions=[{
    Title:"Max Element",
    Description:"Given an array , return the maximum of the array?",
    Testcases:[{
        Input:"[1,2,3,4,5]",
        Output:"5"
    }]
 }];

 app.set('view engine', 'ejs');// Set EJS as the view engine

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'login.html');
    res.sendFile(filePath);
});


//const staticpage=path.join(__dirname,"../public");
app.use(express.static('public')); //this helps to maintain external html page on server


app.post('/signup', (req, res) => {
    const { email, password } = req.body;//Destructures the email and password properties from the parsed request body.

    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        // User already exists, return status 400
        return res.status(400).send('User already exists');
    }

    // User does not exist, add to the array and return status 200
    users.push({ email, password });
    res.redirect('/login');
    res.status(200).send('User created successfully!');
    
});



app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const user = users.find(user => user.email === email);

    if (!user) {
        // User does not exist, return status 404
        return res.status(404).send('User not found');
        res.sendFile(filePath);
    }

    if (user.password === password) {
        // Password matches, return status 200
        res.redirect('/questions');
    } else {
        // Password does not match, return status 400
        res.redirect('/login');
        return res.status(400).send('Retry with correct password');
        res.redirect('/login');
    }
});



app.get('/questions', (req, res) => {
    res.render('questions', { questions }); // Render the questions.html file using EJS
});
  
app.get('/questions', (req,res) => {
    //res.send('you will get questions here soon')
    console.log('Accessed /questions route');
    const qpath=path.join(__dirname,'public','question.html');
    res.sendFile(qpath);
    })
  
app.get('/submissions', (req, res) => {
    const isCorrect = Math.random() < 0.5;
    const feedbackMessage = isCorrect ? "Solution correct" : "Incorrect solution";

    res.json({ message: feedbackMessage });
  })
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})