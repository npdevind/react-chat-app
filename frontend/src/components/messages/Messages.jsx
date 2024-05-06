import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessage();
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && "loading..."}
      {!loading && messages.length === 0 && <span>Send message</span>}

      {!loading &&
        messages.length > 0 &&
        messages.map((msg) => {
          return (
            <div key={msg._id} ref={ref}>
              <Message msg={msg} />
            </div>
          );
        })}
    </div>
  );
};

export default Messages;
