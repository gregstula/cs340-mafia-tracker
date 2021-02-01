import {Container, Form, Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'

function Individuals() {
     return (
      <Container>
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
              <th>Businesses Owned</th>
              <th>Laws Broken</th>
              <th>Wants Dead</th>
              <th>Is Wanted Dead by</th>
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
              <td></td>
              <td></td>
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
              <td><Button type="showHideSubTable">Show Businesses Owned</Button></td>
              <td><Button type="showHideSubTable">Show Laws Broken</Button></td>
              <td><Button type="showHideSubTable">Show Wants Dead</Button></td>
              <td><Button type="showHideSubTable">Show Wanted Dead By</Button></td>
              <td><Actions /></td>
            </tr>
            <tr><td colSpan="10"><LawsBrokenSubTable name="murder" sentence="death" /></td></tr>
            <tr><td colSpan="10"><WantsDeadSubTable fname="Michael" lname="Scott" family="Scott" role="Regional Manager" /></td></tr>

            <tr>
              <td>Bob</td>
              <td>Odenkirk</td>
              <td>45</td>
              <td>N/A</td>
              <td>N/A</td>
              <td><Button type="showHideSubTable">Show Businesses Owned</Button></td>
              <td><Button type="showHideSubTable">Show Laws Broken</Button></td>
              <td><Button type="showHideSubTable">Show Wants Dead</Button></td>
              <td><Button type="showHideSubTable">Show Wanted Dead By</Button></td>
              <td><Actions /></td>
            </tr>
            <tr><td colSpan="10"><LawsBrokenSubTable name="blackmail" sentence="2-5 years" /></td></tr>
            <tr><td colSpan="10"><WantedDeadBySubTable fname="Michael" lname="Scott" family="Scott" role="Regional Manager" /></td></tr>

            <tr>
              <td>Elon</td>
              <td>Musk</td>
              <td>49</td>
              <td>N/A</td>
              <td>N/A</td>
              <td><Button type="showHideSubTable">Show Businesses Owned</Button></td>
              <td><Button type="showHideSubTable">Show Laws Broken</Button></td>
              <td><Button type="showHideSubTable">Show Wants Dead</Button></td>
              <td><Button type="showHideSubTable">Show Wanted Dead By</Button></td>
              <td><Actions /></td>
            </tr>
            <tr><td colSpan="10"><BusinessesOwnedSubTable name="SpaceX" buildingNum="47262" streetName="Highway Rd" city="New York" state="New York" zip="43636" /></td></tr>

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


function WantsDeadSubTable(person) {
  return (
    <Container>
      <b>Wants Dead</b>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Family</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{person.fname}</td>
            <td>{person.lname}</td>
            <td>{person.family}</td>
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


function WantedDeadBySubTable(person) {
  return (
    <Container>
      <b>Wanted Dead By</b>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Family</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{person.fname}</td>
            <td>{person.lname}</td>
            <td>{person.family}</td>
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


function BusinessesOwnedSubTable(business) {
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


function Actions() {
    return (
      <Container>
        <Button type="update">Update</Button>
        <Button type="delete">Delete</Button>
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
