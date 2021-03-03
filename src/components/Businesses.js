import { Container, Form, Button, Row, Col, Table, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
//import Table from 'react-bootstrap/Table';
import React from 'react';
//import Dropdown from 'react-bootstrap/Dropdown';
//import DropdownButton from 'react-bootstrap/DropdownButton';
//import Modal from 'react-bootstrap/Modal';
import { Fragment, useEffect, useState, useRef } from "react";
import Axios from "axios";
import axios from 'axios';

// Component for business form
// Much more effecient at handling state and saving render calls
// Can also be used in Update Component
class BusinessForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ...this.props.data };
  }

  // just resets the form input on submit
  handleSubmit = (onClick) => {
    if (this.state.businessID) {
      onClick(this.state.businessID, this.state)
    } else {
      onClick(this.state);
    }
  }

  handleOnChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    return (
      <>
        <Form  >
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="Name" name="businessName" value={this.state.businessName} onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="Building Number" name="buildingNumber" value={this.state.buildingNumber} onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="Street" name="streetName" value={this.state.streetName} onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="City" name="city" value={this.state.city} onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="State" name="state" value={this.state.state} onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="Zip" name="zip" value={this.state.zip} onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Button type="submit" onClick={() => this.handleSubmit(this.props.onClick)}>{this.props.type}</Button>
            </Form.Group>
          </Form.Row>
        </ Form>
      </>
    );
  }
}

function Businesses() {

  const [businessList, setBusinessList] = useState([]);
  const [tableView, setTableView] = useState([]);

  //const baseUrl = 'https://cs340-mafia-server.herokuapp.com/businesses';
  const baseUrl = 'http://localhost:8000/businesses';

  const getUrl = baseUrl;

  // Fetched the table data when tableView is changed the whole page reRenders with another Select query
  // using businessList as the second argument causes a loop!!
  useEffect(() => {
    axios.get(getUrl).then(response => setBusinessList(response.data));
  }, [tableView]);


  const addBusiness = (input) => {
    const createUrl = baseUrl + "/create";
    Axios.post(createUrl, input).then(() => {
      setTableView([]); // does nothing but forces a reRerender
    });
  };

  // delete handler
  const deleteBusiness = (id) => {
    const deleteUrl = baseUrl + `/delete/${id}`
    Axios.delete(deleteUrl).then((response) => {
      setTableView([]);
    });
  };


  // update handler
  const updateBusiness = (id, input) => {
    const updateUrl = baseUrl + `/update/${id}`;
    axios.put(updateUrl, input ).then(response => setTableView([]));
  };

  function DropDownBusinessActions(props) {
    return (
      <DropdownButton id="dropdown-item-button" title="Actions">
        <Dropdown.Item as={UpdateModal} business={props.business} />
        <Dropdown.Item as="button" onClick={() => deleteBusiness(props.business.businessID)}>Delete</Dropdown.Item>
      </DropdownButton>
    );
  }

  // Modal pop up form for update form submission
  function UpdateModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Dropdown.Item as='button' onClick={handleShow}>
          Update
        </Dropdown.Item>

        <Modal
          size="xl"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update {props.business.businessName} ID: {props.business.businessID}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BusinessForm type="Update" onClick={updateBusiness} data={props.business} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


  function BusinessRow(props) {
    return (
      <tr>
        <td>{props.business.businessID}</td>
        <td>{props.business.businessName}</td>
        <td>{props.business.buildingNumber}</td>
        <td>{props.business.streetName}</td>
        <td>{props.business.city}</td>
        <td>{props.business.state}</td>
        <td>{props.business.zip}</td>
        <td>{props.business.individualOwner}</td>
        <td>{props.business.familyOwner}</td>
        <td>
          <DropDownBusinessActions business={props.business} />
        </td>
      </tr>
    );
  }


  return (
    <Container fluid>
      <h1>Businesses</h1>
      <BusinessForm type="Create" onClick={addBusiness} />
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Number</th>
            <th>Street Name</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Owner</th>
            <th>Family</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            businessList.map((business, index) => (
              <Fragment key={business.businessID}>
                <BusinessRow business={business} />
              </Fragment>
            ))
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default Businesses;
