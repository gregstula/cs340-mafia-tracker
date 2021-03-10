import {Container, Form, Row, Col, Button, Table, Dropdown, DropdownButton, Modal} from 'react-bootstrap';
import Actions from './Actions';

import React, { Fragment, useEffect, useState, useRef } from 'react';

import Axios from "axios";
import axios from 'axios';

import serverUrl from './serverUrl';


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

  // just resets the form input on submit
  handleSubmit = (onClick) => {
    if (this.state.individualID) {
      onClick(this.state.individualID, this.state) //since individualID is available, we're updating something
    } else {
      onClick(this.state); //since individualID is unavailable, we're making a new individual
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


var showingBusinesses = [];

function Individuals() {

  const [individualList, setIndividualList] = useState([]);
  //const [showingBusinesses, setShowingBusinesses] = useState([]);
  const [tableView, setTableView] = useState([]);

  const baseUrl = serverUrl("individuals");

  useEffect(() => {
    axios.get(baseUrl).then(response => setIndividualList(response.data));
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


  function GetBusinessesOwned(personID) {
    //find the guy we're looking for, adding him if he doesn't exist
    var index = showingBusinesses.findIndex((val) => {return val.personID == personID})
    if(index < 0)
    {
      //setShowingBusinesses(showingBusinesses.concat({"personID": personID, "businessesOwned": []}));
      showingBusinesses.push({"personID": personID, "businessesOwned": []});
      index = showingBusinesses.length - 1;

      Axios.get(baseUrl + `/getBusinesses/${personID}`).then(response => {

        showingBusinesses[index].businessesOwned = response.data;
        //now that we're finished, rerender;
        setTableView([]);
      });
    }
    else //if he already exists, just remove him
    {
      console.log("index for removal = " + index);
      //setShowingBusinesses(showingBusinesses.slice(0,index).concat(showingBusinesses.slice(index + 1)));
      showingBusinesses.splice(index, 1);
      //now that we're finished, rerender;
      setTableView([]);
    }
  }

  function PrintBusinessesOwned(props) {
    //console.log(showingBusinesses);
    var index = showingBusinesses.findIndex((val) => {return val.personID == props.person.individualID});
    if(index < 0)
      return null;

    var businessesList = showingBusinesses[index].businessesOwned;

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
                    businessesList.map(business => (
                      <tr>
                        <td>{business.businessName}</td>
                        <td>{business.buildingNumber}</td>
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
    //<Dropdown.Item as="button" onClick={() => ShowLawsBrokenSubTable(props.index)}>Show laws broken</Dropdown.Item>
    return (
      <DropdownButton id="dropdown-item-button" title="Actions">
        <Dropdown.Item as="button" onClick={() => GetBusinessesOwned(props.person.individualID)}>Show businesses owned</Dropdown.Item>
        <Dropdown.Item as={UpdateModal} person={props.person} />
        <Dropdown.Item as="button" onClick={() => deleteIndividual(props.person.individualID)}>Delete</Dropdown.Item>
      </DropdownButton>
    );
  }


  const addIndividual = (input) => {
  	const createUrl = baseUrl + "/create";
  	Axios.post(createUrl, input).then(() => {
      setTableView([]); // does nothing but forces a reRerender
    });
  }

  function UpdateModal(props) {
	   const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Dropdown.Item as='button' onClick={handleShow}>
          Update
        </Dropdown.Item>

        <Modal size="xl" show={show} onHide={handleClose} backdrop="static" keyboard={true}>
          <Modal.Header closeButton>
            <Modal.Title>Update {props.person.firstName + " " + props.person.lastName} ID: {props.person.individualID}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <IndividualForm type="Update" onClick={updateIndividual} data={props.person} />
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

  const updateIndividual = (id, input) => {
    const updateUrl = baseUrl + `/update/${id}`;
    axios.put(updateUrl, input ).then(response => setTableView([]));
  };

  const deleteIndividual = (id) => {
	   const deleteUrl = baseUrl + `/delete/${id}`
    Axios.delete(deleteUrl).then((response) => {
      setTableView([]);
    });
  };

	//<LawsBroken index={index} />

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
                <PrintBusinessesOwned person={person} />
              </Fragment>
            ))
          }

        </tbody>
      </Table>
    </Container>
  );
}





export default Individuals;
