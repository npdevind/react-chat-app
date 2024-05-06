import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useZustandStore from "../zustandStore/useZustandStore";
import notSound from "../assets/sound/notification.mp3";

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useZustandStore();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });
    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
};

export default useListenMessage;
