import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiArrowSmRight, HiUser, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";

function SideBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/v1/user/signout", { method: "POST" });
      const data = await res.json();
      if (data.success == true) {
        dispatch(signoutSuccess());
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItemGroup className="flex flex-col gap-1">
        <Link to="/dashboard?tab=profile">
          <SidebarItem
            active={tab == "profile"}
            icon={HiUser}
            label={currentUser.user.isAdmin ? "Admin" : "User"}
            labelColor="dark"
            as="div"
          >
            Profile
          </SidebarItem>
        </Link>

        {currentUser.user.isAdmin && (
          <Link to="/dashboard?tab=posts">
            <SidebarItem active={tab == "posts"} icon={HiDocumentText} as="div">
              Posts
            </SidebarItem>
          </Link>
        )}

        {currentUser.user.isAdmin && (
          <Link to="/dashboard?tab=users">
            <SidebarItem active={tab == "users"} icon={HiOutlineUserGroup} as="div">
              Users
            </SidebarItem>
          </Link>
        )}

        <SidebarItem
          icon={HiArrowSmRight}
          className="cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </SidebarItem>
      </SidebarItemGroup>
    </Sidebar>
  );
}

export default SideBar;
