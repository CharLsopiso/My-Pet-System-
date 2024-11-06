'use client'

import { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Modal,
  Card,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Toast from "../../components/init_toast.js";

const OwnerPage = () => {
  const [loading, setLoading] = useState(true);
  const [ownerId, setOwnerId] = useState(null);
  const [owners, setOwners] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    contactDetails: "",
    address: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getOwners = async () => {
    try {
      setLoading(true);
      const url = "http://localhost/mypets/api/owner.php";

      let response = await axios.get(url, {
        params: { json: "", operation: "getOwners" },
      });

      const result = response.data;
      setOwners(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };

  const saveOwner = async () => {
    try {
      const url = "http://localhost/mypets/api/owner.php";

      const jsonData = {
        name: formData.name,
        contactDetails: formData.contactDetails,
        address: formData.address,
      };

      if (isEditing) {
        jsonData.ownerId = ownerId;
      }

      const formDataObj = new FormData();
      formDataObj.append("operation", isEditing ? "updateOwner" : "addOwner");
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
        getOwners();
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

  const handleEdit = (owner) => {
    setFormData({
      name: owner.Name,
      contactDetails: owner.ContactDetails,
      address: owner.Address,
    });
    setOwnerId(owner.OwnerID);
    setIsEditing(true);
    setShowModal(true);
  };

  useEffect(() => {
    getOwners();
  }, []);

  return (
    <Container className="mt-5">
      <Card bg={"success"}>
        <Card.Header className="d-flex justify-content-between align-items-center bg-transparent border-0 p-4">
          <h1 className="fw-bold">Owners</h1>
          <Button
            className="mb-3"
            variant="primary"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setFormData({ name: "", contactDetails: "", address: "" });
              setOwnerId(null);
            }}
          >
            Add Owner
          </Button>
        </Card.Header>
        <Card.Body>
          <Table 
            hover 
            responsive 
            className="bg-transparent mt-3 table-striped" 
            style={{ border: "2px solid green" }}
          >
            <thead>
              <tr>
                <th>Owner's Name</th>
                <th>Contact Details</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : owners.length > 0 ? (
                owners.map((owner) => (
                  <tr key={owner.OwnerID}>
                    <td>{owner.Name}</td>
                    <td>{owner.ContactDetails}</td>
                    <td>{owner.Address}</td>
                    <td className="text-center">
                      <Button variant="warning" onClick={() => handleEdit(owner)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No records found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {isEditing ? "Edit Owner" : "Add Owner"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              saveOwner();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Owner's Name</Form.Label>
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
              <Form.Label>Contact Details</Form.Label>
              <Form.Control
                type="text"
                value={formData.contactDetails}
                onChange={(e) =>
                  setFormData({ ...formData, contactDetails: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="float-end">
              {isEditing ? "Save Changes" : "Add Owner"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OwnerPage;
