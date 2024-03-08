import React from 'react';
import '../assets/styles/emailprompt.css';
import { useState } from 'react';
// import {toast} from 'react-toastify';
import {Form, Button} from 'react-bootstrap';

const EmailPrompt = () => {

    const [mailerState, setMailerState] = useState({
        name: "",
        email: "",
        message: "",
      });

      function handleStateChange(e) {

        setMailerState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      }

      const submitEmail = async (e) => {
        e.preventDefault();
        // console.log({ mailerState });

        // Change URL in "fetch('URL')" to below when LIVE and not DEV
        // https://framecoffeeroasters.onrender.com/send
        const response = await fetch("https://framecoffeeroasters.onrender.com/send", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ mailerState }),
        })
          .then((res) => res.json())
          .then(async (res) => {
            const resData = await res;
            // console.log(resData);
            if (resData.status === "success") {
              alert("Message sent successfully!\n\nWe will get back to you as soon as possible");
            } else if (resData.status === "fail") {
              alert("Failed to send message: Something went wrong on our end...\n\nPlease shoot us a message to: mainframe@framecoffee.net");
            }
          })
          .then(() => {
            setMailerState({
              email: "",
              name: "",
              message: "",
            });
          });
      };

  return (
        <Form className="email-container" onSubmit={submitEmail}>
          <h1>CONTACT US</h1>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Control
              placeholder='Name'
              onChange={handleStateChange}
              name='name'
              value={mailerState.name}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                placeholder='Email'
                onChange={handleStateChange}
                name='email'
                value={mailerState.email}
                required
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicTextArea">
            <Form.Control 
              as="textarea" 
              rows={3}
              onChange={handleStateChange}
              name='message'
              placeholder='Message'
              value={mailerState.message}
              required
            />
          </Form.Group>
          <button className='contact-btn' type="submit">Submit</button>
        </Form>
  )
}

export default EmailPrompt