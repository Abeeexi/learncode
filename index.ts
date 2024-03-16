import express from 'express';
import { PrismaClient } from '@prisma/client';

function main() {
  const prisma = new PrismaClient();
  const app = express();
  app.use(express.json());

  app.get('/', async (req, res) => {
    // prisma.user.findUnique({
    //   where: {
    //     id: 1,
    //   },
    // });
    const users = prisma.user.findMany();
    res.send(users);
  });
  app.get("/article", async (req, res) => {
    const data = req.query;
    const article = await prisma.article.findMany();
    res.send(article);
  });

  app.get("/comment", async (req, res) => {
    const data = req.query;
    const comment = await prisma.comment.findMany();
    res.send(comment);
  });

  app.post("/article", async (req, res) => {
    const data = req.body;
    const article = await prisma.article.create({
      data: { title: data.title, content: data.content },
    });
    res.send(article);
  });

  app.post("/comment", async (req, res) => {
    const data = req.body;
    const comment = await prisma.comment.create({
      data: { data: data.data },
      Article: 
    });
    res.send(comment);
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`Listen at localhost:${port}`);
  });
}
main();
