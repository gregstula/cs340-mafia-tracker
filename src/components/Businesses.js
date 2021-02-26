import {Container, Form, Button} from 'react-bootstrap';
import Actions from './Actions';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect, useState } from "react";
import Axios from "axios";
import axios from 'axios';


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
        <td>{props.sourceArray[props.index].businessID}</td>
        <td>{props.sourceArray[props.index].businessName}</td>
        <td>{props.sourceArray[props.index].buildingNumber}</td>
        <td>{props.sourceArray[props.index].streetName}</td>
        <td>{props.sourceArray[props.index].city}</td>
        <td>{props.sourceArray[props.index].state}</td>
        <td>{props.sourceArray[props.index].zip}</td>
        <td>{props.sourceArray[props.index].individualOwner}</td>
        <td>{props.sourceArray[props.index].familyOwner}</td>
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
              businessList.map((business, index) => (
                <>
                  <BusinessRow key= {index} index={index} sourceArray={businessList}/>
                </>
              ))
            }
          </tbody>
        </Table>
      </Container>
  );
}

export default Businesses;
