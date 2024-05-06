import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    // console.log("conversation" + conversation);

    res.status(200).json(conversation?.messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const { id: receiverId } = req.params;
    const senderId = req?.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      await conversation.messages.push(newMessage._id);
    }

    // await newMessage.save();
    // await conversation.save();

    //this will run in parallel in same time
    await Promise.all([conversation.save(), newMessage.save()]);

    //socket io functionality here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //io.to(<socket_id>).emit used to send event to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
