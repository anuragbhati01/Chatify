import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

export const getContacts = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filterUsers = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password",
    );

    res.status(200).json(filterUsers);
  } catch (err) {
    console.log("Error in getContacts: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const myId = req.user._id;

    const { id: userToChatId } = req.params;

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(message);
  } catch (err) {
    console.log("Error in geMessageByUserId: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in send message: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const messages = await Message.find({
      $or: [{ senderId: loggedInUser }, { receiverId: loggedInUser }],
    });

    const chatPartnerIds = messages.map((msg) =>
      msg.senderId.toString() === loggedInUser.toString()
        ? msg.receiverId.toString()
        : msg.senderId.toString(),
    );
    const uniqueChatPartnerIds = [...new Set(chatPartnerIds)];

    const chatPartners = await User.find({
      _id: { $in: uniqueChatPartnerIds },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (err) {
    console.log("Error in getChats: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};
