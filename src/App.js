import { useEffect, useState } from "react";
import "./App.css";
import Posts from "./components/Posts/Posts";
import { db, getPostsWithId, getPosts, login } from "./database/firebase";
import { Box, Button, Input, Modal } from "@mui/material";

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
  const [posts, setPosts] = useState();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    // getPosts(db).then((data) => setPosts(data));
    getPostsWithId(db).then((data) => setPosts(data));
    console.log("post recevied", posts);
  }, []);

  // console.log(posts);
  const signUp = (event) => {
    setOpen(true);
    event.preventDefault();
  };

  const logIn = (event) => {
    event.preventDefault();
    login(email, password);
    console.log("logIn");
  };

  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src="https://www.bananaip.com/wp-content/uploads/2016/11/Instagram_logo.svg_.png" alt="Logo" />
            </center>

            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={logIn}>Log In</Button>
          </form>
        </Box>
      </Modal>

      <div className="app__header">
        <img className="app__headerImage" src="https://www.bananaip.com/wp-content/uploads/2016/11/Instagram_logo.svg_.png" alt="Logo" />

        <Button className="app__headerButton" onClick={signUp}>
          Sign Up
        </Button>
      </div>
      {posts?.map(({ id, post }) => (
        <Posts key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))}
    </div>
  );
}

export default App;
