import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading && <span className="loading loading-spinner"></span>}
      {conversations.map((item, index) => {
        return (
          <Conversation
            key={item._id}
            conversation={item}
            emoji={getRandomEmoji()}
            lastIndex={index === conversations.length - 1}
          />
        );
      })}
    </div>
  );
};
export default Conversations;
