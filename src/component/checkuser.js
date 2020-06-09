import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles, CardHeader } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 420,
    marginTop: 50
  },
  container: {
    display: "Flex",
    justifyContent: "center"
  },
  cardHeader: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  actions: {
    float: "right"
  }
}));

const CheckUserForm = props => {
  const classes = useStyles();

  const handleSubmit = (values, {setSubmitting}) => {
    //Submit to server
    console.log(values);
    axios.post('https://ddp-tec.herokuapp.com/uidcheck',values)
           .then(response => {
               console.log(response.data);
               if(response.data.success && response.data.success === true){
                props.history.push('/');
               }
               else{
                 props.history.push({
                  pathname:'/setpassword',
                  aadhaarNumber: values.aadhaar
               });
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
          aadhaar:""
        }
      }
      onSubmit = {handleSubmit}
      validationSchema = {Yup.object().shape({
           aadhaar: Yup.string()
                .required("Aadhaar Number is required")
                .matches(/^[0-9]{12}$/, 'Must be exactly 12 digits')
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
         handleSubmit
        } = props;
        return(
  <div>
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card} style={{ backgroundColor: "#f3e5f5" }}>
          <CardHeader className={classes.cardHeader} title= "Check User"></CardHeader>
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
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              SUBMIT
            </Button>
          </CardActions> 
        </Card>
        <br></br>
        <Typography variant="subtitle1" color='secondary' align = 'center' component="p">
                Already Registered  <Link variant="body2" color="inherit" to="/login"> Login </Link>
        </Typography>
      </form>
    </div>
  </div>
        );
      }}
    </Formik>
  );
}

export default withRouter(CheckUserForm);