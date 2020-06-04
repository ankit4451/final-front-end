import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles, CardHeader } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter,useHistory,useLocation } from "react-router-dom";
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

const SetPasswordForm = props => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  
  const handleSubmit = (values,{setSubmitting}) => {
    //Submit to Server
    //console.log(values);
    //console.log(props.location.aadhaarNumber);
    
    var body = {
      password: values.password
    };
    
    let currentUser = JSON.parse(localStorage.getItem("user"));
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': currentUser.token? `Bearer${currentUser.token}`:''
      }
    
    axios({
      method: 'post',
      url:'http://localhost:3000/setPassword/'+props.location.aadhaarNumber,
      data: JSON.stringify(body),
      headers: headers
    })
    .then(response => {
      console.log(response.data);
      if(response.data){
       props.history.push('/login');
      }
      localStorage.removeItem('user');
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
          password:"",
          confirmPassword:""
        }
      }
      onSubmit = {handleSubmit}
      validationSchema = {Yup.object().shape({
            password: Yup.string()
                .min(6, "Password must contain at least 6 characters")
                .required("Enter your password"),
            confirmPassword: Yup.string()
                .required("Confirm your password")
                .oneOf([Yup.ref("password")], "Password does not match")
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
          <CardHeader title= "Set Password"></CardHeader>
          <CardContent>
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
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword ? errors.confirmPassword : ""}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              SET PASSWORD
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

export default withRouter(SetPasswordForm);