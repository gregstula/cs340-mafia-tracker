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
              <td>Omerta</td>
              <td>1</td>
              <td><Button type="showHideSubTable">Show Members</Button></td>
              <td><Button type="showHideSubTable">Show Businesses</Button></td>
              <td>
                <Button type="update">Update</Button>
                <Button type="delete">Delete</Button>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
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
                      <td>Bill</td>
                      <td>Omerta</td>
                      <td>Godfather</td>
                      <td>
                        <Button type="delete">Delete</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </td>
            </tr>

            <tr>
              <td>Murphy</td>
              <td>5</td>
              <td><Button type="showHideSubTable">Show Members</Button></td>
              <td><Button type="showHideSubTable">Show Businesses</Button></td>
              <td>
                <Button type="update">Update</Button>
                <Button type="delete">Delete</Button>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
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
                      <td>Domino's</td>
                      <td>23213 NW Road Blvd</td>
                      <td>Corvallis</td>
                      <td>Oregon</td>
                      <td>
                        <Button type="delete">Delete</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </td>
            </tr>

            <tr>
              <td>Scott</td>
              <td>2</td>
              <td><Button type="showHideSubTable">Show Members</Button></td>
              <td><Button type="showHideSubTable">Show Businesses</Button></td>
              <td>
                <Button type="update">Update</Button>
                <Button type="delete">Delete</Button>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
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
                      <td>Michael</td>
                      <td>Scott</td>
                      <td>Regional Manager</td>
                      <td>
                        <Button type="delete">Delete</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
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
                      <td>Dunder Mifflin</td>
                      <td>23213 NW Road Blvd</td>
                      <td>Pawnee</td>
                      <td>Indiana</td>
                      <td>
                        <Button type="delete">Delete</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </td>
            </tr>

          </tbody>
        </Table>
      </Container>
  );
}


export default Families;


// <Form>
//     <Form.Control size="lg" type="text" placeholder="Name" />
// </Form>
//     <Button type="submit">Submit</Button>
