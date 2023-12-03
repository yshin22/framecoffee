import React from 'react';
import '../assets/styles/emailprompt.css';
import { useState } from 'react';
import {toast} from 'react-toastify';
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
        console.log({ mailerState });
        const response = await fetch("http://localhost:4000/send", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ mailerState }),
        })
          .then((res) => res.json())
          .then(async (res) => {
            const resData = await res;
            console.log(resData);
            if (resData.status === "success") {
              alert("Message Sent");
            } else if (resData.status === "fail") {
              alert("Message failed to send");
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
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                placeholder='Email'
                onChange={handleStateChange}
                name='email'
                value={mailerState.email}
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
            />
          </Form.Group>
          <Button className='contact-btn' type="submit">Submit</Button>
        </Form>
  )
}

export default EmailPrompt