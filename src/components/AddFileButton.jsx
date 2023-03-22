import React from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { storage, database } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthProvider/AuthProvider";
import {
  getDownloadURL,
  ref,
  //   uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const AddFileButton = ({ currentFolder, setRefetch }) => {
  const { user } = useAuth();
  const handleAddFile = async (e) => {
    e.preventDefault();

    const file = e?.target?.files[0];

    if (currentFolder === null || file == null) return;

    console.log(currentFolder?.path);

    const filePath =
      currentFolder?.path.length > 0
        ? `${currentFolder.path.map((f) => f.name).join("/")}/${
            currentFolder.name
          }/${file.name}`
        : file?.name;

    const storageRef = ref(storage, `/files/${user.uid}/${filePath}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const docRef = await addDoc(collection(database, "files"), {
            url: downloadURL,
            name: file.name,
            createdAt: serverTimestamp(),
            folderId: currentFolder.id,
            userId: user.uid,
          });

          console.log("Document written with ID: ", docRef.id);
        });
      }
    );
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
