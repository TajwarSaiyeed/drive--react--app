import React, { useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { storage, database } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthProvider/AuthProvider";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

const AddFileButton = ({ currentFolder, setRefetch }) => {
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const { user } = useAuth();
  const handleAddFile = async (e) => {
    e.preventDefault();
    setUploadingProgress(0);

    const file = e?.target?.files[0];

    if (currentFolder === null || file == null) return;

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

        setUploadingProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const q = query(
            collection(database, "files"),
            where("folderId", "==", currentFolder?.id),
            where("userId", "==", user.uid),
            orderBy("createdAt")
          );

          const querySnapshot = await getDocs(q);
          const existingFiles = querySnapshot.docs.map((doc) => doc.data());

          if (existingFiles.find((f) => f.name === file?.name)) {
            alert("File with this name already exists in this folder");
            setUploadingProgress(0);
            return;
          }

          await addDoc(collection(database, "files"), {
            url: downloadURL,
            name: file?.name,
            createdAt: serverTimestamp(),
            folderId: currentFolder?.id,
            userId: user?.uid,
          });

          setRefetch((prev) => !prev);
          setUploadingProgress(0);
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

      {uploadingProgress > 0 && (
        <div
          className="radial-progress absolute bottom-4 right-4 text-white text-xs"
          style={{ "--value": uploadingProgress }}
        >
          {uploadingProgress}%
        </div>
      )}
    </>
  );
};

export default AddFileButton;
