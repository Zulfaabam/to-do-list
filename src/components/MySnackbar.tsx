import { Alert, Snackbar } from "@mui/material";
import { AiOutlineInfoCircle } from "react-icons/ai";
import React from "react";

interface MySnackbarProps {
  alert: string;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

const MySnackbar = ({ alert, handleClose }: MySnackbarProps) => {
  return (
    <Snackbar
      open={Boolean(alert)}
      autoHideDuration={5000}
      onClose={handleClose}
      data-cy="modal-information"
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity="info"
        sx={{
          width: "100%",
          fontWeight: 500,
          color: "#111111",
          fontSize: 14,
        }}
        icon={<AiOutlineInfoCircle data-cy="modal-information-icon" />}
      >
        <p
          className="text-sm text-dark font-medium"
          data-cy="modal-information-title"
        >
          {alert}
        </p>
      </Alert>
    </Snackbar>
  );
};

export default MySnackbar;
