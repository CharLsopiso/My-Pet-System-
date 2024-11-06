"use client";

import { useState, useEffect } from "react";
import { Container, Table, Button, Form, Modal, Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Toast from "../../components/init_toast.js";

const BreedPage = () => {
  const [loading, setLoading] = useState(true);
  const [breedId, setBreedId] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [species, setSpecies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    specieId: "", // Ensure this is initialized correctly
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getBreeds = async () => {
    try {
      setLoading(true);
      const url = "http://localhost/mypets/api/breed.php";
      const response = await axios.get(url, {
        params: { json: "", operation: "getBreeds" },
      });
      setBreeds(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  };

  const getSpecies = async () => {
    try {
      const url = "http://localhost/mypets/api/specie.php";
      const response = await axios.get(url, {
        params: { json: "", operation: "getSpecies" },
      });
      const result = response.data;

      const initSpecies = result.map((specie) => ({
        id: specie.SpeciesID,
        name: specie.SpeciesName,
      }));
      
      setSpecies(initSpecies);
    } catch (error) {
      console.error("Error fetching species:", error);
    }
  };

  const saveBreed = async () => {
    try {
      const url = "http://localhost/mypets/api/breed.php";
      const jsonData = {
        name: formData.name,
        specieId: formData.specieId,
      };

      if (isEditing) {
        jsonData.breedId = breedId;
      }

      const formDataObj = new FormData();
      formDataObj.append("operation", isEditing ? "updateBreed" : "addBreed");
      formDataObj.append("json", JSON.stringify(jsonData));

      const response = await axios({
        url: url,
        method: "POST",
        data: formDataObj,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = response.data;

      if (result && result.status === "success") {
        Toast.fire({
          icon: "success",
          title: `<small>${result.message}<small>`,
        });
        getBreeds();
      } else {
        Toast.fire({
          icon: "error",
          title: `<small>${result.message}<small>`,
        });
      }
      setShowModal(false);
    } catch (error) {
      Swal.fire("Error", "An error occurred. Please try again.", "error");
    }
  };

  const handleEdit = (breed) => {
    setFormData({
      name: breed.BreedName,
      specieId: breed.SpeciesID || "",
    });
    setBreedId(breed.BreedID);
    setIsEditing(true);
    setShowModal(true);
  };

  useEffect(() => {
    getBreeds();
    getSpecies();
  }, []);

  return (
    <Container className="mt-5">
      <Card bg={"success"}>
        <Card.Header className="d-flex justify-content-between align-items-center bg-transparent border-0 p-4">
          <h1 className="fw-bold">Breeds</h1>
          <Button
            className="mb-3"
            variant="primary"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setFormData({ name: "", specieId: "" });
              setBreedId(null);
            }}
          >
            Add Breed
          </Button>
        </Card.Header>
        <Card.Body>
          <Table
            hover
            responsive
            className="bg-transparent table-striped"
            style={{ border: "2px solid green" }}
          >
            <thead>
              <tr>
                <th>Breed</th>
                <th>Specie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : breeds.length > 0 ? (
                breeds.map((breed) => (
                  <tr key={breed.BreedID}>
                    <td>{breed.BreedName}</td>
                    <td>{breed.SpeciesName}</td>
                    <td className="text-center">
                      <Button variant="warning" onClick={() => handleEdit(breed)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No records found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {isEditing ? "Edit Breed" : "Add Breed"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              saveBreed();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Breed name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Specie</Form.Label>
              <Form.Control
                as="select"
                value={formData.specieId || ""}
                onChange={(e) =>
                  setFormData({ ...formData, specieId: e.target.value })
                }
                required
              >
                <option value="">Select a specie</option>
                {species.map((specie) => (
                  <option key={specie.id} value={specie.id}>
                    {specie.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="float-end">
              {isEditing ? "Save Changes" : "Add Breed"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BreedPage;
