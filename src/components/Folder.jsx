import React from "react";
import { Link } from "react-router-dom";
import { FcFolder } from "react-icons/fc";

const Folder = ({ folder }) => {
  return (
    <Link
      to={`/folder/${folder.id}`}
      state={{ folder }}
      className="btn btn-wide bg-white text-green-400 border border-green-400"
    >
      <FcFolder fontSize={24} className="mr-3" /> {folder?.name}
    </Link>
  );
};

export default Folder;
