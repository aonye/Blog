import { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav.js';

function App() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
  }, []);

  function addStuff() {
    const newDiv = (
      <div>
        Hello world
      </div>
    )
  }

  async function getPosts() {
    const response = await fetch('http://localhost:8000/api/posts');
    const posts = response ? response.json() : null;
    return posts;
  }

  async function makePosts(posts) {
    //posts is a promise
    console.log(posts);
    posts.then(function(value) {
      console.log(value); // "Success!"
      return Promise.reject('oh, no!');
    }).catch(function(e) {
      console.error(e); // "oh, no!"
    }).then(function(){
      console.log('after a catch the chain is restored');
    }, function () {
      console.log('Not fired due to the catch');
});
  }


  return (
    <>
      <div className='nav-box'>
        <Nav />
      </div>
      <div className='App'>
        {posts}
      </div>
      <button onClick={(e) => makePosts(getPosts())}>Add stuff</button>
    </>
  );
}

export default App;