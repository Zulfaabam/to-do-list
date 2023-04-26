import React from "react";
import { FiPlus } from "react-icons/fi";

const AddButton = ({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      data-cy="activity-add-button"
      className="bg-blue text-white flex justify-center items-center gap-2 px-5 py-3 rounded-[45px] text-lg font-semibold"
      {...props}
    >
      <FiPlus /> Tambah
    </button>
  );
};

export default AddButton;
