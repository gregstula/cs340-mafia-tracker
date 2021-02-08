import {Container, Form, Button} from 'react-bootstrap';
import Actions from './Actions';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
        <td>{businesses[props.index].id}</td>
        <td>{businesses[props.index].name}</td>
        <td>{businesses[props.index].number}</td>
        <td>{businesses[props.index].street}</td>
        <td>{businesses[props.index].city}</td>
        <td>{businesses[props.index].state}</td>
        <td>{businesses[props.index].zip}</td>
        <td>{businesses[props.index].owner}</td>
        <td>{businesses[props.index].family}</td>
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
                <Form>
                  <Form.Control size="sm" type="text" placeholder="ID" />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="sm" type="text" placeholder="Name" />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="sm" type="text" placeholder="Street" />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="sm" type="text" placeholder="City" />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="sm" type="text" placeholder="State" />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="sm" type="text" placeholder="State" />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="sm" type="text" placeholder="Zip" />
                </Form>
              </td>
              <td></td>
              <td></td>
              <td>
                <Button type="submit">Create</Button>
              </td>
            </tr>
            {
              businesses.map((business, index) => (
                <>
                  <BusinessRow index={index} />
                </>
              ))
            }
          </tbody>
        </Table>
      </Container>
  );
}

export default Businesses;
