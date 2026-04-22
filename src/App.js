import { useEffect, useState } from "react";
import "./App.css";
import Posts from "./components/Posts/Posts";
import { db, auth, signUpUser, logInUser, logOutUser } from "./database/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Box, Button, Input, Modal } from "@mui/material";
import ImageUpload from "./components/ImageUpload/ImageUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();
    await signUpUser(email, password, username);
    setOpenSignUp(false);
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    await logInUser(email, password);
    setOpenSignIn(false);
  };

  return (
    <div className="App">
      <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src="https://www.bananaip.com/wp-content/uploads/2016/11/Instagram_logo.svg_.png" alt="Logo" />
            </center>
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" onClick={handleSignUp}>Sign Up</Button>
          </form>
        </Box>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src="https://www.bananaip.com/wp-content/uploads/2016/11/Instagram_logo.svg_.png" alt="Logo" />
            </center>
            <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" onClick={handleLogIn}>Log In</Button>
          </form>
        </Box>
      </Modal>

      <div className="app__header">
        <img className="app__headerImage" src="https://www.bananaip.com/wp-content/uploads/2016/11/Instagram_logo.svg_.png" alt="Logo" />

        {user ? (
          <Button onClick={logOutUser}>Log Out</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Log In</Button>
            <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        {posts?.map(({ id, post }) => (
          <Posts key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} user={user} />
        ))}
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3 className="app__loginToUpload">Sorry you need to login to upload</h3>
      )}

    </div>
  );
}

export default App;
