import { Dialog, DialogContent } from "@mui/material";
import { IoWarningOutline } from "react-icons/io5";

export interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  id: number;
  handleDelete: (id: number) => void;
}

const DeleteConfirmationModal = ({
  open,
  onClose,
  title,
  id,
  handleDelete,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} data-cy="modal-delete">
      <DialogContent
        className="text-center"
        sx={{ paddingX: "62px", paddingY: "50px" }}
      >
        <IoWarningOutline
          size="63px"
          color="#ED4C5C"
          data-cy="modal-delete-icon"
          className="mx-auto"
        />
        <p
          className="font-medium text-lg mt-[51px] max-w-[365px]"
          data-cy="modal-delete-title"
        >
          Apakah anda yakin menghapus activity{" "}
          <span className="font-bold">{`"${title}"`}?</span>{" "}
        </p>
        <div className="flex justify-center items-center gap-5 mt-[46px]">
          <button
            data-cy="modal-delete-cancel-button"
            className="bg-gray w-[150px] py-3 flex justify-center items-center text-[#4a4a4a] text-lg font-semibold rounded-[45px]"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            data-cy="modal-delete-confirm-button"
            className="bg-[#ED4C5C] w-[150px] py-3 flex justify-center items-center text-white text-lg font-semibold rounded-[45px]"
            onClick={() => handleDelete(id)}
          >
            Hapus
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
