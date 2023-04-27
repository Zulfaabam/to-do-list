import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { IoWarningOutline } from "react-icons/io5";

export interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
}

const DeleteConfirmationModal = ({
  open,
  onClose,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <IoWarningOutline
          size="63px"
          color="#ED4C5C"
          data-cy="modal-delete-icon"
        />
        <p className="font-medium text-lg" data-cy="modal-delete-title">
          Apakah anda yakin menghapus activity{" "}
          <span className="font-bold">“Meeting dengan Client”?</span>{" "}
        </p>
      </DialogContent>
      <DialogActions>
        <button
          data-cy="modal-delete-cancel-button"
          className="bg-gray w-[150px] py-3 flex justify-center items-center text-[#4a4a4a] text-lg font-semibold rounded-[45px]"
        >
          Batal
        </button>
        <button
          data-cy="modal-delete-confirm-button"
          className="bg-gray w-[150px] py-3 flex justify-center items-center text-[#4a4a4a] text-lg font-semibold rounded-[45px]"
        >
          Hapus
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
