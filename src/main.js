import express from "express";
import "express-async-errors";
import mustacheExpress from "mustache-express";
import path from "node:path";
import fs from "fs";
import { fileURLToPath } from "node:url";

const port = process.env.PORT || 3000;
const app = express();

// serve static files
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Mustache 템플릿 설정
app.engine("mustache", mustacheExpress("views/partials")); // Set the mustache template engine for rendering views with the extension ".mustache"
app.set("view engine", "mustache"); //The "view engine" configuration option is read and used by Express internally when you call methods like res.render() to render views.
app.set("views", path.resolve() + "/views"); //views: Specifies the directory where your view files are located.

// 라우팅
app.get("/", (req, res) => {
  const data = fs.readFileSync("db/articles.json", "utf8");
  const articles = JSON.parse(data);
  res.render("home", { blogs: articles });
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/form", (req, res) => {
  // Read the existing articles data from the JSON file
  const data = fs.readFileSync("db/articles.json", "utf8");
  const articles = JSON.parse(data);

  // Create a new article object from the req.body
  const newArticle = {
    name: req.body.name,
    subject: req.body.subject,
    message: req.body.message,
  };

  // Add the new article to the existing articles array
  articles.push(newArticle);

  // // Write the updated articles data back to the JSON file
  fs.writeFileSync("db/articles.json", JSON.stringify(articles, null, 2));

  // Send a response indicating successful upload
  res.send("Article submitted successfully!");
});

// 에러 응답
app.use((err, req, res, next) => {
  console.error(err);
  res.render("error", { error: err });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
