import { useAuthContext } from "../../context/AuthContext";
import { getHoursAndMinutes } from "../../utils";
import useZustandStore from "../../zustandStore/useZustandStore";

const Message = ({ msg }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useZustandStore();
  const formMe = msg.senderId === authUser._id;

  const chatClassName = formMe ? "chat chat-end" : "chat chat-start";
  const profilePic = formMe
    ? authUser.profilePic
    : selectedConversation.profilePic;

  const shakeClass = msg.shouldShake ? "shake" : "";
  const bgColor = formMe
    ? `chat-bubble  bg-blue-400 text-black`
    : `chat-bubble  bg-green-400 text-black ${shakeClass}`;

  return (
    <>
      <div className={chatClassName}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
          </div>
        </div>
        {/* <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">12:45</time>
        </div> */}
        <div className={bgColor}>{msg.message}</div>
        <div className="chat-footer opacity-50">
          {getHoursAndMinutes(msg.createdAt)}
        </div>
      </div>
    </>
  );
};

export default Message;
