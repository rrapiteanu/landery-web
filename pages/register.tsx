//@ts-nocheck
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Field, Formik } from "formik";
import AUTH_API from "lib/api/auth";
import withoutAuth from "lib/hocs/withoutAuth";
import Router from "next/router";
import React from "react";
import { InputField } from "../components/fields/InputField";
import LanderyButton from "./../components/ui/LanderyButton/LanderyButton";
import Layout from "./../components/ui/Layout/Layout";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    border: "2px solid #d3d3d363",
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

const RegisterPage = ({ classes }) => {
  const register = async (firstName, lastName, email, password) => {
    try {
      await AUTH_API.register(firstName, lastName, email, password);
    } catch (error) {}
  };

  return (
    <Layout menuType="relative">
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
              const { email, password, lastName, firstName } = data;

              try {
                await register(firstName, lastName, email, password);

                Router.push("/login");
              } catch (err) {
                const errors: { [key: string]: string } = {};

                setErrors(errors);
              }
            }}
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: "",
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <Field
                  name="firstName"
                  label="First Name"
                  component={InputField}
                />
                <Field
                  name="lastName"
                  label="Last Name"
                  component={InputField}
                />
                <Field
                  name="email"
                  type="email"
                  label="Email Address"
                  component={InputField}
                />
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  component={InputField}
                />
                <LanderyButton
                  type="submit"
                  fullWidth
                  color="primary"
                  className={classes.submit}
                >
                  Sign up
                </LanderyButton>
              </form>
            )}
          </Formik>
        </Paper>
      </main>
    </Layout>
  );
};

//@ts-ignore
export default withStyles(styles)(withoutAuth(RegisterPage));
