import express from "express";
import "express-async-errors";
import mustacheExpress from "mustache-express";
import path from "path";
import multer from 'multer';

import { getBlogs, getBlog, createBlog } from './database.js'

const port = process.env.PORT || 3000;
const app = express();

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "uploads/images/");
  },
  filename: function(req, file, cb){
    const ext = path.extname(file.originalname)
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext)
  }
})

var upload = multer({ storage: storage });

// serve static files
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));

//for post method 
app.use(express.urlencoded({ extended: true }));

// Mustache 템플릿 설정
app.engine("mustache", mustacheExpress("views/partials")); // Set the mustache template engine for rendering views with the extension ".mustache"
app.set("view engine", "mustache"); //The "view engine" configuration option is read and used by Express internally when you call methods like res.render() to render views.
app.set("views", path.resolve() + "/views"); //views: Specifies the directory where your view files are located.

// 라우팅
app.get("/", (req, res) => {

});

app.get("/blogs", async (req, res) => {
  const blogs = await getBlogs()
  res.render("blogs", { blogs: blogs })
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/form", upload.single('image'), async (req, res) => {
  const imagePath = `./uploads/images/${req.file.filename}`;

  const newPost = {
    title: req.body.title,
    subject: req.body.subject,
    text: req.body.text,
  };

  await createBlog(imagePath, newPost.title, newPost.subject, newPost.text)
  res.send("success")
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
