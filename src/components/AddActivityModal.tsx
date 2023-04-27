import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { styled } from "@mui/material/styles";
import { NewActivityBody } from "../App";
import { useState } from "react";

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
  handleSave: (body: NewActivityBody) => void;
}

const AddActivityModal = ({
  open,
  onClose,
  handleSave,
}: AddActivityModalProps) => {
  const [body, setBody] = useState({
    email: "zulfafatahakbar@gmail.com",
    title: "",
  });

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-add-activity"
      open={open}
    >
      <BootstrapDialogTitle id="customized-add-activity" onClose={onClose}>
        Tambah Activity
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <div className="flex flex-col gap-2">
          <label htmlFor="activity-title-input" className="text-dark text-xs">
            Title
          </label>
          <input
            id="activity-title-input"
            placeholder="Tambahkan activity"
            className="border border-gray rounded-md py-3 px-4 w-[400px]"
            onChange={(e) => setBody({ ...body, title: e.target.value })}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <button
          data-cy="modal-delete-confirm-button"
          className="bg-blue w-[150px] py-3 flex justify-center items-center text-white text-lg font-semibold rounded-[45px]"
          onClick={() => handleSave(body)}
        >
          Simpan
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default AddActivityModal;
