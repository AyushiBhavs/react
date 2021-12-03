import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import { dashCtx } from '../App';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export default function UserSignIn() {
  const signCtx = useContext(dashCtx)
  const [userSignData, setUserSignData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });


  const [serverErr, setServerErr] = useState();
  const [show, setShow] = useState(true);


  const submit = async (e) => {

    e.preventDefault()
    let isValid = true
    const error = {};
    if (userSignData.email === "") {
      error.email = 'Email is required!'
      isValid = false
    } else if (!validEmailRegex.test(userSignData.email)) {
      error.email = 'Email is not vaild!'
      isValid = false
    } else {
      error.email = ""
      isValid = true
    }


    if (userSignData.password === "") {
      error.password = 'password is required!'
      isValid = false
    }
    setErrors(error)

    if (isValid) {

      axios.post('http://cloudsysbe-env.eba-kdswdneh.ap-southeast-1.elasticbeanstalk.com/v1/api/auth/signin', userSignData, {
        headers: headers
      }).then(response => {
        // handle success
        console.log(response, "res");
        if (response.status === 200) {
          setErrors({})
          let userToken = response.data          
          // console.log(userToken,"userToken")
          localStorage.setItem("userToken", userToken)
          signCtx.setIsLoggedIn(true)

        }
      }).catch(err => {
        // handle error    
        //console.dir(err, "error");
        setServerErr(err.response.data.message);
        setShow(true)
      })

    }
  }
  const handleInputChange = (value, name) => {
    setUserSignData({ ...userSignData, [name]: value })
    setErrors({})
  }
  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h1 className="text-center" style={{ color: "#dce8f0" }}>Retail User</h1>

            <Form onSubmit={(e) => submit(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userSignData.email}
                  onChange={e => handleInputChange(e.target.value, e.target.name)}
                  placeholder="Enter email" />
                {errors.email &&
                  <span className='error' style={{ color: "red", fontSize: "14px" }}>{errors.email}</span>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={userSignData.password}
                  onChange={e => handleInputChange(e.target.value, e.target.name)}
                  placeholder="Enter Password" />
                {errors.password &&
                  <span className='error' style={{ color: "red", fontSize: "14px" }}>{errors.password}</span>}
              </Form.Group>
              {show && serverErr ?
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>{serverErr}</Alert> : null}
              <Button variant="primary" type="submit">
                Signin
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}
