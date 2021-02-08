import {Container, Form, Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
//import Actions from './Actions'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PopoverContent from 'react-bootstrap/PopoverContent'


function Families() {
     return (
      <Container fluid>
      <h1>Families</h1>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th># of members</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr>
                <td>Input new family</td>
              <td>
                <Form>
                  <Form.Control size="lg" type="text" placeholder="Name" />
                </Form>
              </td>
              <td>#</td>
              <td>
                <Button size="sm" type="submit">Create</Button>
              </td>
            </tr>

            <tr>
              <th>1</th>
              <td>Omerta</td>
              <td>1</td>
              <td>
                <OverlayTrigger trigger="click" placement="left" overlay={popoverFamilyActions}>
                  <Button size="sm" type="actionsButton">Actions</Button>
                </OverlayTrigger>
              </td>
            </tr>
            <tr>
              <td colSpan="5"><IndividualSubTable fname="Bill" lname="Omerta" role="Godfather" /></td>
            </tr>

            <tr>
              <th>2</th>
              <td>Murphy</td>
              <td>5</td>
              <td>
                <OverlayTrigger trigger="click" placement="left" overlay={popoverFamilyActions}>
                  <Button size="sm" type="actionsButton">Actions</Button>
                </OverlayTrigger>
              </td>
            </tr>
            <tr>
              <td colSpan="5"><BusinessSubTable name="Domino's" streetAddress="54232 NW Road Blvd" city="Corvallis" state="Oregon"/></td>
            </tr>

            <tr>
              <th>3</th>
              <td>Scott</td>
              <td>2</td>
              <td>
                <OverlayTrigger trigger="click" placement="left" overlay={popoverFamilyActions}>
                  <Button size="sm" type="actionsButton">Actions</Button>
                </OverlayTrigger>
              </td>
            </tr>
            <tr>
              <td colSpan="5"><IndividualSubTable fname="Michael" lname="Scott" role="Regional Manager" /></td>
            </tr>
            <tr>
              <td colSpan="5"><BusinessSubTable name="Dunder Mifflin" streetAddress="48372 NW Road Blvd" city="Pawnee" state="Indiana"/></td>
            </tr>

          </tbody>
        </Table>
      </Container>
  );
}


function BusinessSubTable(business) {
  return (
    <Container>
        <b>Business Owned</b>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Business Name</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{business.name}</td>
            <td>{business.streetAddress}</td>
            <td>{business.city}</td>
            <td>{business.state}</td>
            <td>
              <Button size="sm" variant="danger" type="delete">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}


function IndividualSubTable(person) {
  return (
    <Container>
        <b>Members</b>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{person.fname}</td>
            <td>{person.lname}</td>
            <td>{person.role}</td>
            <td>
              <Button size="sm" variant="danger" type="delete">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}


const popoverFamilyActions = (
  <Popover id="popover-basic">
    <Popover.Content>
      <Button size="sm" type="showHideSubTable">Show members</Button>
      <br></br><br></br>
      <Button size="sm" type="showHideSubTable">Show businesses</Button>
      <br></br><br></br>
      <Button type="update" size="sm" className="mr-1">Update</Button>
      <br></br><br></br>
      <Button type="delete" variant="danger" size="sm">Delete</Button>
    </Popover.Content>
  </Popover>
);


export default Families;
