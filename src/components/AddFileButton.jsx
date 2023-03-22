import React from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { storage } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthProvider/AuthProvider";
import { ref, uploadBytes } from "firebase/storage";

const AddFileButton = ({ currentFolder, setRefetch }) => {
  const { user } = useAuth();
  const handleAddFile = (e) => {
    e.preventDefault();

    const file = e?.target?.files[0];

    if (currentFolder === null || file == null) return;

    // const filePath =
    //   currentFolder?.path.length > 0
    //     ? `${currentFolder.path.map((f) => f.name).join("/")}/${
    //         currentFolder.name
    //       }/${file.name}`
    //     : currentFolder?.name;

    const filePath =
      currentFolder?.path.length > 0
        ? `${currentFolder?.path?.join("/")}/${currentFolder?.name}/${
            file?.name
          }`
        : file?.name;

    const storageRef = ref(storage, `/files/${user.uid}/${filePath}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  return (
    <>
      <label
        htmlFor="add-file"
        className="w-12 h-12 btn-xs btn bg-white text-green-400 border border-green-400"
      >
        <AiFillFileAdd fontSize={24} />
      </label>

      <input
        type="file"
        id="add-file"
        className="modal-toggle"
        onChange={handleAddFile}
      />
    </>
  );
};

export default AddFileButton;
