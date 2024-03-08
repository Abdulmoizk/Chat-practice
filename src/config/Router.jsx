import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Chat from "../pages/Chat";
import Signin from "../pages/login";
import Signup from "../pages/signup";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "./db/firebase";

function AppRouter() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        setUser(user ? true : false);
      },
      []
    );
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Chat /> : <Navigate to={"/signin"} />}
          />
          <Route
            path="/signin"
            element={user ? <Navigate to={"/"} /> : <Signin />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to={"/"} /> : <Signup />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default AppRouter;
