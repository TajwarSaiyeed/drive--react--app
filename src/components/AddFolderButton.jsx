import React, { useState } from "react";

import { AiFillFolderAdd } from "react-icons/ai";
import { database } from "../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthProvider/AuthProvider";
import { ROOT_FOLDER } from "../hooks/useFolder";

const AddFolderButton = ({ currentFolder, setRefetch }) => {
  const [folderName, setFolderName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!folderName) return;

    if (currentFolder === null) return;

    const path = [...currentFolder?.path];

    // console.log("path", path);

    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    // TODO: Create a new folder in firebase
    try {
      const docRef = await addDoc(collection(database, "folders"), {
        name: folderName,
        userId: user.uid,
        createdAt: serverTimestamp(),
        parentId: currentFolder?.id,
        path: path || [],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setFolderName("");
      setRefetch((prev) => !prev);
      setShowModal(false);
    }
  };

  return (
    <>
      <label
        htmlFor="add-folder"
        onClick={() => setShowModal(true)}
        className="w-12 h-12 btn-xs btn bg-white text-green-400 border border-green-400"
      >
        <AiFillFolderAdd fontSize={24} />
      </label>

      <input type="checkbox" id="add-folder" className="modal-toggle" />
      {showModal && (
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="add-folder"
              onClick={() => {
                setFolderName("");
                setRefetch((prev) => !prev);
                setShowModal(false);
              }}
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
                  onClick={() => {
                    setFolderName("");
                    setRefetch((prev) => !prev);
                    setShowModal(false);
                  }}
                  className="btn bg-white text-red-400 border border-red-400"
                >
                  Cancel
                </label>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFolderButton;
