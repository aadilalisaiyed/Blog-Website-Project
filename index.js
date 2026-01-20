import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
let posts = [];
app.get("/", (req, res) => {
  res.render("home.ejs", { posts: posts });
});
app.get("/create", (req, res) => {
  res.render("create.ejs", { posts: posts });
});
app.post("/create", (req, res) => {
  posts.push({ title: req.body.title, content: req.body.content });
  res.redirect("/");
});
app.get("/update/:id", (req, res) => {
  const id = req.params.id;
  res.render("update.ejs", { id, post: posts[id] });
});
app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  posts[id] = { title: req.body.title, content: req.body.content };
  res.redirect("/");
});
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  posts.splice(id, 1);
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
