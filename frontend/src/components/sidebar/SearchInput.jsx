import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import useZustandStore from "../../zustandStore/useZustandStore";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useZustandStore();
  const { conversations } = useGetConversations();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    // if(search.length < 3){
    //   toast.error("")
    // }
    const searchList = conversations.find((val) =>
      val.fullName.toLowerCase().includes(search.toLocaleLowerCase())
    );
    if (searchList) {
      setSelectedConversation(searchList);
      setSearch("");
    } else toast.error("No user found");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            className="input input-bordered rounded-full w-full max-w-xs bg-black-100"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-circle bg-black-100">
            <CiSearch className="w-6 h-6 outline-none" />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchInput;
