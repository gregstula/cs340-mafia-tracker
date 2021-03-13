import {Container, Form/*, Row*/, Col, Button, Table, Dropdown, DropdownButton, Modal} from 'react-bootstrap';
//import Actions from './Actions';

import React, { Fragment, useEffect, useState/*, useRef*/ } from 'react';

import Axios from "axios";
import axios from 'axios';

import serverUrl from './serverUrl';


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
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="Mafia family (exact)" name="mafiaFamily" value={this.state.mafiaFamily} onChange={this.handleOnChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control size="sm" type="text" placeholder="Role in family" name="mafiaRole" value={this.state.mafiaRole} onChange={this.handleOnChange} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
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
var showingLawsBroken = [];

function Individuals() {

  const [individualList, setIndividualList] = useState([]);
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
          <td>{props.person.familyName}</td>
          <td>{props.person.mafiaRole}</td>
          <td>
            <DropDownPersonActions person={props.person}/>
          </td>
        </tr>
    );
  }


  function GetBusinessesOwned(personID) {
    //find the guy we're looking for, adding him if he doesn't exist
    var index = showingBusinesses.findIndex((val) => {return val.personID == personID})
    if(index < 0)
    {
      showingBusinesses.push({"personID": personID, "businessesOwned": [], "addableBusinesses": []});
      index = showingBusinesses.length - 1;

      Axios.get(baseUrl + `/getBusinesses/${personID}`).then(response => {
        showingBusinesses[index].businessesOwned = response.data;
        //now that we're finished, rerender;
        setTableView([]);
      });
    }
    else //if he already exists, just remove him
    {
      showingBusinesses.splice(index, 1);

      //now that we're finished, rerender;
      setTableView([]);
    }
  }

  function PrintBusinessesOwned(props) {
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
                        <td>{business.familyName}</td>
                        <td><Button size="sm" variant="danger" type="delete" onClick={() => SetBusinessOwnerToNull(business.businessID)}>Delete</Button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <Form>
                <Form.Control
                  size="m"
                  type="text"
                  onChange={(input) => {
                    if(input.target.value) {
                      GetAddableBusinesses(input.target.value, index)
                    }
                    else {
                      showingBusinesses[index].addableBusinesses = [];
                    }
                  }}
                  placeholder="Search for existing business to add to businesses owned by this person"
                />
              </Form>
              <Button size="sm" type="search" onClick={() => {
                  setTableView([]);
                }}>Search</Button>
              <Button size="sm" variant="danger" type="delete" onClick={() => {
                  showingBusinesses[index].addableBusinesses = [];
                  setTableView([]);
                }}>Clear Results</Button>
              <DisplayAddableBusinesses index={index}/>
        </td>
      </tr>
    );
  }

  function GetAddableBusinesses(searchInput, index) {

    Axios.get(baseUrl + `/searchBusinesses/${searchInput}`).then(response => {
      showingBusinesses[index].addableBusinesses = response.data;
      //setTableView([]);
    });
  }

  function DisplayAddableBusinesses(props) {

    var index = props.index;

    if(showingBusinesses[index].addableBusinesses.length == 0)
      return null;

    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>Business Name</th>
            <th>City</th>
            <th>State</th>
            <th>Current Owner</th>
            <th>Family Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{
          showingBusinesses[index].addableBusinesses.map(business => {
            var fName = business.firstName;
            var lName = business.lastName;
            if(!fName)
              fName = "";
            else
              lName = " " + lName;
            if(!lName)
              lName = "";

            return (
              <tr>
                <td>{business.businessName}</td>
                <td>{business.city}</td>
                <td>{business.state}</td>
                <td>{fName + lName}</td>
                <td>{business.familyName}</td>
                <td><Button size="sm" type="submit" onClick={() => SetBusinessOwner(business.businessID, showingBusinesses[index].personID)}>Add</Button></td>
              </tr>
            )
          })
        }</tbody>
      </Table>
    );
  }

  function SetBusinessOwner(businessID, personID) {
    const businessUrl = baseUrl + `/setBusinessOwner/${businessID}/${personID}`;

    //if that business was already owned, we need to remove it from the previous owner's businessesOwned
    showingBusinesses.map(person => {
      var businessIndex = person.businessesOwned.findIndex(business => {return business.businessID == businessID});
      if(businessIndex >= 0) {
        //we've got it, so remove it
        person.businessesOwned.splice(businessIndex, 1);
        //return true so that we stop looking
        return true;
      }
      else {
        return false;
      }
    });

    Axios.put(businessUrl).then(resonse => {
      Axios.get(baseUrl + `/getBusinesses/${personID}`).then(response => {
        var index = showingBusinesses.findIndex((val) => {return val.personID == personID});
        showingBusinesses[index].businessesOwned = response.data;
        //now that we're finished, rerender;
        setTableView([]);
      });
    });
  }

  function SetBusinessOwnerToNull(id) {
    const setBusinessOwnerToNullUrl = baseUrl + `/setBusinessOwnerToNull/${id}`;
    Axios.put(setBusinessOwnerToNullUrl).then((response) => {
      //the things removed from the database, we just need to remove it from the array
      showingBusinesses.map((person) => {
        var i = person.businessesOwned.findIndex((businessVal) => {return businessVal.businessID == id});
        if(i >= 0)
          person.businessesOwned.splice(i, 1);

        return i;
      });

      setTableView([]); //rerender now that the thing in the array has been removed
    });
  }


  function GetLawsBroken(personID) {
    //find the guy we're looking for, adding him if he doesn't exist
    var index = showingLawsBroken.findIndex((val) => {return val.personID == personID})
    if(index < 0)
    {
      showingLawsBroken.push({"personID": personID, "lawsBroken": [], "breakableLaws": []});
      index = showingLawsBroken.length - 1;

      Axios.get(baseUrl + `/getLawsBroken/${personID}`).then(response => {
        showingLawsBroken[index].lawsBroken = response.data;
        //now that we're finished, rerender;
        setTableView([]);
      });
    }
    else //if he already exists, just remove him
    {
      showingLawsBroken.splice(index, 1);

      //now that we're finished, rerender;
      setTableView([]);
    }
  }

  function PrintLawsBroken(props) {
    var index = showingLawsBroken.findIndex((val) => {return val.personID == props.person.individualID});

    if(index < 0)
      return null;

    var lawsList = showingLawsBroken[index].lawsBroken;

    return (
      <tr>
        <td colSpan="7">
              <b>Laws broken</b>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Law Name</th>
                    <th>Sentence</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    lawsList.map(law => (
                      <tr>
                        <td>{law.lawName}</td>
                        <td>{law.sentence}</td>
                        <td><Button size="sm" variant="danger" type="delete" onClick={() => UnBreakLaw(law.lawID, props.person.individualID)}>Delete</Button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <Form>
                <Form.Control
                  size="m"
                  type="text"
                  onChange={(input) => {
                    if(input.target.value) {
                      GetBreakableLaws(input.target.value, index)
                    }
                    else {
                      showingLawsBroken[index].breakableLaws = [];
                    }
                  }}
                  placeholder="Search for existing laws to add to list of laws broken by this person"
                />
              </Form>
              <Button size="sm" type="search" onClick={() => {
                  setTableView([]);
                }}>Search</Button>
              <Button size="sm" variant="danger" type="delete" onClick={() => {
                  showingLawsBroken[index].breakableLaws = [];
                  setTableView([]);
                }}>Clear Results</Button>
              <PrintBreakableLaws index={index}/>
        </td>
      </tr>
    );
  }

  function GetBreakableLaws(searchInput, index) {
    Axios.get(baseUrl + `/searchLaws/${searchInput}`).then(response => {
      showingLawsBroken[index].breakableLaws = response.data;
      //setTableView([]);
    });
  }

  function PrintBreakableLaws(props) {
    var index = props.index;

    if(showingLawsBroken[index].breakableLaws.length == 0)
      return null;

    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>Law Name</th>
            <th>Sentence</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{
          showingLawsBroken[index].breakableLaws.map(law => {
            return (
              <tr>
                <td>{law.lawName}</td>
                <td>{law.sentence}</td>
                <td><Button size="sm" type="submit" onClick={() => BreakLaw(law.lawID, showingLawsBroken[index].personID)}>Add</Button></td>
              </tr>
            )
          })
        }</tbody>
      </Table>
    );
  }

  function BreakLaw(lawID, personID) {
    const lawUrl = baseUrl + `/breakLaw/${lawID}/${personID}`;

    Axios.put(lawUrl).then(resonse => {
      Axios.get(baseUrl + `/getLawsBroken/${personID}`).then(response => {
        var index = showingLawsBroken.findIndex((val) => {return val.personID == personID});
        showingLawsBroken[index].lawsBroken = response.data;
        //now that we're finished, rerender;
        setTableView([]);
      });
    });
  }

  function UnBreakLaw(lawID, personID) {
    const unBreakLawUrl = baseUrl + `/unBreakLaw/${lawID}/${personID}`;
    Axios.delete(unBreakLawUrl).then((respons) => {
      //the things removed from the database, we just need to remove it from the array
      showingLawsBroken.map((person) => {
        var i = person.lawsBroken.findIndex((law) => {return law.lawID == lawID});
        if(i >= 0)
          person.lawsBroken.splice(i, 1);

        return i;
      });

      setTableView([]); //rerender now that the thing in the array has been removed
    });
  }


  function DropDownPersonActions (props) {

    return (
      <DropdownButton id="dropdown-item-button" title="Actions">
        <Dropdown.Item as="button" onClick={() => GetBusinessesOwned(props.person.individualID)}>Show/Hide businesses owned</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => GetLawsBroken(props.person.individualID)}>Show/Hide laws broken</Dropdown.Item>
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

	  <IndividualForm type="Create" onClick={addIndividual} data={{"firstName": "", "lastName":"", "age":"", "mafiaFamily":"", "mafiaRole":""}}/>

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
                <PrintLawsBroken person={person} />
              </Fragment>
            ))
          }

        </tbody>
      </Table>
    </Container>
  );
}





export default Individuals;
