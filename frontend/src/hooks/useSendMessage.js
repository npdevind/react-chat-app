import { useState } from "react";
import useZustandStore from "../zustandStore/useZustandStore";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } = useZustandStore();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      if (data.error) throw Error(data.error);
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
