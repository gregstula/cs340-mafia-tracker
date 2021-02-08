import {Container, Form, Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useState } from 'react';

var families = [
  {
    "id": 1,
    "name": "Omerta",
    "memberCount": 2,
    "members": [
      {
        "fname": "Bill",
        "lname": "Omerta",
        "Role": "Godfather"
      },
      {
        "fname": "Matthew",
        "lname": "Omerta",
        "Role": "Captain"
      }
    ],
    "businesses": [
      {
        "name": "USA Industries",
        "address": "1221 Industrial Rd",
        "city": "Newark",
        "state": "New Jersey"
      }
    ],
    "showMembers": false,
    "showBusinesses": false
  },
  {
    "id": 2,
    "name": "Murphy",
    "memberCount": 5,
    "members": [
      {
        "fname": "Brian",
        "lname": "Murphy",
        "Role": "Godfather"
      },
      {
        "fname": "John",
        "lname": "Murphy",
        "Role": "Captain"
      },
      {
        "fname": "Phil",
        "lname": "Murphy",
        "Role": "Captain"
      },
      {
        "fname": "Frank",
        "lname": "Murphy",
        "Role": "Captain"
      },
      {
        "fname": "Alex",
        "lname": "Murphy",
        "Role": "Captain"
      },
      {
        "fname": "Edgar",
        "lname": "Murphy",
        "Role": "Captain"
      }
    ],
    "businesses": [
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
    "showBusinesses": false
  },
  {
    "id": 3,
    "name": "Scott",
    "memberCount": 2,
    "members": [
      {
        "fname": "Michael",
        "lname": "Scott",
        "Role": "Regional Manager"
      },
      {
        "fname": "Dwight",
        "lname": "Shrewt",
        "Role": "Assistant to the Regional Manager"
      }
    ],
    "businesses": [
      {
        "name": "Dunder Mifflin",
        "address": "4120 22nd St",
        "city": "Scranton",
        "state": "Pennsylvania"
      }
    ],
    "showMembers": false,
    "showBusinesses": false
  }
]




function Families() {

  const [membersShown, setMembersShown] = useState(false);
  const [businessesShown, setBusinessesShown] = useState(false);

  function FamilyRow(props) {
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
        <Dropdown.Item as="button" onClick={() => ShowBusinessSubTable(props.index)}>Show Businesses</Dropdown.Item>
        <Dropdown.Item as="button">Update</Dropdown.Item>
        <Dropdown.Item as="button">Delete</Dropdown.Item>
      </DropdownButton>
    );
  }

  function BusinessesToggle(props) {
    if(!families[props.index].showBusinesses)
      return null;
    return (
      <tr>
        <td colSpan="5">
          <BusinessSubTable index={props.index}/>
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

  function ShowBusinessSubTable(index) {
    families[index].showBusinesses = !families[index].showBusinesses;
    setBusinessesShown(!businessesShown);
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
      </Container>
    );
  }


  function BusinessSubTable(props) {
    return (
      <Container>
          <b>Businesses Ownes</b>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Business Name</th>
              <th>Street Address</th>
              <th>City</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              families[props.index].businesses.map(business => (
                <tr>
                  <td>{business.name}</td>
                  <td>{business.address}</td>
                  <td>{business.city}</td>
                  <td>{business.state}</td>
                  <td><Button size="sm" variant="danger" type="delete">Delete</Button></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>
    );
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
                  <BusinessesToggle index={index} />
                </>
              ))
            }
          </tbody>
        </Table>
      </Container>
  );
}


export default Families;
