import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles, CardHeader } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory,withRouter } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 420,
      marginTop: 50
    },
    container: {
      display: "Flex",
      justifyContent: "center"
    },
    actions: {
      float: "right"
    }
  }));

const LoginForm = props => {
    const classes = useStyles();
    const history = useHistory();

    const handleSubmit = (values,{setSubmitting}) => {
        //Submit to Server
        console.log(values);
        axios.post('http://localhost:3000/users/login',values)
             .then(response => {
               console.log(response);
               if(response.data){
                 localStorage.setItem("user",JSON.stringify(response.data));
                 props.history.push('/home');
               }
             })
             .catch(error => {
                 console.log(error);
             })
        setSubmitting(false);
      }

    return (
        <Formik
          initialValues = {
              {
                  aadhaar:"",
                  password:""
              }
          }
          onSubmit = {handleSubmit}
          validationSchema = {Yup.object().shape({
               aadhaar: Yup.string()
                .required("Aadhaar Number is required")
                .matches(/^[0-9]{12}$/, 'Must be exactly 12 digits'),
               password: Yup.string()
                .min(6, "Password must contain at least 6 characters")
                .required("Enter your password")

          })}
        >
          {props => {
            const {
             values,
             touched,
             errors,
             isSubmitting,
             handleChange,
             handleBlur,
             handleSubmit,
             handleReset
            } = props;
            return(
  <div>
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardHeader title= "Login"></CardHeader>
          <CardContent>
            <TextField
              id="aadhaar"
              label="Aadhaar Number"
              value={values.aadhaar}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.aadhaar ? errors.aadhaar : ""}
              error={touched.aadhaar && Boolean(errors.aadhaar)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              SUBMIT
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  </div>
            );
          }}
        </Formik>
    );
}

export default withRouter(LoginForm);