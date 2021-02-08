import {Container, Form, Button} from 'react-bootstrap';
//import Actions from './Actions';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PopoverContent from 'react-bootstrap/PopoverContent'

function Businesses() {
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
                <Button size="sm" type="submit">Create</Button>
              </td>
            </tr>

            <tr>
              <td>1</td>
              <td>Joe's Pizza</td>
              <td>320</td>
              <td>Main St.</td>
              <td>New York</td>
              <td>New York</td>
              <td>32212</td>
              <td>Tony Soprano</td>
              <td>Soprano</td>
              <td>
                <OverlayTrigger trigger="click" placement="left" overlay={popoverLawActions}>
                  <Button size="sm" type="actionsButton">Actions</Button>
                </OverlayTrigger>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Maria's Coin Laundry</td>
              <td>210</td>
              <td>Wall St.</td>
              <td>New York</td>
              <td>New York</td>
              <td>80192</td>
              <td>Elon Musk</td>
              <td></td>
              <td>
                <OverlayTrigger trigger="click" placement="left" overlay={popoverLawActions}>
                  <Button size="sm" type="actionsButton">Actions</Button>
                </OverlayTrigger>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
  );
}


const popoverLawActions = (
  <Popover id="popover-basic">
    <Popover.Content>
      <Button type="update" size="sm" className="mr-1">Update</Button>
      <br></br><br></br>
      <Button type="delete" variant="danger" size="sm">Delete</Button>
    </Popover.Content>
  </Popover>
);

export default Businesses;
