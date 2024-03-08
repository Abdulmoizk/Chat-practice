import { Margin } from "@mui/icons-material";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth, signInWithEmailAndPassword } from "../config/db/firebase";

function Signin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            container
            direction="column"
            gap={1}
            justifyContent="center"
            alignItems="center"
          >
            <div>
              <TextField
                {...register("email", {
                  required: "*Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "*Invalid Email Address",
                  },
                })}
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
              />
              <span>{errors.email && <p>{errors.email.message}</p>}</span>
            </div>
            <div>
              <TextField
                type="password"
                {...register("password", {
                  required: "*Password is required",
                  minLength: {
                    value: 8,
                    message: "*Password must be at least 8 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "*Password must not exceed 20 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "*Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
                  },
                })}
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
              <span>{errors.password && <p>{errors.password.message}</p>}</span>
            </div>
            <div>
              <Button
                type="submit"
                color="success"
                variant="contained"
                size="large"
              >
                Signin
              </Button>
            </div>
            <div>
              Don't have an account? <Link to={"/signup"}>Signup</Link>
            </div>
          </Grid>
        </Box>
      </form>
    </div>
  );
}
export default Signin;
