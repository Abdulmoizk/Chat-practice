import { useEffect, useState } from "react";
import AppRouter from "./config/Router";
import User from "./context/user";
import Chat from "./pages/Chat";
import Signin from "./pages/signup";
import { auth, db, doc, getDoc, onAuthStateChanged } from "./config/db/firebase";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document!");
          }
        }
      },
      []
    );
  });
  return (
    <User.Provider value={{ User }}>
      <AppRouter />
    </User.Provider>
  );
}
export default App;
