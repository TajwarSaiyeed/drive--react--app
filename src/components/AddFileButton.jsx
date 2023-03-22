import React, { useState, ReactDOM } from "react";
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
import { v4 as uuid } from "uuid";

const AddFileButton = ({ currentFolder, setRefetch }) => {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { user } = useAuth();
  const handleAddFile = async (e) => {
    e.preventDefault();

    const file = e?.target?.files[0];

    if (currentFolder === null || file == null) return;

    setUploadingFiles((prev) => [
      ...prev,
      {
        id: uuid(),
        name: file.name,
        progress: 0,
        error: false,
      },
    ]);

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

        setUploadingFiles((prev) => {
          return prev.map((uploadFile) => {
            if (uploadFile.id === file?.name) {
              return { ...uploadFile, progress };
            }
            return uploadFile;
          });
        });
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(collection(database, "files"), {
            url: downloadURL,
            name: file?.name,
            createdAt: serverTimestamp(),
            folderId: currentFolder?.id,
            userId: user?.uid,
          });

          setRefetch((prev) => !prev);
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

      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div
                className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg font-medium leading-6 text-gray-900"
                        id="modal-headline"
                      >
                        Uploading Files
                      </h3>
                      <div className="mt-2">
                        {uploadingFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between px-4 py-2 my-2 text-sm font-medium text-white bg-green-500 rounded-md shadow-sm"
                          >
                            <div className="flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-white animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8z"
                                ></path>
                              </svg>
                              <p>{file.name}</p>
                            </div>
                            <p>{file.progress}%</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default AddFileButton;
