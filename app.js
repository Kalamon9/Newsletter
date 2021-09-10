//API key
// 12e2b4600b16597e1189217932706e78-us1

//audiance list id 856f98e053


//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//Using bod-parser
app.use(bodyParser.urlencoded({extended:true}));
//The public folder which holds the CSS
app.use(express.static("Public"));


app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});


//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});


//Setting up MailChimp
mailchimp.setConfig({

 apiKey: "12e2b4600b16597e1189217932706e78-us1",

 server: "us1"
});


//As soon as the sign in button is pressed execute this
app.post("/", function (req,res) {

const firstName = req.body.firstName;
const secondName = req.body.secondName;
const email = req.body.email;

const listId = "856f98e053";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: secondName,
 email: email
};
//Uploading the data to the server
 async function run() {
 const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}

 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});


app.post('/failure', function(req,res){
  res.redirect('/');
});
