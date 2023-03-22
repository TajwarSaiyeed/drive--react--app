import React from "react";
import Navbar from "../components/Navbar";
import AddFolderButton from "../components/AddFolderButton";
import { ROOT_FOLDER, useFolder } from "../hooks/useFolder";
import Folder from "../components/Folder";
import { Link, useParams, useLocation } from "react-router-dom";
import AddFileButton from "../components/AddFileButton";

const Dashboard = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const {
    state: { folder, childFolders },
    setRefetch,
  } = useFolder(folderId, state?.folder);

  let path = folder === ROOT_FOLDER ? [ROOT_FOLDER] : [ROOT_FOLDER];
  if (folder) path = [...path, ...folder?.path];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-600">
        <div className="text-white flex justify-between items-center w-full px-5 py-2">
          <div className="text-md breadcrumbs">
            <ul>
              {path.map((folder, index) => (
                <li key={folder?.id}>
                  <Link
                    to={folder?.id ? `/folder/${folder?.id}` : `/dashboard`}
                    state={{
                      folder: { ...folder, path: path.slice(1, index) },
                    }}
                    className="text-gray-100"
                  >
                    {folder?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2">
            <AddFileButton currentFolder={folder} setRefetch={setRefetch} />
            <AddFolderButton currentFolder={folder} setRefetch={setRefetch} />
          </div>
        </div>
        {childFolders?.length > 0 && (
          <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {childFolders?.map((childFolder) => (
              <div key={childFolder.id} className="p-2">
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
