import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ethers } from "ethers";

const Buy = ({ state }) => {
  return (
    <div>
      <Formik
        initialValues={{ name: "", message: "" }}
        onSubmit={async (values) => {
          console.log("the values are-------------->", values);
          const { name, message } = values;
          const { contract } = state;
          const value = { value: ethers.utils.parseEther("0.001") };
          const transaction = await contract.buyCoffee(name, message, value);
          await transaction.wait(2);
          console.log(await contract.getFunders());
        }}
      >
        <Form>
          <label htmlFor="name">Name:</label>
          <Field name="name" type="text" />
          <label htmlFor="">Message:</label>
          <Field name="message" type="text" />
          <button type="submit">Pay</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Buy;
