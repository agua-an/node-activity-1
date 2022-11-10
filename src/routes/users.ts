import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

// Initialize the router
const router = Router();

// Initialize the prisma client
const prisma = new PrismaClient();

// Handles GET on /users/
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();

  res.send({
    data: users,
    count: users.length,
  });
});

// Handles GET on /users/:id
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    // If user is not found
    if (user == null) {
      res.status(404).send({ error: "User not found" });
    } else {
      res.send({ data: user });
    }
  } 
  catch {
    // If parsing the id is not a number
    res.status(404).send({ error: "User not found" });
  }
});

// Handles POST on /users/:id
router.post("/", async (req, res) => {
  try {
    const _body = req.body;
    const user = await prisma.user.create({ data: _body });
    res.send({ data: "User Created!" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code == "P2002") {
        res.status(400).send({ error: "Email is already registered" });
      }
    } else {
      res.status(500).send({ error: "Internal server error" });
    }
  }
});

// Handles PUT on /users/:id
router.put("/:id", async (req, res) => {
  try {
    const _body = req.body;
    const user = await prisma.user.create({ data: _body });
    res.send({ data: "User Created!" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {

      // If Email is already registered
      if (e.code == "P2002") {
        res.status(400).send({ error: "Email is already registered" });
      }
    } else {
      // Everything fails
      res.status(500).send({ error: "Internal server error" });
    }
  }
});

//Export the router
export default router;
