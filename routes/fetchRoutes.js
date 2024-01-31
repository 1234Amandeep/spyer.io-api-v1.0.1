const express = require("express");
const fetchController = require("../controllers/fetchController");
const dbInterController = require("../controllers/dbInterController");
// const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Routes

router.get("/api/fetch/:playerName", fetchController.fetch_get);

// add to whishlist route

router.post(
  "/api/addToWishlist",
  // authMiddleware.requireAuth,
  dbInterController.addToWishlist_post
);

router.post("/api/removeFromWishlist", dbInterController.removeFromWishlist_post);

module.exports = router;
