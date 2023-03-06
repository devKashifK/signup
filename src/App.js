import "./App.css";
import Header from "./component/Header/Header";
import Login from "./component/Login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./component/Signup/Signup";
import Profile from "./component/Profile/Profile";
import { useEffect, useState } from "react";

function App() {

  const [myState, setMyState] = useState(false);

  useEffect(() => {
    const myStateFromStorage = localStorage.getItem('myState');
    if (myStateFromStorage !== null) {
      setMyState(JSON.parse(myStateFromStorage));
    } else {
      localStorage.setItem('myState', JSON.stringify(false));
    }
  }, []);
  console.log(myState)

  const handleButtonClick = () => {
    const newState = !myState;
    setMyState(newState);
    localStorage.setItem('myState', JSON.stringify(newState));
  };
 const changeState = () => {
  const newState = !myState;
  setMyState(newState);
  localStorage.setItem('myState', JSON.stringify(newState));
  localStorage.removeItem('email');
 }

  return (
    <>
      <Header  loggedIn = {myState} changeState={changeState}/>
      <Routes>
        <Route
          path="/"
          element={
            myState ? <Profile /> : <Signup  />
          }
        />
        <Route path="/login" element={<Login changeLogin={handleButtonClick}/>} />
        <Route path="/profile" element={myState ? <Profile /> : <Signup />} />
      </Routes>
    </>
  );
}

export default App;
