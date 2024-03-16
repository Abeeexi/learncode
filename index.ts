import express from 'express';
import { PrismaClient } from '@prisma/client';
import z from 'zod';

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

  // TODO: JOIN operations, comments inside articles
  app.get('/articles', async (req, res) => {
    const articles = await prisma.article.findMany();
    res.send(articles);
  });

  app.get('/comments', async (req, res) => {
    // validate data
    // data {articleId: xxx}
    const comments = await prisma.comment.findMany();

    res.send(comments);
  });

  // title
  // content
  // create article
  const createArticleSchema = z.object({
    title: z.string().min(1),
    content: z.string(),
  });
  app.post('/article', async (req, res) => {
    // validation
    let createArticleInput;
    try {
      createArticleInput = createArticleSchema.parse(req.body);
    } catch (err) {
      res.sendStatus(400);
      return;
    }

    const { content, title } = createArticleInput;
    const article = await prisma.article.create({
      data: {
        title,
        content,
      },
    });

    res.send(article);
  });

  app.put('/article', async (req, res) => {
    // validation
    // data { id: xxx, title: xxx, content: xxx }
    //
    // check if article exist
    // const exist = await prisma.article.findFirst({ where: { id:  } });

    // exist = {id: 'asdfsd'} || undefined
    if (exist === undefined) {
      // if (!exist)
      res.sendStatus(400);
      return;
    }

    //
    // if exist -> update new data
  });

  app.post('/comment', async (req, res) => {
    // validation
    // data { articleId: xxx, data: xxx }
    //
    // check article exist
    //
    // create comment
    //
    res.send('hello');
  });

  app.put('/comment', async (req, res) => {
    // validation
    // data { id: xxx, data: xxx }
    //
    // check comment exist
    //
    // change comment data
    //
    res.send('hello');
  });

  app.delete('/comment', (req, res) => {
    // validation
    //
    // data { id: xxx }
    //
    // delete comment
    //
    res.send();
  });

  // TODO: user authentication
  // TODO: separate schema validate
  // TODO: handle async/await fail
  // TODO: transaction
  app.delete('/article', (req, res) => {
    // validation
    // data { id: xxx }
    //
    // check if article exist
    //
    // delete all comments of requested article's id
    //
    // delete article
    //
    res.send();
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`Listen at localhost:${port}`);
  });
}

main();
