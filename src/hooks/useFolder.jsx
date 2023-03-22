import { useEffect, useReducer, useState } from "react";
import { database } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthProvider/AuthProvider";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
};

const ROOT_FOLDER = { name: "Root", id: null, path: [] };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
};

export const useFolder = (folderId = null, folder = null) => {
  const [refetch, setRefetch] = useState(false);
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: {
        folderId,
        folder,
      },
    });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    const docRef = doc(database, "folders", folderId);
    getDoc(docRef)
      .then((doc) => {
        const formatedDoc = {
          id: doc.id,
          ...doc.data(),
        };
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: formatedDoc },
        });
      })
      .catch((error) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    const q = query(
      collection(database, "folders"),
      where("parentId", "==", folderId),
      where("userId", "==", user.uid),
      orderBy("createdAt")
    );
    const unsubscribe = getDocs(q)
      .then((querySnapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: {
            childFolders: querySnapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            }),
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });

    return () => unsubscribe;
  }, [folderId, user, refetch]);

  return { state, setRefetch };
};
