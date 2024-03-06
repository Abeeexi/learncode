import express from "express";
import { PrismaClient } from "@prisma/client";

function main() {
  const prisma = new PrismaClient();
  const app = express();

  app.get("/", async (req, res) => {
    // prisma.user.findUnique({
    //   where: {
    //     id: 1,
    //   },
    // });
    const users = prisma.user.findMany();
    res.send(users);
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`Listen at localhost:${port}`);
  });
}
main();
