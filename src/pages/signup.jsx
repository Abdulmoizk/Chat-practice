import { Margin } from "@mui/icons-material";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../config/db/firebase";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (res) => {
        await setDoc(doc(db, "users", res.user.uid), data);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
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
            //   justifyContent="center"
            alignItems="center"
          >
            {" "}
            <div>
              <TextField
                {...register("fullname", {
                  required: "*Fullname is required",
                })}
                id="outlined-basic-name"
                label="Fullname"
                variant="outlined"
              />
              <span>{errors.fullname && <p>{errors.fullname.message}</p>}</span>
            </div>
            <div>
              <TextField
                {...register("email", {
                  required: "*Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "*Invalid Email Address",
                  },
                })}
                id="outlined-basic-email"
                label="Email Address"
                variant="outlined"
              />
              <span>{errors.email && <p>{errors.email.message}</p>}</span>
            </div>
            <div>
              <TextField
                id="outlined-basic-password"
                label="Password"
                variant="outlined"
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
                Signup
              </Button>
            </div>
            <div>
              Don't have an account? <Link to={"/signin"}>Signin</Link>
            </div>
          </Grid>
        </Box>
      </form>
    </div>
  );
}
export default Signup;
