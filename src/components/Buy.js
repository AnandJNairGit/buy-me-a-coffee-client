import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Container, Paper, TextField } from "@mui/material";
import { ethers } from "ethers";
import { Box } from "@mui/system";
import SnackBar from "./SnackBar";

const Buy = ({ state, getFunders }) => {
  // State to store the props for the SnackBar component
  const [snackBarProps, setSnackBarProps] = useState({
    message: "",
    severity: null,
    onClose: () => {},
  });

  // State to keep track of whether the snackbar is open or closed
  const [open, setOpen] = useState(false);

  // Define the validation schema for the form inputs
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    message: Yup.string().required("Message is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    const { name, message } = values;
    const { contract } = state;
    const value = { value: ethers.utils.parseEther("0.001") };

    // Update snackbar props with "Please wait Paying..." and open the snackbar
    setSnackBarProps({
      message: "Please wait Paying...",
      severity: "info",
      onClose: () => {
        setOpen(false);
      },
    });
    setOpen(true);

    // Call the smart contract function to buy coffee
    const transaction = await contract.buyCoffee(name, message, value);
    await transaction.wait(2);
    await getFunders();

    // Update snackbar props with "Transaction Successful" and open the snackbar
    setSnackBarProps({
      message: "Transaction Successful",
      severity: "success",
      onClose: () => {
        setOpen(false);
      },
    });
    setOpen(true);

    // Set submitting to false to enable the form to be submitted again
    setSubmitting(false);
  };

  return (
    <Container>
      {/* Wrap the form with Formik component */}
      <Formik
        initialValues={{ name: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Form input for name */}
            <Field
              name="name"
              as={TextField}
              label="Name"
              variant="outlined"
              margin="normal"
              required
            />
            <Box></Box>
            {/* Form input for message */}
            <Field
              name="message"
              as={TextField}
              label="Message"
              variant="outlined"
              margin="normal"
              required
            />
            <Box></Box>

            {/* Submit button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
            >
              Pay
            </Button>
          </Form>
        )}
      </Formik>
      {/* SnackBar component */}
      <SnackBar {...snackBarProps} open={open} />
    </Container>
  );
};

export default Buy;
