import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from  "./Signup.module.css"

export default function Signup(props) {
  const navigate = useNavigate();
  const [formData , setFormData] = useState()
  const [showMessage , setShowMessage] = useState(false)
  const [message, setMessage] = useState("")
  const [login, setLogin] = useState(false)

  const handleClick = async (e) => {
    e.preventDefault()
    const name = formData.name
    const email = formData.email
    const password = formData.password
    const confirmPassword = formData.confirmPassword
    if(password === confirmPassword){
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name:  name,
          email: email,
          password: password,
        })
      
      })
    
    
      const data = await response.json();
    
      if (data.message === "User created successfully") {
        setShowMessage(true)
        setMessage(data.message)
        setLogin(true)
      } else {
        setShowMessage(true)
        setMessage(data.message)
      }
    }
    else{
      setShowMessage(true)
      setMessage("Password Didn't Match")
    }
  }
    
    
    
    
    
    
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const goToLogin = () => {
    navigate("/login")
  }
  return (
    <>
    <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
    </div>
    <div className={showMessage ? styles.showMessage : styles.message}>
      {message}
     {login ? <button onClick={goToLogin}>Login to Continue</button> : <button onClick={() => setShowMessage(false)}>Okay</button> } 
    </div>
    <form onSubmit={handleClick}>
        <h3>Signup Here</h3>

        <label for="Name">Name</label>
        <input type="text" placeholder="Your Name" id="name"  name="name" onChange={handleChange} required="required"/>

        <label for="Name">E-mail</label>
        <input type="text" placeholder="Your E-mail" id="email"  name="email" onChange={handleChange} required="required"/>

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" name="password" onChange={handleChange} required="required"/>
        
        <label for="password">Confirm Password</label>
        <input type="password" placeholder="confirmPassword" id="confirmPassword" name="confirmPassword" onChange={handleChange} required="required"/>

        <button >Signup</button>
        <button className={styles.button2}>Already A User</button>
    </form>
    </>

  )
}
