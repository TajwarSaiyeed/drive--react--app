import React from "react";
import Navbar from "../components/Navbar";
import AddFolderButton from "../components/AddFolderButton";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-600">
        <AddFolderButton />
      </div>
    </>
  );
};

export default Dashboard;
