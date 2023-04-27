import React from "react";
import { FiPlus } from "react-icons/fi";

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dataCy: string;
}

const AddButton = ({ dataCy, ...props }: AddButtonProps) => {
  return (
    <button
      data-cy={dataCy}
      className="bg-blue text-white flex justify-center items-center gap-2 px-5 py-3 rounded-[45px] text-lg font-semibold"
      {...props}
    >
      <FiPlus /> Tambah
    </button>
  );
};

export default AddButton;
