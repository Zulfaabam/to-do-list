import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, color: "#111111", fontWeight: 600 }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 13,
            color: (theme) => theme.palette.grey[500],
          }}
          data-cy="modal-add-close-button"
        >
          <IoMdClose />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export interface AddActivityModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  disabled: boolean;
  handleSave: () => void;
}

const MyAddModal = ({
  open,
  onClose,
  title,
  children,
  disabled,
  handleSave,
}: AddActivityModalProps) => {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-add-activity"
      open={open}
      data-cy="modal-add"
    >
      <BootstrapDialogTitle
        id="customized-add-activity"
        onClose={onClose}
        data-cy="modal-add-title"
      >
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <button
          data-cy="modal-add-save-button"
          className="bg-blue w-[150px] py-3 flex justify-center items-center text-white text-base lg:text-lg font-semibold rounded-[45px] disabled:opacity-20"
          onClick={handleSave}
          disabled={disabled}
        >
          Simpan
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default MyAddModal;
