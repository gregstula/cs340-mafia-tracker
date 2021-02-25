import {Container, Form, Button} from 'react-bootstrap';
import Actions from './Actions';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from "react";
import Axios from "axios";

const businesses = [
  {
  "id": 1,
  "name":"Joe's Pizza",
  "number": 320,
  "street": "Main St",
  "city": "New York",
  "state": "New York",
  "zip" : 32212,
  "owner": "Tony Soprano",
  "family": "Soprano"
  },
  {
    "id": 2,
    "name":"Maria's Coin Laundry",
    "number": 210,
    "street": "Wall St",
    "city": "New York",
    "state": "New York",
    "zip" : 80192,
    "owner": "Elon Musk",
    "family": "Musk"
  },
  {
    "id": 3,
    "name":"Dunder Mifflin",
    "number": 4120,
    "city": "Scranton",
    "street": "22nd St",
    "state": "Pennsylvania",
    "zip" : 54292,
    "owner": "Michael Scott",
    "family": "Scott"
  }
]

function Businesses() {

  const [businessNameInput, setBusinessName] = useState("");
  const [buildingNumberInput, setBuildingNumber] = useState(0);
  const [streetInput, setStreet] = useState("");
  const [cityInput, setCity] = useState("");
  const [stateInput, setState] = useState("");
  const [zipInput, setZip] = useState(0);

  const [businessList, setBusinessList] = useState([]);

  const addBusiness = () => {
    console.log("businessNameInput = " + businessNameInput);

    Axios.post("https://cs340-mafia-server.herokuapp.com/businesses/create", {
      businessNameInput: businessNameInput,
      buildingNumberInput: buildingNumberInput,
      streetInput: streetInput,
      cityInput: cityInput,
      stateInput: stateInput,
      zipInput: zipInput,
    }).then(() => {
      setBusinessList([
        ...businessList,
        {
          businessNameInput: businessNameInput,
          buildingNumberInput: buildingNumberInput,
          streetInput: streetInput,
          cityInput: cityInput,
          stateInput: stateInput,
          zipInput: zipInput,
        },
      ]);
    });
  };



  function DropDownBusinessActions (props) {
    return (
      <DropdownButton id="dropdown-item-button" title="Actions">
        <Dropdown.Item as="button">Update</Dropdown.Item>
        <Dropdown.Item as="button">Delete</Dropdown.Item>
      </DropdownButton>
    );
  }
    function BusinessRow(props) {
      return (
        <tr>
        <td>{props.sourceArray[props.index].id}</td>
        <td>{props.sourceArray[props.index].name}</td>
        <td>{props.sourceArray[props.index].number}</td>
        <td>{props.sourceArray[props.index].street}</td>
        <td>{props.sourceArray[props.index].city}</td>
        <td>{props.sourceArray[props.index].state}</td>
        <td>{props.sourceArray[props.index].zip}</td>
        <td>{props.sourceArray[props.index].owner}</td>
        <td>{props.sourceArray[props.index].family}</td>
        <td>
          <DropDownBusinessActions/>
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
              businesses.map((business, index) => (
                <>
                  <BusinessRow key= {index} index={index} sourceArray={businesses}/>
                </>
              ))
            }
            {
              businessList.map((business, index) => (
                <>
                  <BusinessRow key={index} index={index} sourceArray={businessList}/>
                </>
              ))
            }
          </tbody>
        </Table>
      </Container>
  );
}

export default Businesses;
