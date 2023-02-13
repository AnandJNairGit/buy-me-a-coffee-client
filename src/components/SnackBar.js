import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SnackBar = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={
        onClose
          ? () => {
              onClose();
            }
          : () => {}
      }
    >
      <Alert
        onClose={
          onClose
            ? () => {
                onClose();
              }
            : () => {}
        }
        severity={severity ? severity : "info"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
