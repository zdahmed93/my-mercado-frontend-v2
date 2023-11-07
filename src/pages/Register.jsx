import { useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import { requestRegister } from '../store/userSlice';

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(requestRegister({ firstName, lastName, email, password, navigate }))
  }

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control 
          placeholder="Enter first name" 
          value={firstName} 
          onChange={e => setFirstName(e.target.value)} 
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control 
          placeholder="Enter last name" 
          value={lastName} 
          onChange={e => setLastName(e.target.value)} 
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      
    </Form>
  )
}

export default Register
