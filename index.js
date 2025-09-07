import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts=[{
    id: 1,
    title: "When Losing Becomes a Lesson",
    content:
      "Life is not all about winning and getting appreciations only. Sometimes no matter how much efforts we make, things don't get align to our own will. You put all of your endless efforts for an exam, burn the midnight oil, but the result does not show the same. You give your best in a game but still lose. You try to make the things work but the things fall apart.And interestingly it's all okay.Because eventually you will realise you were not made for that achievement and if you got that thing at that particular time, you may not be at the place at which you are right now. This is how we all are destined to be at some place and not the other. That's what we all see as destiny or fate.The truth is loosing doesn't mean you are not capable, it simply means you are being redirected. Many of the times, we need failure to guide us towards something bigger, something which we can't yet see.",
    author: "Dil Bhardwaj",
    date: "2025-09-05T14:58:51.609Z",
  },
  {
    id: 2,
    title: "Failure is yet Another chance",
    content:
      "Instead of thinking Why me?, try asking yourself What is this failure making me learn This small change in mindset changes everything. Losing then become a less of demoralising and more of a lesson.The most dangerous part of losing is not the loss itself, but the feeling of giving up. Han you decide to stay down, fully exhausted and demotivated, you close the door on future opportunities. But when you stand up, and try again, you keep your story alive.Every success story is all about giving it another try.So the next time things don't work out, remind yourself , It's okay, that's a part of the journey itself and who knows, your next try might turn into your greatest win.",
    author: "Mia Williams",
    date: "2025-09-05T15:01:57.852Z",
  },
  {id:3,
    title:"My own Posts Application",
    content:"I built a simple blog application to practice my backend and frontend development skills. This project allows users to create, edit, and delete blog posts while keeping the interface clean and minimal.",
    author:"Dil Bhardwaj",
    date:"2025-09-05T16:01:54.324Z",
  }
  ];

let lastId=1;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
    console.log(posts);
    res.json(posts);
  });
  
  app.get("/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  app.post("/posts", (req, res) => {
    const newId = lastId += 1;
    const post = {
      id: newId,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: new Date(),
    };
    lastId = newId;
    posts.push(post);
    res.status(201).json(post);
  });

  app.patch("/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
  
    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.body.author) post.author = req.body.author;
  
    res.json(post);
  });

  
  app.delete("/posts/:id", (req, res) => {
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Post not found" });
  
    posts.splice(index, 1);
    res.json({ message: "Post deleted" });
  });

  app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });
