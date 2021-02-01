import {Container, Form, Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'

function Families() {
     return (
      <Container>
      <h1>Families</h1>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th># of members</th>
              <th>Members</th>
              <th>Businesses owned</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>
                <Form>
                  <Form.Control size="m" type="text" placeholder="Name" />
                </Form>
              </td>
              <td>#</td>
              <td></td>
              <td></td>
              <td>
                <Button type="submit">Submit</Button>
              </td>
            </tr>

            <tr>
              <td>Omerta</td>
              <td>1</td>
              <td><Button type="showHideSubTable">Show Members</Button></td>
              <td><Button type="showHideSubTable">Show Businesses</Button></td>
              <td><Actions /></td>
            </tr>
            <tr>
              <td colSpan="5"><IndividualSubTable fname="Bill" lname="Omerta" role="Godfather" /></td>
            </tr>

            <tr>
              <td>Murphy</td>
              <td>5</td>
              <td><Button type="showHideSubTable">Show Members</Button></td>
              <td><Button type="showHideSubTable">Show Businesses</Button></td>
              <td><Actions /></td>
            </tr>
            <tr>
              <td colSpan="5"><BusinessSubTable name="Domino's" buildingNum="54232" streetName="NW Road Blvd" city="Corvallis" state="Oregon" zip="97331"/></td>
            </tr>

            <tr>
              <td>Scott</td>
              <td>2</td>
              <td><Button type="showHideSubTable">Show Members</Button></td>
              <td><Button type="showHideSubTable">Show Businesses</Button></td>
              <td><Actions /></td>
            </tr>
            <tr>
              <td colSpan="5"><IndividualSubTable fname="Michael" lname="Scott" role="Regional Manager" /></td>
            </tr>
            <tr>
              <td colSpan="5"><BusinessSubTable name="Dunder Mifflin" buildingNum="48372" streetName="NW Road Blvd" city="Pawnee" state="Indiana" zip="95732"/></td>
            </tr>

          </tbody>
        </Table>
      </Container>
  );
}


function BusinessSubTable(business) {
  return (
    <Container>
      <b>Businesses Owned</b>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Business Name</th>
            <th>Building Number</th>
            <th>Street Name</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{business.name}</td>
            <td>{business.buildingNum}</td>
            <td>{business.streetName}</td>
            <td>{business.city}</td>
            <td>{business.state}</td>
            <td>{business.zip}</td>
            <td>
              <Button type="delete">Delete</Button>
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
              <Button type="delete">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}


function Actions() {
    return (
      <Container>
        <Button type="update">Update</Button>
        <Button type="delete">Delete</Button>
      </Container>
   );
}


export default Families;


// <Form>
//     <Form.Control size="lg" type="text" placeholder="Name" />
// </Form>
//     <Button type="submit">Submit</Button>
