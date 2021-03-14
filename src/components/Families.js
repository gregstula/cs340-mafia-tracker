import { Container, Form, Button, Row, Col, Table, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import React from 'react';
import { Fragment, useEffect, useState, useRef } from "react";
import Axios from "axios";
import axios from 'axios';
import serverUrl from './serverUrl';

// Component for family form
// Much more effecient at handling state and saving render calls
// Can also be used in Update Component
class FamilyForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ...this.props.data };
  }

  // just resets the form input on submit
  handleSubmit = (onClick) => {
    if (this.state.familyID) {
      onClick(this.state.familyID, this.state)
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
              <Form.Control size="sm" type="text" placeholder="Name" name="familyName" value={this.state.familyName} onChange={this.handleOnChange} />
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

function Families() {

  const [familyList, setfamilyList] = useState([]);
  const [tableView, setTableView] = useState([]);

  const baseUrl = serverUrl('families');

  // Fetched the table data when tableView is changed the whole page reRenders with another Select query
  // using familyList as the second argument causes a loop!!
  useEffect(() => {
    axios.get(baseUrl).then(response => setfamilyList(response.data));
  }, [tableView]);


  const addfamily = (input) => {
    const createUrl = baseUrl + "/create";
    Axios.post(createUrl, input).then(() => {
      setTableView([]); // does nothing but forces a reRerender
    });
  };

  // delete handler
  const deletefamily = (id) => {
    const deleteUrl = baseUrl + `/delete/${id}`
    Axios.delete(deleteUrl).then((response) => {
      setTableView([]);
    });
  };


  // update handler
  const updatefamily = (id, input) => {
    const updateUrl = baseUrl + `/update/${id}`;
    axios.put(updateUrl, input ).then(response => setTableView([]));
  };

  function DropDownfamilyActions(props) {
    return (
      <DropdownButton id="dropdown-item-button" title="Actions">
        <Dropdown.Item as={UpdateModal} family={props.family} />
        <Dropdown.Item as="button" onClick={() => deletefamily(props.family.familyID)}>Delete</Dropdown.Item>
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
            <Modal.Title>Update {props.family.familyName} ID: {props.family.familyID}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FamilyForm type="Update" onClick={updatefamily} data={props.family} />
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


  function FamilyRow(props) {
    return (
      <tr>
        <td>{props.family.familyID}</td>
        <td>{props.family.familyName}</td>
        <td>{props.family.memberCount}</td>
        <td>
          <DropDownfamilyActions family={props.family} />
        </td>
      </tr>
    );
  }


  return (
    <Container fluid>
      <h1>Families</h1>
      <FamilyForm type="Create" onClick={addfamily} />
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Member Count</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            familyList.map((family, index) => (
              <Fragment key={family.familyID}>
                <FamilyRow family={family} />
              </Fragment>
            ))
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default Families;


{/* var families = [
  {
    "id": 1,
    "name": "Omerta",
    "memberCount": 2,
    "members": [
      {
        "fname": "Bill",
        "lname": "Omerta",
        "role": "Godfather"
      },
      {
        "fname": "Matthew",
        "lname": "Omerta",
        "role": "Captain"
      }
    ],
    "familyes": [
      {
        "name": "USA Industries",
        "address": "1221 Industrial Rd",
        "city": "Newark",
        "state": "New Jersey"
      }
    ],
    "showMembers": false,
    "showfamilyes": false,
    "editMode":false
  },
  {
    "id": 2,
    "name": "Murphy",
    "memberCount": 5,
    "members": [
      {
        "fname": "Brian",
        "lname": "Murphy",
        "role": "Godfather"
      },
      {
        "fname": "John",
        "lname": "Murphy",
        "role": "Captain"
      },
      {
        "fname": "Phil",
        "lname": "Murphy",
        "role": "Captain"
      },
      {
        "fname": "Frank",
        "lname": "Murphy",
        "role": "Captain"
      },
      {
        "fname": "Alex",
        "lname": "Murphy",
        "role": "Captain"
      },
      {
        "fname": "Edgar",
        "lname": "Murphy",
        "role": "Captain"
      }
    ],
    "familyes": [
      {
        "name": "Domino's",
        "address": "54232 NW Road Blvd",
        "city": "Corvallis",
        "state": "Oregon"
      },
      {
        "name": "Pizza Hut",
        "address": "812 East Blvd",
        "city": "Corvallis",
        "state": "Oregon"
      }
    ],
    "showMembers": false,
    "showfamilyes": false,
    "editMode":false
  },
  {
    "id": 3,
    "name": "Scott",
    "memberCount": 2,
    "members": [
      {
        "fname": "Michael",
        "lname": "Scott",
        "role": "Regional Manager"
      },
      {
        "fname": "Dwight",
        "lname": "Shrewt",
        "role": "Assistant to the Regional Manager"
      }
    ],
    "familyes": [
      {
        "name": "Dunder Mifflin",
        "address": "4120 22nd St",
        "city": "Scranton",
        "state": "Pennsylvania"
      }
    ],
    "showMembers": false,
    "showfamilyes": false,
    "editMode":false
  }
]




function Families() {

  const [membersShown, setMembersShown] = useState(false);
  const [familyesShown, setfamilyesShown] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function FamilyRow(props) {
    if(families[props.index].editMode)
      return(
        <tr>
          <td>{families[props.index].id}</td>
          <td>
            <Form>
              <Form.Control size="m" type="text" value={families[props.index].name} />
            </Form>
          </td>
          <td>#</td>
          <td><Button type="submit" onClick={() => toggleEditMode(props.index)}>Submit</Button></td>
        </tr>
      );
    else
      return (
          <tr>
            <td>{families[props.index].id}</td>
            <td>{families[props.index].name}</td>
            <td>{families[props.index].memberCount}</td>
            <td>
              <DropDownFamilyActions index={props.index}/>
            </td>
          </tr>
      );
  }


  function DropDownFamilyActions (props) {
    return (
      <DropdownButton id="dropdown-item-button" title="Actions">
        <Dropdown.Item as="button" onClick={() => ShowMembersSubTable(props.index)}>Show Members</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => ShowfamilySubTable(props.index)}>Show familyes</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => toggleEditMode(props.index)}>Update</Dropdown.Item>
        <Dropdown.Item as="button">Delete</Dropdown.Item>
      </DropdownButton>
    );
  }

  function familyesToggle(props) {
    if(!families[props.index].showfamilyes)
      return null;
    return (
      <tr>
        <td colSpan="5">
          <familySubTable index={props.index}/>
        </td>
      </tr>
    );
  }

  function MembersToggle(props) {
    if(!families[props.index].showMembers)
      return null;
    return (
      <tr>
        <td colSpan="5">
          <MembersSubTable index={props.index}/>
        </td>
      </tr>
    );
  }

  function ShowMembersSubTable(index) {
    families[index].showMembers = !families[index].showMembers;
    setMembersShown(!membersShown);
  }

  function ShowfamilySubTable(index) {
    families[index].showfamilyes = !families[index].showfamilyes;
    setfamilyesShown(!familyesShown);
  }

  function MembersSubTable(props) {
    return (
      <Container>
          <b>Members</b>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              families[props.index].members.map(member => (
                <tr>
                  <td>{member.fname}</td>
                  <td>{member.lname}</td>
                  <td>{member.role}</td>
                  <td><Button size="sm" variant="danger" type="delete">Delete</Button></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Form>
          <Form.Control size="m" type="text" placeholder="Search for existing member to add to family" />
        </Form>
      </Container>
    );
  }

  function familySubTable(props) {
    return (
      <Container>
          <b>familyes Ownes</b>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>family Name</th>
              <th>Street Address</th>
              <th>City</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              families[props.index].familyes.map(family => (
                <tr>
                  <td>{family.name}</td>
                  <td>{family.address}</td>
                  <td>{family.city}</td>
                  <td>{family.state}</td>
                  <td><Button size="sm" variant="danger" type="delete">Delete</Button></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Form>
          <Form.Control size="m" type="text" placeholder="Search for existing family to add to familyes owned by this family" />
        </Form>
      </Container>
    );
  }

  function toggleEditMode(index) {
    families[index].editMode = !families[index].editMode;
    setEditMode(!editMode);
  }

  return (
    <Container fluid>
    <h1>Families</h1>
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th># of members</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          <tr>
              <td>Input new family</td>
            <td>
              <Form>
                <Form.Control size="lg" type="text" placeholder="Name" />
              </Form>
            </td>
            <td>#</td>
            <td>
              <Button type="submit">Create</Button>
            </td>
          </tr>
          {
            families.map((family, index) => (
              <>
                <FamilyRow index={index} />
                <MembersToggle index={index} />
                <familyesToggle index={index} />
              </>
            ))
          }
        </tbody>
      </Table>
    </Container>
  );
}


export default Families; */}
