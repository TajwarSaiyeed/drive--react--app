import React, { useState } from "react";

import { AiFillFolderAdd } from "react-icons/ai";

const AddFolderButton = () => {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!folderName) return;
    console.log(folderName);

    // TODO: Create a new folder in firebase

    setFolderName("");
  };

  return (
    <>
      <label
        htmlFor="add-folder"
        className="w-12 h-12 btn-xs btn bg-white text-green-400 border border-green-400"
      >
        <AiFillFolderAdd fontSize={20} />
      </label>

      <input type="checkbox" id="add-folder" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-folder"
            onClick={() => setFolderName("")}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-2xl font-bold mb-4">Create a new folder</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="folder-name"
                className="block text-gray-500 text-sm font-bold mb-2"
              >
                Folder Name
              </label>
              <input
                type="text"
                name="folder-name"
                id="folder-name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Folder Name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <button className="btn bg-white text-green-400 border border-green-400">
                Create Folder
              </button>

              <label
                htmlFor="add-folder"
                onClick={() => setFolderName("")}
                className="btn bg-white text-red-400 border border-red-400"
              >
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFolderButton;
