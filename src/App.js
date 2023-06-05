import { useEffect, useState } from 'react';
import './App.css'
import Posts from './components/Posts/Posts';
import { db, getPosts, getPostsWithId } from './database/firebase';


function App() {

  const [posts, setPosts] = useState();

  useEffect(() => {
    getPosts(db).then(data => setPosts(data))
    getPostsWithId(db).then(data => console.log(data))
  }, [])

  console.log(posts)

  return (
    <div className="App">
      <div className='app__header'>
        <img
          className='app__headerImage'
          src='https://www.bananaip.com/wp-content/uploads/2016/11/Instagram_logo.svg_.png'
          alt='Logo'
        />
      </div>

      {
        posts?.map((post, index) => <Posts key={index} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />)
      }

    </div>
  );
}

export default App;
