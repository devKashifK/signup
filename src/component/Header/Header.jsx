import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Header.module.css"

export default function Header(props) {
  
  return (
    <nav className={styles.nav}>
      <Link to="./profile"><li>Profile</li></Link>
      <Link to="./"><li>Signup</li> </Link>
      {props.loggedIn ? <Link to="./"><li onClick={() => props.changeState()}>Logout</li></Link>  : <Link to="./login"><li>Login</li></Link>}
      
    </nav>
  )
}
