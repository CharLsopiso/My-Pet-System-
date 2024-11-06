"use client";

import { useState, useEffect } from "react";
import { Container, Table, Button, Form, Modal, Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Toast from "../../components/init_toast.js";

const SpeciePage = () => {
  const [loading, setLoading] = useState(true);
  const [specieId, setSpecieId] = useState(null);
  const [species, setSpecies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getSpecies = async () => {
    try {
      setLoading(true);
      const url = "http://localhost/mypets/api/specie.php";

      let response = await axios.get(url, {
        params: { json: "", operation: "getSpecies" },
      });

      const result = response.data;
      setSpecies(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching species:", error);
    }
  };

  const saveSpecie = async () => {
    try {
      const url = "http://localhost/mypets/api/specie.php";

      const jsonData = {
        name: formData.name,
      };

      if (isEditing) {
        jsonData.specieId = specieId;
      }

      const formDataObj = new FormData();
      formDataObj.append("operation", isEditing ? "updateSpecie" : "addSpecie");
      formDataObj.append("json", JSON.stringify(jsonData));

      let response = await axios({
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
        getSpecies();
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

  const handleEdit = (specie) => {
    setFormData({
      name: specie.SpeciesName,
    });
    setSpecieId(specie.SpeciesID);
    setIsEditing(true);
    setShowModal(true);
  };

  useEffect(() => {
    getSpecies();
  }, []);

  return (
    <Container className="mt-5">
      <Card bg={"success"}>
        <Card.Header className="d-flex justify-content-between align-items-center bg-transparent border-0 p-4">
          <h1 className="fw-bold">Species</h1>
          <Button
            className="mb-3"
            variant="primary"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setFormData({ name: "" });
              setSpecieId(null);
            }}
          >
            Add Specie
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
                <th>Specie's name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="2" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : species.length > 0 ? (
                species.map((specie) => (
                  <tr key={specie.SpeciesID}>
                    <td>{specie.SpeciesName}</td>
                    <td className="text-center">
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(specie)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {isEditing ? "Edit Specie" : "Add Specie"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              saveSpecie();
            }}
          >
            <Form.Group className="mb-5">
              <Form.Label>Specie's name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="float-end">
              {isEditing ? "Save Changes" : "Add Specie"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SpeciePage;
