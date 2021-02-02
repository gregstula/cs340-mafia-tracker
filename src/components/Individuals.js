//
import {Container, Form, Button} from 'react-bootstrap';
import Actions from './Actions';
import Table from 'react-bootstrap/Table';

function Individuals() {
     return (
      <Container fluid>
        <h1>Individuals</h1>

        <Form>
          <Form.Control size="m" type="text" placeholder="Search" />
        </Form>
        <Button type="search">Search</Button>
        <p></p>

        <Table bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Mafia Family</th>
              <th>Mafia Role</th>
              <th>Laws Broken</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>
                <Form>
                  <Form.Control size="m" type="text" placeholder="First Name" />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="m" type="text" placeholder="Last Name" />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="m" type="text" placeholder="Age" />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="m" type="text" placeholder="Mafia Family" />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="m" type="text" placeholder="Mafia Role" />
                </Form>
              </td>
              <td></td>
              <td>
                <Button type="submit">Submit</Button>
              </td>
            </tr>

            <tr>
              <td>Bill</td>
              <td>Omerta</td>
              <td>40</td>
              <td>Omerta</td>
              <td>Godfather</td>
              <td><Button type="showHideSubTable">Show</Button></td>
              <td><Actions /></td>
            </tr>
            <tr><td colSpan="10"><LawsBrokenSubTable name="murder" sentence="death" /></td></tr>

            <tr>
              <td>Bob</td>
              <td>Odenkirk</td>
              <td>45</td>
              <td>N/A</td>
              <td>N/A</td>
              <td><Button type="showHideSubTable">Show</Button></td>
              <td><Actions /></td>
            </tr>
            <tr><td colSpan="10"><LawsBrokenSubTable name="blackmail" sentence="2-5 years" /></td></tr>

            <tr>
              <td>Elon</td>
              <td>Musk</td>
              <td>49</td>
              <td>N/A</td>
              <td>N/A</td>
              <td><Button type="showHideSubTable">Show</Button></td>
              <td><Actions /></td>
            </tr>
          </tbody>
        </Table>
      </Container>
  );
}


function LawsBrokenSubTable(law) {
  return (
    <Container>
      <b>Laws Broken</b>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Law Name</th>
            <th>Sentence</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{law.name}</td>
            <td>{law.sentence}</td>
            <td>
              <Button type="delete">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}



export default Individuals;


// <div>
//   <Form>
//     <Form.Label>First Name</Form.Label>
//     <Form.Control size="lg" type="text" placeholder="First Name" />
//     <Form.Label>Last Name</Form.Label>
//     <Form.Control size="lg" type="text" placeholder="Last Name" />
//     <Form.Label>Age</Form.Label>
//     <Form.Control size="lg" type="text" placeholder="Age" />
//     <Form.Label>Mafia Family</Form.Label>
//     <Form.Control size="lg" type="text" placeholder="Family" />
//     <Form.Label>Mafia Role</Form.Label>
//     <Form.Control size="lg" type="text" placeholder="Role" />
//   </Form>
//  <Button type="submit">Submit</Button>
// </div>

