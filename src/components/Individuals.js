//
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import Actions from './Actions';
import Table from 'react-bootstrap/Table';

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import React, { useState } from 'react';


var people = [
  {
    "id":1,
    "fname":"Bill",
    "lname":"Omerta",
    "age":40,
    "mafiaFamily":"Omerta",
    "mafiaRole":"Godfater",
    "showLawsBroken":false,
    "showBusinesses":false,
    "lawsBroken": [
      {
        "lawName":"murder",
        "sentence":"death"
      },
      {
        "lawName":"blackmail",
        "sentence":"$50 fine"
      }
    ],
    "businesses":[
      {
        "name":"The Gomorrah",
        "number":"34587",
        "streetName":"Highway way",
        "city":"Paris",
        "state":"yes",
        "zip":"34587",
        "familyOwner":"Omerta"
      },
      {
        "name":"The Laundry place",
        "number":"38367",
        "streetName":"Street Way",
        "city":"Helvetica",
        "state":"no",
        "zip":"34587",
        "familyOwner":""
      }
    ]
  },
  {
    "id":2,
    "fname":"Bob",
    "lname":"Odenkirk",
    "age":45,
    "mafiaFamily":"",
    "mafiaRole":"",
    "showLawsBroken":false,
    "showBusinesses":false,
    "lawsBroken": [
      {
        "lawName":"Drug smuggling",
        "sentence":"10 years"
      },
      {
        "lawName":"Forgery",
        "sentence":"death"
      }
    ],
    "businesses":[
      {
        "name":"Better Call Saul",
        "number":"34587",
        "streetName":"Highway way",
        "city":"Paris",
        "state":"yes",
        "zip":"34587",
        "familyOwner":""
      }
    ]
  },
  {
    "id":3,
    "fname":"Elon",
    "lname":"Musk",
    "age":49,
    "mafiaFamily":"",
    "mafiaRole":"",
    "showLawsBroken":false,
    "showBusinesses":false,
    "lawsBroken": [],
    "businesses":[
      {
        "name":"SpaceX",
        "number":"34587",
        "streetName":"Highway way",
        "city":"Paris",
        "state":"yes",
        "zip":"34587",
        "familyOwner":""
      },
      {
        "name":"Tesla",
        "number":"38367",
        "streetName":"Street Way",
        "city":"Helvetica",
        "state":"no",
        "zip":"34587",
        "familyOwner":""
      }
    ]
  }
];


function Individuals() {

  const [lawsBrokenShown, setLawsBrokenShown] = useState(false);
  const [businessesOwnedShown, setBusinessesOwnedShown] = useState(false);


  function PersonRow(props) {
    return (
        <tr>
          <td>{people[props.index].id}</td>
          <td>{people[props.index].fname}</td>
          <td>{people[props.index].lname}</td>
          <td>{people[props.index].age}</td>
          <td>{people[props.index].mafiaFamily}</td>
          <td>{people[props.index].mafiaRole}</td>
          <td>
            <DropDownPersonActions index={props.index}/>
          </td>
        </tr>
    );
  }


  function LawsBroken(props) {
    if(!people[props.index].showLawsBroken)
      return null;
    return (
      <tr>
        <td colSpan="7">
              <b>Laws broken</b>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sentence</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    people[props.index].lawsBroken.map(law => (
                      <tr>
                        <td>{law.lawName}</td>
                        <td>{law.sentence}</td>
                        <td><Button size="sm" variant="danger" type="delete">Delete</Button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <Form>
                <Form.Control size="m" type="text" placeholder="Search for existing law to add to add to this person's list of broken laws" />
              </Form>
        </td>
      </tr>
    );
  }


  function BusinessesOwned(props) {
    if(!people[props.index].showBusinesses)
      return null;
    return (
      <tr>
        <td colSpan="7">
              <b>Businesses owned</b>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>street Name</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Family owner</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    people[props.index].businesses.map(business => (
                      <tr>
                        <td>{business.name}</td>
                        <td>{business.number}</td>
                        <td>{business.streetName}</td>
                        <td>{business.city}</td>
                        <td>{business.state}</td>
                        <td>{business.zip}</td>
                        <td>{business.familyOwner}</td>
                        <td><Button size="sm" variant="danger" type="delete">Delete</Button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <Form>
                <Form.Control size="m" type="text" placeholder="Search for existing business to add to businesses owned by this person" />
              </Form>
        </td>
      </tr>
    );
  }


  function DropDownPersonActions (props) {
    return (
      <DropdownButton id="dropdown-item-button" title="Actions">
        <Dropdown.Item as="button" onClick={() => ShowLawsBrokenSubTable(props.index)}>Show laws broken</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => ShowBusinessesSubTable(props.index)}>Show businesses owned</Dropdown.Item>
        <Dropdown.Item as="button">Update</Dropdown.Item>
        <Dropdown.Item as="button">Delete</Dropdown.Item>
      </DropdownButton>
    );
  }


  function ShowLawsBrokenSubTable(index) {
    people[index].showLawsBroken = !people[index].showLawsBroken;
    setLawsBrokenShown(!lawsBrokenShown);
  }

  function ShowBusinessesSubTable(index) {
    people[index].showBusinesses = !people[index].showBusinesses;
    setBusinessesOwnedShown(!businessesOwnedShown);
  }


   return (
    <Container fluid>
      <h1>Individuals</h1>

      <Form>
        <Form.Row>
          <Col>
            <Form.Control size="m" type="text" placeholder="Search" />
          </Col>
          <Col>
            <Button type="search">Search</Button>
          </Col>
        </Form.Row>
      </Form>

      <p></p>

      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Mafia Family</th>
            <th>Mafia Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          <tr>
              <td>Auto</td>
            <td>
              <Form>
                <Form.Control size="m" type="text" placeholder="First Name" />
              </Form>
            </td>
            <td>
              <Form>
                <Form.Control size="m" type="text" placeholder="Last Name" />
              </Form>
            </td>
            <td>
              <Form>
                <Form.Control size="m" type="text" placeholder="Age" />
              </Form>
            </td>
            <td>
              <Form>
                <Form.Control size="m" type="text" placeholder="Mafia Family" />
              </Form>
            </td>
            <td>
              <Form>
                <Form.Control size="m" type="text" placeholder="Mafia Role" />
              </Form>
            </td>
            <td>
              <Button size="sm" type="submit">Create</Button>
            </td>
          </tr>

          {
            people.map((person, index) => (
              <React.Fragment>
                <PersonRow index={index} />
                <LawsBroken index={index} />
                <BusinessesOwned index={index} />
              </React.Fragment>
            ))
          }

        </tbody>
      </Table>
    </Container>
  );
}





export default Individuals;


// <div>
//   <Form>
//     <Form.Label>First Name</Form.Label>
//     <Form.Control size="lg" type="text" placeholder="First Name" />
//     <Form.Label>Last Name</Form.Label>
//     <Form.Control size="lg" type="text" placeholder="Last Name" />
//     <Form.Label>Age</Form.Label>
//     <Form.Control size="lg" type="text" placeholder="Age" />
//     <Form.Label>Mafia Family</Form.Label>
//     <Form.Control size="lg" type="text" placeholder="Family" />
//     <Form.Label>Mafia Role</Form.Label>
//     <Form.Control size="lg" type="text" placeholder="Role" />
//   </Form>
//  <Button type="submit">Submit</Button>
// </div>
