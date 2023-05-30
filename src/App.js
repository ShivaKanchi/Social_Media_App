import { useState } from 'react';
import './App.css'
import Posts from './components/Posts/Posts';

function App() {

  const [posts] = useState([
    {
      username: "Shiva Kanchi",
      caption: "Hello",
      imageUrl: "https://images.pexels.com/photos/88212/pexels-photo-88212.jpeg"
    },
    {
      username: "Abhishek Vishwakarama",
      caption: "What",
      imageUrl: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg"
    }, {
      username: "Chetan Singh",
      caption: "yeay",
      imageUrl: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg"
    }
  ]);

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
        posts.map((post, index) => <Posts key={index} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />)
      }

    </div>
  );
}

export default App;
