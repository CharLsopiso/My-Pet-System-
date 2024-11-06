"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import { PersonFill, ClipboardData } from "react-bootstrap-icons";
import Link from "next/link";
import axios from "axios";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [ownerNum, setOwnerNum] = useState([]);
  const [specieNum, setSpecieNum] = useState([]);
  const [breedNum, setBreedNum] = useState([]);
  const [petNum, setPetNum] = useState([]);
  const [pets, setPets] = useState([]);

  const getNumOfOwners = async () => {
    try {
      const url = "http://localhost/mypets/api/dashboard.php";

      let response = await axios.get(url, {
        params: { json: "", operation: "numOfOwners" },
      });

      const result = response.data;
      setOwnerNum(result);
    } catch (error) {
      console.error("Error fetching number of owners:", error);
    }
  };

  const getNumOfSpecies = async () => {
    try {
      const url = "http://localhost/mypets/api/dashboard.php";

      let response = await axios.get(url, {
        params: { json: "", operation: "numOfSpecies" },
      });

      const result = response.data;
      setSpecieNum(result);
    } catch (error) {
      console.error("Error fetching number of species:", error);
    }
  };

  const getNumOfBreeds = async () => {
    try {
      const url = "http://localhost/mypets/api/dashboard.php";

      let response = await axios.get(url, {
        params: { json: "", operation: "numOfBreeds" },
      });

      const result = response.data;
      setBreedNum(result);
    } catch (error) {
      console.error("Error fetching number of breeds:", error);
    }
  };

  const getNumOfPets = async () => {
    try {
      const url = "http://localhost/mypets/api/dashboard.php";

      let response = await axios.get(url, {
        params: { json: "", operation: "numOfPets" },
      });

      const result = response.data;
      setPetNum(result);
    } catch (error) {
      console.error("Error fetching number of pets:", error);
    }
  };

  const getPets = async () => {
    try {
      setLoading(true);
      const url = "http://localhost/mypets/api/dashboard.php";

      let response = await axios.get(url, {
        params: { json: "", operation: "getPets" },
      });

      console.log(response);

      const result = response.data;
      setPets(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching number of pets:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getNumOfOwners();
    getNumOfSpecies();
    getNumOfBreeds();
    getNumOfPets();
    getPets();
  }, []);

  return (
    <Container fluid className="mt-5">
      <Row className="mb-5 w-100">
        <Col lg={6}>
          <Card bg={"success"} style={{maxHeight: "480px", overflow: "auto"}}>
            <Card.Header className="bg-transparent border-0 pt-3 px-4">
              <h1 className="fw-bold">Pets Information</h1>
            </Card.Header>
            <Card.Body >
              <Table
                striped
                bordered
                hover
                responsive
                className="bg-transparent mt-3 overflow-auto"
                style={{ borderColor: "green" }}
              >
                <thead>
                  <tr>
                    <th>Owner's Name</th>
                    <th>Pet Name</th>
                    <th>Species</th>
                    <th>Breed</th>
                    <th>Date of Birth</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : pets.length > 0 ? (
                    pets.map((pet) => (
                      <tr key={pet.PetID}>
                        <td>{pet.OwnerName}</td>
                        <td>{pet.PetName}</td>
                        <td>{pet.SpeciesName}</td>
                        <td>{pet.BreedName}</td>
                        <td>{pet.DateOfBirth}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Row className="mb-3">
            <Col lg={6}>
              <Card className="bg-light">
                <Link href="/user/owner" className="text-decoration-none text-dark">
                  <Card.Body className="p-4">
                    <Row className="align-items-center">
                      <Col xs={4} className="d-flex justify-content-center">
                        <PersonFill size={72} className="text-primary" />
                      </Col>
                      <Col xs={8}>
                      <Card.Title className="fw-bold">Number of Owners</Card.Title>
                        <Card.Text className="text-end h3">{ownerNum}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Link>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="bg-light">
                <Link href="/user/specie" className="text-decoration-none text-dark">
                  <Card.Body className="p-4">
                    <Row className="align-items-center">
                      <Col xs={4} className="d-flex justify-content-center">
                        <ClipboardData size={72} className="text-info" />
                      </Col>
                      <Col xs={8}>
                      <Card.Title className="fw-bold">Number of Species</Card.Title>
                        <Card.Text className="text-end h3">{specieNum}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Card className="bg-light">
                <Link href="/user/breed" className="text-decoration-none text-dark">
                  <Card.Body className="p-4">
                    <Row className="align-items-center">
                      <Col xs={4} className="d-flex justify-content-center">
                        <ClipboardData size={72} className="text-info" />
                      </Col>
                      <Col xs={8}>
                      <Card.Title className="fw-bold">Number of Breeds</Card.Title>
                        <Card.Text className="text-end h3">{breedNum}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Link>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="bg-light">
                <Link href="/user/pet" className="text-decoration-none text-dark">
                  <Card.Body className="p-4">
                    <Row className="align-items-center">
                      <Col xs={4} className="d-flex justify-content-center">
                        <ClipboardData size={72} className="text-info" />
                      </Col>
                      <Col xs={8}>
                      <Card.Title className="fw-bold">Number of Pets</Card.Title>
                        <Card.Text className="text-end h3">{petNum}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
