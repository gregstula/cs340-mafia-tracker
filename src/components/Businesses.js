import {Container, Form, Button} from 'react-bootstrap';
import Actions from './Actions';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import {Fragment, useEffect, useState } from "react";
import Axios from "axios";
import axios from 'axios';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';


function Businesses() {

  const [businessNameInput, setBusinessName] = useState("");
  const [buildingNumberInput, setBuildingNumber] = useState(0);
  const [streetInput, setStreet] = useState("");
  const [cityInput, setCity] = useState("");
  const [stateInput, setState] = useState("");
  const [zipInput, setZip] = useState(0);

  const [businessList, setBusinessList] = useState([]);
  const [create, setCreate] = useState([]);

  const getUrl = 'https://cs340-mafia-server.herokuapp.com/businesses';
  //const getUrl = 'http://localhost:8000/businesses/';

  useEffect(() => {
      axios.get(getUrl).then(response => setBusinessList(response.data));
  }, [create]);


  const addBusiness = () => {
    const createUrl = "https://cs340-mafia-server.herokuapp.com/businesses/create";
    //const createUrl = "http://localhost:8000/businesses/create";
    Axios.post(createUrl, {
      businessNameInput: businessNameInput,
      buildingNumberInput: buildingNumberInput,
      streetInput: streetInput,
      cityInput: cityInput,
      stateInput: stateInput,
      zipInput: zipInput,
    }).then(() => {
      setCreate([]);
    });
  };

  const deleteBusiness = (ID) => {
    const deleteUrl = `https://cs340-mafia-server.herokuapp.com/businesses/delete/${ID}`
    Axios.delete(deleteUrl).then((response) => {
      setCreate([]);
    });
  };



  function DropDownBusinessActions (props) {
    return (
      <DropdownButton id="dropdown-item-button" title="Actions">
        <Dropdown.Item as={Example}></Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => deleteBusiness(props.ID)}>Delete</Dropdown.Item>
      </DropdownButton>
    );
  }

  function Example() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Dropdown.Item as='button'  onClick={handleShow}>
          Update
        </Dropdown.Item>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This will be the Modal pop up with the edit form!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

    function BusinessRow(props) {
      const ID = businessList[props.index].businessID
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
          <DropDownBusinessActions key={ID} ID={ID} />
        </td>
      </tr>
      );
    }
     return (
      <Container fluid>
        <h1>Businesses</h1>

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

            <tr>
              <td>
                  Auto
              </td>
              <td>
                <Form>
                  <Form.Control size="sm" type="text" placeholder="Name" onChange={(event) => { setBusinessName(event.target.value); }} />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="sm" type="text" placeholder="Building Number" onChange={(event) => { setBuildingNumber(event.target.value); }} />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="sm" type="text" placeholder="Street" onChange={(event) => { setStreet(event.target.value); }} />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="sm" type="text" placeholder="City" onChange={(event) => { setCity(event.target.value); }} />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="sm" type="text" placeholder="State" onChange={(event) => { setState(event.target.value); }} />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="sm" type="text" placeholder="Zip" onChange={(event) => { setZip(event.target.value); }} />
                </Form>
              </td>
              <td></td>
              <td></td>
              <td>
                <Button type="submit" onClick={addBusiness}>Create</Button>
              </td>
            </tr>
            {
              businessList.map((business, index) => (
                <Fragment key ={business.businessID}>
                  <BusinessRow index={index}/>
                </Fragment>
              ))
            }
          </tbody>
        </Table>
      </Container>
  );
}

export default Businesses;
