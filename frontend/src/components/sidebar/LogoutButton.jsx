import { SlLogout } from "react-icons/sl";
import useLogOut from "../../hooks/useLogOut";
import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
  const { loading, logout } = useLogOut();
  const { authUser } = useAuthContext();
  return (
    <div className="mt-auto">
      {!loading ? (
        <div className="flex gap-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} />
            </div>
          </div>
          <p className="text-lg uppercase">{authUser?.username}</p>
          <div className="justify-content-end">
            <SlLogout
              className="w-6 h-6 text-white cursor-pointer"
              onClick={logout}
            />
          </div>
        </div>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
