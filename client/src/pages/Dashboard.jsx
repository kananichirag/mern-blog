import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUser from "../components/DashUser";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <SideBar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "users" && <DashUser />}
    </div>
  );
}

export default Dashboard;
