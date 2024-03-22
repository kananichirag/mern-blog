import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";

function SideBar() {
  const location = useLocation();
  const dispatch = useDispatch();
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
      <SidebarItemGroup>
        <Link to="/dashboard?tab=profile">
          <SidebarItem
            active={tab == "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
            as="div"
          >
            Profile
          </SidebarItem>
        </Link>

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
