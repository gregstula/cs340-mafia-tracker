
import { Container, Form, Button/*, Row*/, Col, Table, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import React from 'react';
import { Fragment, useEffect, useState/*, useRef*/ } from "react";
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

var showingLawBreakers = [];

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
        <Dropdown.Item as="button" onClick={() => GetLawBreakers(props.law.lawID)}>Show/Hide Law Breakers</Dropdown.Item>
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


  function GetLawBreakers(lawID) {
    //find the law we're looking for, adding it if it doesn't exist
    var index = showingLawBreakers.findIndex((val) => {return val.lawID === lawID})
    if(index < 0)
    {
      showingLawBreakers.push({"lawID": lawID, "lawBreakers": [], "potentialLawBreakers": []});
      index = showingLawBreakers.length - 1;

      Axios.get(baseUrl + `/getLawBreakers/${lawID}`).then(response => {
        showingLawBreakers[index].lawBreakers = response.data;
        //now that we're finished, rerender;
        setTableView([]);
      });
    }
    else //if it already exists, just remove it
    {
      showingLawBreakers.splice(index, 1);

      //now that we're finished, rerender;
      setTableView([]);
    }
  }

  function PrintLawBreakers(props) {

    var index = showingLawBreakers.findIndex((val) => {return val.lawID === props.law.lawID});

    if(index < 0)
      return null;

    var breakersList = showingLawBreakers[index].lawBreakers;

    return (
      <tr>
        <td colSpan="7">
              <b>Law Breakers</b>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mafia Family</th>
                    <th>Mafia Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    breakersList.map(breaker => (
                      <tr>
                        <td>{breaker.firstName + " " + breaker.lastName}</td>
                        <td>{breaker.familyName}</td>
                        <td>{breaker.mafiaRole}</td>
                        <td><Button size="sm" variant="danger" type="delete" onClick={() => RemoveLawBreaker(breaker.individualID, props.law.lawID)}>Delete</Button></td>
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
                      GetPotentialLawBreakers(input.target.value, index)
                    }
                    else {
                      showingLawBreakers[index].potentialLawBreakers = [];
                    }
                  }}
                  placeholder="Search for existing people to add to list of people who broke this law"
                />
              </Form>
              <Button size="sm" type="search" onClick={() => {
                  setTableView([]);
                }}>Search</Button>
              <Button size="sm" variant="danger" type="delete" onClick={() => {
                  showingLawBreakers[index].potentialLawBreakers = [];
                  setTableView([]);
                }}>Clear Results</Button>
              <PrintPotentialLawBreakers index={index}/>
        </td>
      </tr>
    );
  }

  function GetPotentialLawBreakers(searchInput, index) {

    Axios.get(baseUrl + `/searchPeople/${searchInput}`).then(response => {
      showingLawBreakers[index].potentialLawBreakers = response.data;
    });
  }

  function PrintPotentialLawBreakers(props) {

    var index = props.index;

    if(showingLawBreakers[index].potentialLawBreakers.length === 0)
      return null;

    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mafia Family</th>
            <th>Mafia Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{
          showingLawBreakers[index].potentialLawBreakers.map(person => {
            return (
              <tr>
                <td>{person.firstName + " " + person.lastName}</td>
                <td>{person.familyName}</td>
                <td>{person.mafiaRole}</td>
                <td><Button size="sm" type="submit" onClick={() => AddLawBreaker(person.individualID, showingLawBreakers[index].lawID)}>Add</Button></td>
              </tr>
            )
          })
        }</tbody>
      </Table>
    );

  }

  function AddLawBreaker(personID, lawID) {

    const addLawBreakerUrl = baseUrl + `/addLawBreaker/${personID}/${lawID}`;

    Axios.put(addLawBreakerUrl).then(resonse => {
      Axios.get(baseUrl + `/getLawBreakers/${lawID}`).then(response => {
        var index = showingLawBreakers.findIndex((val) => {return val.lawID === lawID});
        showingLawBreakers[index].lawBreakers = response.data;
        //now that we're finished, rerender;
        setTableView([]);
      });
    });
  }

  function RemoveLawBreaker(personID, lawID) {

    const removeLawBreakerUrl = baseUrl + `/removeLawBreaker/${personID}/${lawID}`;
    Axios.delete(removeLawBreakerUrl).then((response) => {
      //the things removed from the database, we just need to remove it from the array
      showingLawBreakers.map((law) => {
        var i = law.lawBreakers.findIndex((person) => {return person.individualID === personID});
        if(i >= 0)
          law.lawBreakers.splice(i, 1);
        else {
          console.log("not found");
        }

        return i;
      });

      console.log(showingLawBreakers);
      setTableView([]); //rerender now that the thing in the array has been removed
    });
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
                <PrintLawBreakers law={law} />
              </Fragment>
            ))
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default Laws;
