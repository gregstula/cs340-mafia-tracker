
import { Container, Form, Button, Row, Col, Table, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import React from 'react';
import { Fragment, useEffect, useState, useRef } from "react";
import Axios from "axios";
import axios from 'axios';
import serverUrl from './serverUrl';

// Component for law form
// Much more effecient at handling state and saving render calls
// Can also be used in Update Component
class LawForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ...this.props.data };
  }

  // just resets the form input on submit
  handleSubmit = (onClick) => {
    if (this.state.lawID) {
      onClick(this.state.lawID, this.state)
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
              <Form.Control size="sm" type="text" placeholder="Name" name="lawName" value={this.state.lawName} onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="Sentence" name="sentence" value={this.state.sentence} onChange={this.handleOnChange} />
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

function Laws() {

  const [lawList, setlawList] = useState([]);
  const [tableView, setTableView] = useState([]);

  const baseUrl = serverUrl('Laws');

  // Fetched the table data when tableView is changed the whole page reRenders with another Select query
  // using lawList as the second argument causes a loop!!
  useEffect(() => {
    axios.get(baseUrl).then(response => setlawList(response.data));
  }, [tableView]);


  const addlaw = (input) => {
    const createUrl = baseUrl + "/create";
    Axios.post(createUrl, input).then(() => {
      setTableView([]); // does nothing but forces a reRerender
    });
  };

  // delete handler
  const deletelaw = (id) => {
    const deleteUrl = baseUrl + `/delete/${id}`
    Axios.delete(deleteUrl).then((response) => {
      setTableView([]);
    });
  };


  // update handler
  const updatelaw = (id, input) => {
    const updateUrl = baseUrl + `/update/${id}`;
    axios.put(updateUrl, input).then(response => setTableView([]));
  };

  function DropDownLawActions(props) {
    return (
      <DropdownButton id="dropdown-item-button" title="Actions">
        <Dropdown.Item as="button" onClick={() => null}>Show/Hide Law Breakers</Dropdown.Item>
        <Dropdown.Item as={UpdateModal} law={props.law} />
        <Dropdown.Item as="button" onClick={() => deletelaw(props.law.lawID)}>Delete</Dropdown.Item>
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
            <Modal.Title>Update {props.law.lawName} ID: {props.law.lawID}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LawForm type="Update" onClick={updatelaw} data={props.law} />
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


  function LawRow(props) {
    return (
      <tr>
        <td>{props.law.lawID}</td>
        <td>{props.law.lawName}</td>
        <td>{props.law.sentence}</td>
        <td>
          <DropDownLawActions law={props.law} />
        </td>
      </tr>
    );
  }


  return (
    <Container fluid>
      <h1>Laws</h1>
      <LawForm type="Create" onClick={addlaw} />
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Sentence</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            lawList.map((law, index) => (
              <Fragment key={law.lawID}>
                <LawRow law={law} />
              </Fragment>
            ))
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default Laws;
