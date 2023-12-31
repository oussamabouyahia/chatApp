/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Home = ({socket}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit =  (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
     axios.put('http://localhost:3000/login',{username:userName,socketId:socket.id})
    socket.emit('newUser', { userName, socketID: socket.id });
    navigate('/chat');
  };
  
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input 
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta" >SIGN IN</button>
    </form>
  );
};

export default Home;