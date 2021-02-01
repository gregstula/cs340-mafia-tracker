import {Container, Form, Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'





function Families() {
     return (
      <Container>
      <h1>Families</h1>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th># of members</th>
              <th>Members</th>
              <th>Businesses owned</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr>
                <td>Auto</td>
              <td>
                <Form>
                  <Form.Control size="lg" type="text" placeholder="Name" />
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
              <th>1</th>
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
              <th>2</th>
              <td>Murphy</td>
              <td>5</td>
              <td><Button type="showHideSubTable">Show Members</Button></td>
              <td><Button type="showHideSubTable">Show Businesses</Button></td>
              <td><Actions /></td>
            </tr>
            <tr>
              <td colSpan="5"><BusinessSubTable name="Domino's" streetAddress="54232 NW Road Blvd" city="Corvallis" state="Oregon"/></td>
            </tr>

            <tr>
              <th>3</th>
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
