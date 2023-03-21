import React from "react";
import Navbar from "../components/Navbar";
import AddFolderButton from "../components/AddFolderButton";
import { useFolder } from "../hooks/useFolder";
import Folder from "../components/Folder";

const Dashboard = () => {
  const { folder, childFolders } = useFolder("Me8yDkFW2l0Hn7mC1WPr");

  console.log(childFolders);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-600">
        <AddFolderButton currentFolder={folder} />
        {childFolders?.length > 0 && (
          <div className="flex flex-wrap">
            {childFolders?.map((childFolder) => (
              <div key={childFolder.id} className="w-1/3 p-2">
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
