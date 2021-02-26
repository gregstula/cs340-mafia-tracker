import { Container, Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import { Fragment, useEffect, useState, useRef } from "react";
import Axios from "axios";
import axios from 'axios';


class BusinessForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  // Form validation used to clear form on submit
  // https://github.com/react-bootstrap/react-bootstrap/issues/3730

  // just resets the form input on submit
  handleSubmit = (onClick) => {
    onClick(this.state);
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
              <Form.Control size="sm" type="text" placeholder="Building Number" name="buildingNumber" onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="Street" name="street" onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="City" name="city" onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="State" name="state" onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="Zip" name="zip" onChange={this.handleOnChange} />
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



  const getUrl = 'https://cs340-mafia-server.herokuapp.com/businesses';
  //const getUrl = 'http://localhost:8000/businesses/';

  // Fetched the table data when tableView is changed the whole page reRenders with another Select query
  // using businessList as the second argument causes a loop!!
  useEffect(() => {
    axios.get(getUrl).then(response => setBusinessList(response.data));
  }, [tableView]);


  const addBusiness = (input) => {
    const createUrl = "https://cs340-mafia-server.herokuapp.com/businesses/create";
    //const createUrl = "http://localhost:8000/businesses/create";
    Axios.post(createUrl, {
      businessNameInput: input.businessName,
      buildingNumberInput: input.buildingNumber,
      streetInput: input.street,
      cityInput: input.city,
      stateInput: input.state,
      zipInput: input.zip,
    }).then(() => {
      setTableView([]); // does nothing but forces a reRerender
    });
  };

  // delete handler
  const deleteBusiness = (id) => {
    const deleteUrl = `https://cs340-mafia-server.herokuapp.com/businesses/delete/${id}`
    Axios.delete(deleteUrl).then((response) => {
      setTableView([]);
    });
  };


  // update handler
  const updateBusiness = (id) => {
    console.log();
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
            <BusinessForm type="Update" />
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
    const business = businessList[props.index]
    return (
      <tr>
        <td>{businessList[props.index].businessID}</td>
        <td>{businessList[props.index].businessName}</td>
        <td>{businessList[props.index].buildingNumber}</td>
        <td>{businessList[props.index].streetName}</td>
        <td>{businessList[props.index].city}</td>
        <td>{businessList[props.index].state}</td>
        <td>{businessList[props.index].zip}</td>
        <td>{businessList[props.index].individualOwner}</td>
        <td>{businessList[props.index].familyOwner}</td>
        <td>
          <DropDownBusinessActions business={business} />
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
                <BusinessRow index={index} />
              </Fragment>
            ))
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default Businesses;
