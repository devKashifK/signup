import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Login.module.css"

export default function Login(props) {
  const [formData , setFormData] = useState()
  const [showMessage, setShowMessage] = useState(false)
  const [message , setMessage] = useState("")
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(formData)
  };

  const handleClick =  async (e) => {
    e.preventDefault()
    const email = formData.email
    const password = formData.password
   const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (data.message === 'Login successful') {
      navigate("/profile");
      props.changeLogin()
      localStorage.setItem("email" , JSON.stringify(formData.email))
    } else {
      setMessage(data.message);
      setShowMessage(true)
    }
  };

  

  return (
   <>
    <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
    </div>
    <div className={showMessage ? styles.showMessage : styles.message}>
      {message}
      <button onClick={() => setShowMessage(false)}>Ok</button>
    </div>
    <form onSubmit={handleClick}>
        <h3>Login Here</h3>

        <label for="username">Username</label>
        <input type="text" placeholder="Email" id="username" name="email"  onChange={handleChange} required="required"/>

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" name="password" onChange={handleChange} required="required"/>

        <button>Log In</button>
    </form>
    </>


  )
}
