import React from "react";
import Navbar from "../components/Navbar";
import AddFolderButton from "../components/AddFolderButton";
import { useFolder } from "../hooks/useFolder";
import Folder from "../components/Folder";

const Dashboard = () => {
  const {
    state: { folder, childFolders },
    setRefetch,
  } = useFolder("5czHXR4SoAPnZaOKtkE2");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-600">
        <div className="text-white flex justify-between items-center w-full px-5 py-2">
          <div className="text-md breadcrumbs">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">Documents</a>
              </li>
              <li>Add Document</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <AddFolderButton currentFolder={folder} setRefetch={setRefetch} />
            <AddFolderButton currentFolder={folder} setRefetch={setRefetch} />
          </div>
        </div>
        {childFolders?.length > 0 && (
          <div className="flex flex-wrap">
            {childFolders?.map((childFolder, i) => (
              <div key={i} className="w-1/5 p-2">
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
