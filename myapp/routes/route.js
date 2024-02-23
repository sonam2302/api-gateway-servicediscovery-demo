import express from "express";
const router = express.Router();

router.get("/products", (req, res) => {
  res.send("Get Products Endpoint");
});

router.get("/users", (req, res) => {
  res.send("Get Users Data");
});

router.post("/addproduct", (req, res) => {
  res.send("Product Posted");
});

export default router;
