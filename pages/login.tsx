import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LanderyButton from "components/ui/LanderyButton/LanderyButton";
import Layout from "components/ui/Layout/Layout";
import { Field, Formik } from "formik";
import { setAccessToken } from "lib/accessToken";
import AUTH_API from "lib/api/auth";
import withoutAuth from "lib/hocs/withoutAuth";
import { useAuth } from "lib/providers/Auth";
import React from "react";
import { InputField } from "../components/fields/InputField";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    border: "2px solid #d3d3d363",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

const LoginPage = ({ classes }) => {
  const { setAuthenticated } = useAuth();

  const login = async (data) => {
    const { email, password } = data;

    try {
      const resp: any = await AUTH_API.login(email, password);
      return {
        accessToken: resp.data.accessToken,
      };
    } catch (error) {
      throw error;
    }
  };

  return (
    <Layout menuType="relative">
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
              try {
                const response = await login(data);

                if (response) {
                  setAccessToken(response.accessToken);
                  setAuthenticated(true);
                }
              } catch (error) {
                setErrors({
                  password: "eroare",
                });

                return;
              }
            }}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
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
                  Sign in
                </LanderyButton>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </form>
            )}
          </Formik>
        </Paper>
      </main>
    </Layout>
  );
};

//@ts-ignore
export default withStyles(styles)(withoutAuth(LoginPage));
