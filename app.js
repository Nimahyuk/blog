const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const port = 8000;

const app = express();
const homeStartText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const aboutText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const contactText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

let posts = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
    homeStartText: homeStartText,
    posts: posts,
  });
});

app.get("/post/:title", (req, res) => {
  posts.forEach((post) => {
    console.log(req.params.title);
    console.log(post.titulo1);
    if (_.lowerCase(req.params.title) === _.lowerCase(post.titulo1)) {
      console.log("Existe el título");
      res.render("post", {
        post: post,
      });
    } else {
      console.log("No Existe");
      res.redirect("/");
    }
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactText: contactText,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    aboutText: aboutText,
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    titulo1: _.upperFirst(req.body.titulo1),
    texto1: req.body.texto1,
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
