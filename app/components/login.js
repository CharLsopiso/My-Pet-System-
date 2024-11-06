"use client";

import { useState } from "react";
import { Container, Col, Form, Button, Card, InputGroup } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { EyeFill, EyeSlash } from "react-bootstrap-icons";
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url = 'http://localhost/mypets/api/login.php';

      if (validate()) {
        const jsonData = {
          username: formData.username,
          password: formData.password,
        };

        let response = await axios.get(url, {
          params: { json: JSON.stringify(jsonData), operation: 'login' },
        });

        const result = response.data;

        if (result && result.status === 'success') {
          sessionStorage.setItem('PUID', result.user.user_id);
          router.push("/user");
        } else {
          Swal.fire('Error', `${result.message}`, 'error');
        }

      } else {
        Swal.fire('Error', 'Please fill in all required fields.', 'error');
      }

    } catch (error) {
      Swal.fire('Error', 'An error occurred. Please try again.', 'error');
    }
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center vh-100"
        fluid
      >
        <Col lg={3}>
          <Card className="shadow-sm rounded-1 p-2" bg={"success"}>
            <Card.Header className="border-0 bg-transparent text-center fw-bold">
              <h3 className="text-white">Charls' Pets Login</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-4">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`mb-2${
                      errors.username ? "border border-danger" : ""
                    }`}
                  />
                   {errors.username && (
                  <p className="text-danger">{errors.username}</p>
                )}
                </Form.Group>
               

                <Form.Group className="mb-5">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`mb-2${
                        errors.password ? "border border-danger" : ""
                      }`}
                      placeholder="Enter your password"
                      style={{ height: '2.5rem' }}
                    />
                    <InputGroup.Text
                      onClick={toggleShowPassword}
                      className="cursor-pointer"
                      style={{ height: '2.5rem' }}
                    >
                      {showPassword ? <EyeSlash /> : <EyeFill />}
                    </InputGroup.Text>
                  </InputGroup>
                  {errors.password && (
                  <p className="text-danger">{errors.password}</p>
                )}
                </Form.Group>
              
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 shadow-sm text-white rounded-1"
                >
                  Log in
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default LoginForm;
