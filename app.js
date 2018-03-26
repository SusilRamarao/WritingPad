var express = require("express");//require express package
var app = express();
var mongoose = require("mongoose");//require mongodb package
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var router = express.Router();
//app.use(express.cookieParser());//to set and release cookie

app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'views')));
var port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

//MongodDB variables
mongoose.promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/nodedemo")

var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  content: String
});

var User = mongoose.model("User", nameSchema);
//var Users = mongoose.model('User', nameSchema);

//App node variable
app.set('views', path.join(__dirname, 'views'));

app.get("/write", (req, res) => {
  console.log("in write");
  res.sendFile(__dirname + '/public/html/write.html');
});
app.get("/", (req, res) => {

  console.log("in main");
  res.sendFile(__dirname + '/public/html/menu.html');
});

app.get("/view", (req, res) => {
  console.log("in view Post");
  var temp = {"firstName":"Susil Ramarao"}
  console.log(temp);
  User.find(temp).exec((err, docs) => {
    if(err) res.json(err);
    else res.render('view', {'users':docs});

  });
});

app.post("/addContent", (req, res) => {
  console.log("Inside post /addname");


  var myData = new User(req.body);
  console.log(myData);
  myData.save()
  .then(item => {
    res.send("item saved to Database");
  })
  .catch(err => {
    res.send("item not saved to Database");
  });

});

app.listen(port, () => {
  console.log("Server listening on port "+port);
})
