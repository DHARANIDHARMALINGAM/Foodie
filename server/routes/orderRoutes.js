import express from "express";
import Order from "../models/Order.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
// GET user's orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});


// Place an order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items } = req.body;
    const newOrder = new Order({
      user: req.userId,
      items,
    });
    await newOrder.save();
    res.json({ success: true, msg: "Order placed!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});
// Update order status (for admin or simulation)
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ success: true, order: updated });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Update failed" });
  }
});


export default router;
