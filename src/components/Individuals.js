import {Container, Form, Row, Col, Button, Table, Dropdown, DropdownButton} from 'react-bootstrap';
import Actions from './Actions';
//import Table from 'react-bootstrap/Table';

//import Dropdown from 'react-bootstrap/Dropdown'
//import DropdownButton from 'react-bootstrap/DropdownButton'

import React, { Fragment, useEffect, useState, useRef } from 'react';

import Axios from "axios";
import axios from 'axios';


/* var people = [
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
]; */


class IndividualForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ...this.props.data };
  }
  // Form validation used to clear form on submit
  // https://github.com/react-bootstrap/react-bootstrap/issues/3730

  // just resets the form input on submit
  handleSubmit = (onClick) => {
    if (this.state.individualID) {
      onClick(this.state.individualID, this.state)
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
              <Form.Control size="sm" type="text" placeholder="First name" name="firstName" value={this.state.firstName} onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="Last name" name="lastName" value={this.state.lastName} onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="Age" name="age" value={this.state.age} onChange={this.handleOnChange} />
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


function Individuals() {

  const [individualList, setIndividualList] = useState([]);
  //const [lawsBrokenShown, setLawsBrokenShown] = useState(false);
  //const [businessesOwnedShown, setBusinessesOwnedShown] = useState(false);
  const [tableView, setTableView] = useState([]);
  
  //const baseUrl = 'https://cs340-mafia-server.herokuapp.com/individuals';
  const baseUrl = 'http://localhost:8000/individuals';
  
  const getUrl = baseUrl;
  
  useEffect(() => {
    axios.get(getUrl).then(response => setIndividualList(response.data));
  }, [tableView]);


  function PersonRow(props) {
    return (
        <tr>
          <td>{props.person.individualID}</td>
          <td>{props.person.firstName}</td>
          <td>{props.person.lastName}</td>
          <td>{props.person.age}</td>
          <td>{props.person.mafiaFamily}</td>
          <td>{props.person.mafiaRole}</td>
          <td>
            <DropDownPersonActions person={props.person}/>
          </td>
        </tr>
    );
  }


  /* function LawsBroken(props) {
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
  } */


  /* function BusinessesOwned(props) {
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
  } */


  function DropDownPersonActions (props) {
	  //<Dropdown.Item as="button" onClick={() => ShowLawsBrokenSubTable(props.index)}>Show laws broken</Dropdown.Item>
      //<Dropdown.Item as="button" onClick={() => ShowBusinessesSubTable(props.index)}>Show businesses owned</Dropdown.Item>
    return (
      <DropdownButton id="dropdown-item-button" title="Actions">
        <Dropdown.Item as={UpdateModal} person={props.person} />
        <Dropdown.Item as="button" onClick={() => deleteIndividual(props.person.IndividualID)}>Delete</Dropdown.Item>
      </DropdownButton>
    );
  }


  /* function ShowLawsBrokenSubTable(index) {
    people[index].showLawsBroken = !people[index].showLawsBroken;
    setLawsBrokenShown(!lawsBrokenShown);
  } */

  /* function ShowBusinessesSubTable(index) {
    people[index].showBusinesses = !people[index].showBusinesses;
    setBusinessesOwnedShown(!businessesOwnedShown);
  } */

  const addIndividual = (input) => {
	const createUrl = baseUrl + "/create";
	Axios.post(createUrl, input).then(() => {
      setTableView([]); // does nothing but forces a reRerender
    });
  }

  function UpdateModal(props) {
    console.log("updating person with individualID = " + props.person.individualID);
  }
  
  const deleteIndividual = (id) => {
	console.log("deleting person with individualID = " + id);  
  };

	//<LawsBroken index={index} />
    //<BusinessesOwned index={index} />

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
	  
	  <IndividualForm type="Create" onClick={addIndividual} />
	  
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

          {
            individualList.map((person, index) => (
              <Fragment key={person.individualID}>
                <PersonRow person={person} />
              </Fragment>
            ))
          }

        </tbody>
      </Table>
    </Container>
  );
}





export default Individuals;