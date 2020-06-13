//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const mongodb_URI = 'mongodb+srv://divyanshrai:divyanshrai@cluster0-5goci.mongodb.net/WIKI_API?retryWrites=true&w=majority'

mongoose.connect(mongodb_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const articlesSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articlesSchema)

//TODO

app.get("/articles", function(req, res) {
    Article.find(function(err, foundArticles){
        if (!err) {
            res.send(foundArticles)
        } else {
            res.send(err)
        }
        
    })
})

app.post("/articles", function(req, res){
console.log(req.body.title)
console.log(req.body.content)

const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
})
newArticle.save(function(err){
    if (!err) {
        res.send("Success")
    } else {
        res.send(err)
    }
})
})

app.delete("/articles", function(req, res) {
    Article.deleteMany(function(err){
        if (!err) {
            res.send("Success")
        } else {
            res.send(err)
        }
    })
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});