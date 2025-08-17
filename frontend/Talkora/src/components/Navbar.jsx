import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import {
  BellIcon,
  LogOutIcon,
  VideoIcon,
  HomeIcon,
  UsersIcon,
} from "lucide-react";
import useLogout from "../hooks/useLogout";
import ThemeSelector from "./ThemeSelector";
import { useEffect, useState } from "react";
import { getFriendRequests } from "../lib/api";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const { logoutMutation } = useLogout();
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLgScreen, setIsLgScreen] = useState(window.innerWidth >= 1024);

  const isHomePage = location.pathname === "/";
  const isFriendsPage = location.pathname === "/friends";
  const isNotificationPage = location.pathname === "/notifications";
  const isChatPage = location.pathname === "/chat";

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => setIsLgScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch friend requests
  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await getFriendRequests();
        setFriendRequests(data || []);
      } catch (err) {
        console.error("Error fetching friend requests:", err);
      }
    }
    fetchRequests();
  }, []);

  // Decide if logo should be visible
  const showLogo =
    isChatPage ||
    (!isLgScreen && (isHomePage || isFriendsPage || isNotificationPage));

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center w-full">
          {/* Logo */}
          {showLogo && (
            <Link to="/" className="flex items-center gap-2.5">
              <VideoIcon className="size-7 text-primary" />
              <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Talkora
              </span>
            </Link>
          )}

          {/* Right section */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Profile Avatar */}
            {/* Profile Avatar */}
            <Link to="/profile">
              <div className="avatar">
                <div className="w-7 sm:w-9 rounded-full m-2">
                  <img
                    src={authUser?.profilePic}
                    alt="User Avatar"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </Link>

            {/* Desktop buttons */}
            <div className="hidden lg:flex items-center gap-3 sm:gap-4">
              <ThemeSelector />
              <Link to={"/notifications"} className="relative">
                <button className="btn btn-ghost btn-circle">
                  <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                </button>
                {friendRequests.length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </Link>
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => logoutMutation()}
              >
                <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </div>

            {/* Mobile layout */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeSelector />
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle relative"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  {friendRequests.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to={"/"}>
                      <HomeIcon className="h-5 w-5" /> Home
                    </Link>
                  </li>
                  <li>
                    <Link to={"/friends"}>
                      <UsersIcon className="h-5 w-5" /> Friends
                    </Link>
                  </li>
                  <li>
                    <Link to={"/notifications"}>
                      <BellIcon className="h-5 w-5" /> Notifications
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => logoutMutation()}>
                      <LogOutIcon className="h-5 w-5" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
