//
import {Container, Form, Button} from 'react-bootstrap';
//import Actions from './Actions';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PopoverContent from 'react-bootstrap/PopoverContent'

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
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Mafia Family</th>
              <th>Mafia Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr>
                <td>Auto</td>
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
              <td>
                <Button size="sm" type="submit">Create</Button>
              </td>
            </tr>

            <tr>
              <td>1</td>
              <td>Bill</td>
              <td>Omerta</td>
              <td>40</td>
              <td>Omerta</td>
              <td>Godfather</td>
              <td>
                <OverlayTrigger trigger="click" placement="left" overlay={popoverIndividualActions}>
                  <Button size="sm" type="actionsButton">Actions</Button>
                </OverlayTrigger>
              </td>
            </tr>
            <tr><td colSpan="10"><LawsBrokenSubTable name="murder" sentence="death" /></td></tr>

            <tr>
              <td>2</td>
              <td>Bob</td>
              <td>Odenkirk</td>
              <td>45</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>
                <OverlayTrigger trigger="click" placement="left" overlay={popoverIndividualActions}>
                  <Button size="sm" type="actionsButton">Actions</Button>
                </OverlayTrigger>
              </td>
            </tr>
            <tr><td colSpan="10"><LawsBrokenSubTable name="blackmail" sentence="2-5 years" /></td></tr>

            <tr>
              <td>3</td>
              <td>Elon</td>
              <td>Musk</td>
              <td>49</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>
                <OverlayTrigger trigger="click" placement="left" overlay={popoverIndividualActions}>
                  <Button size="sm" type="actionsButton">Actions</Button>
                </OverlayTrigger>
              </td>
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
              <Button variant="danger" size="sm" type="delete">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}


const popoverIndividualActions = (
  <Popover id="popover-basic">
    <Popover.Content>
      <Button size="sm" type="showHideSubTable">Show laws broken</Button>
      <br></br><br></br>
      <Button size="sm" type="showHideSubTable">Show businesses</Button>
      <br></br><br></br>
      <Button type="update" size="sm" className="mr-1">Update</Button>
      <br></br><br></br>
      <Button type="delete" variant="danger" size="sm">Delete</Button>
    </Popover.Content>
  </Popover>
);



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
