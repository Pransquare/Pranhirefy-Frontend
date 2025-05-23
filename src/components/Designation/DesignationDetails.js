
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Alert, Card, Row, Col } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import HeaderComponent from '../HeaderComponent';

export default function DesignationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [designation, setDesignation] = useState(null);
  const [editedDesignation, setEditedDesignation] = useState({});
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(location.state?.isEditing || false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getDesignation/${id}`);
        setDesignation(response.data);
        setEditedDesignation(response.data);
      } catch (error) {
        setError('Failed to fetch designation details.');
      }
    };

    fetchDesignation();
  }, [id]);

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChange = (e) => {
    setEditedDesignation({ ...editedDesignation, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const dataToSend = { ...editedDesignation };
      delete dataToSend.modifiedDate;

      await axios.put(`http://localhost:8080/api/updateDesignation/${id}`, dataToSend);
      const response = await axios.get(`http://localhost:8080/api/getDesignation/${id}`);
      setDesignation(response.data);
      setEditedDesignation(response.data);
      setIsEditing(false);
      showMessage('Successfully updated the changes.', 'success');
    } catch (err) {
      showMessage('Failed to update designation.', 'danger');
    }
  };

  const handleCancel = () => {
    setEditedDesignation(designation);
    setIsEditing(false);
    showMessage('Updates are cancelled.', 'danger');
  };

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  if (!designation) {
    return <div className="mt-4">Loading...</div>;
  }

  const cardStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // light black transparent background
  };

  return (
    <div className="container mt-5">
      <HeaderComponent />
      {message && (
        <Alert variant={messageType} className="text-center">
          {message}
        </Alert>
      )}

      <div className="card p-4 shadow-lg border rounded-4 main-content">
        <h3 className="mb-4 text-primary text-center">Designation Details</h3>

        <Row>
          {/* ID */}
          <Col md={6} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <Form.Label className="fw-bold text-secondary">ID:</Form.Label>
                <div className="fs-5 mt-1">{designation.masterDesignationId}</div>
              </Card.Body>
            </Card>
          </Col>

          {/* Code */}
          <Col md={6} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <Form.Group>
                  <Form.Label className="fw-bold text-secondary">Code:</Form.Label>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="masterDesignationCode"
                      value={editedDesignation.masterDesignationCode}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  ) : (
                    <div className="fs-5 mt-1">{designation.masterDesignationCode}</div>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Description */}
          <Col md={6} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <Form.Group>
                  <Form.Label className="fw-bold text-secondary">Description:</Form.Label>
                  {isEditing ? (
                    <Form.Control
                      as="textarea"
                      name="designationDescription"
                      value={editedDesignation.designationDescription}
                      onChange={handleChange}
                      className="mt-1"
                      rows={3}
                    />
                  ) : (
                    <div className="fs-5 mt-1">{designation.designationDescription}</div>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Created By */}
          <Col md={6} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <Form.Label className="fw-bold text-secondary">Created By:</Form.Label>
                <div className="fs-5 mt-1">{designation.createdBy}</div>
              </Card.Body>
            </Card>
          </Col>

          {/* Created Date */}
          <Col md={6} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <Form.Label className="fw-bold text-secondary">Created Date:</Form.Label>
                <div className="fs-5 mt-1">{designation.createdDate}</div>
              </Card.Body>
            </Card>
          </Col>

          {/* Modified By */}
          <Col md={6} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <Form.Group>
                  <Form.Label className="fw-bold text-secondary">Modified By:</Form.Label>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="modifiedBy"
                      value={editedDesignation.modifiedBy}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  ) : (
                    <div className="fs-5 mt-1">{designation.modifiedBy}</div>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Modified Date */}
          <Col md={6} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <Form.Label className="fw-bold text-secondary">Modified Date:</Form.Label>
                <div className="fs-5 mt-1">{designation.modifiedDate}</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={() => navigate('/designation')} className="fw-semibold">
            &larr; Back to List
          </Button>

          {isEditing ? (
            <div className="d-flex gap-2">
              <Button variant="success" onClick={handleSave} className="fw-semibold px-4">
                Save
              </Button>
              <Button variant="danger" onClick={handleCancel} className="fw-semibold px-4">
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="warning" onClick={() => setIsEditing(true)} className="fw-semibold px-4 d-flex align-items-center">
              <PencilSquare className="me-2" />
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
