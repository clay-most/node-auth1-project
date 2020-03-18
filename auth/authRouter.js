const express = require("express");
const router = express.Router();
const db = require("./authModel");
const bcrypt = require("bcryptjs");

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "possbile endponts: /register , /login" });
});

router.post("/register", async (req, res, next) => {
  try {
    const data = { user_name: req.body.user_name, password: req.body.password };
    const newUser = await db.createUser(data);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { user_name, password } = req.body;
    if (!user_name || !password) {
      return res.status(400).json({ message: "credentials" });
    }
    const user = await db.findByName(user_name);
    console.log(user_name);
    if (!user) {
      return res.status(401).json({ message: "invalid user" });
    }
    const pass = await bcrypt.compareSync(password, user.password);
    if (!pass) {
      return res.status(401).json({ message: "password" });
    }
    req.session.user = user;
    res.status(200).json({ message: `welcome ${user.user_name}` });
    console.log(req.session);
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    } else {
      res.json({
        message: "Successfully logged out"
      });
    }
  });
});

module.exports = router;
