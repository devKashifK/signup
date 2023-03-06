import React, { useState } from 'react';
import styles from "./Profile.module.css";

export default function Profile() {
  const [formData , setFormData] = useState()
  const [message , setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)

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
     
    const email = JSON.parse(localStorage.getItem('email'))
    const age = formData.age
    const  dob = formData.dob
    const gender = formData.gender
    const number = formData.number
   const response = await fetch('http://localhost:5000/updateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, dob, number, gender, age }),
    });
    const data = await response.json();
    if (data.message === "Profile updated successfully") {
      setShowMessage(true)
     setMessage(data.message)
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
        <h3>Complete Your Profile</h3>

        <label for="Name">Age</label>
        <input type="text" placeholder="Your Age" id="Age" name="age" onChange={handleChange} required="required"/>

        <label for="Gender">Gender</label>
        <select name="gender" id="gender" onChange={handleChange} required="required">
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Rather Not Say">Rather Not Say</option>
  </select>


        <label for="Name">Mobile</label>
        <input type="tel" placeholder="Mobile Number" id="number" name="number" onChange={handleChange} required="required"/>
        <label for="Name">Date Of Birth</label>
        <input type="date" placeholder="Your Age" id="Age" name="dob" onChange={handleChange} required="required"/>
       

        <button>Update Your Profile</button>
    </form>
    </>

  )
}
