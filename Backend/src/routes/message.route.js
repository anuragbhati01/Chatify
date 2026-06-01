import express from "express";
import {
  getContacts,
  getMessageByUserId,
  sendMessage,
  getChatPartners,
} from "../controllers/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection, protectedRoute);

router.get("/contacts", getContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessageByUserId);
router.post("/send/:id", sendMessage);

export default router;
