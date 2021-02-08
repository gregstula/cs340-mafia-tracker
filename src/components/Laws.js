import {Container, Form, Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
//import Actions from './Actions'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PopoverContent from 'react-bootstrap/PopoverContent'

function Laws() {
     return (
      <Container fluid>
      <h1>Laws</h1>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Sentence</th>
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
                  <Form.Control size="lg" type="text" placeholder="Name" />
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Control size="lg" type="text" placeholder="Sentence" />
                </Form>
              </td>
              <td>
                <Button szie="sm" type="submit">Create</Button>
              </td>
            </tr>

            <tr>
              <td>1</td>
              <td>Extortion</td>
              <td>3 years</td>
              <td>
                <OverlayTrigger trigger="click" placement="left" overlay={popoverLawActions}>
                  <Button size="sm" type="actionsButton">Actions</Button>
                </OverlayTrigger>
              </td>
            </tr>
            <tr>
            <td colSpan="5">
                    <IndividualSubTable>
                        <IndividualEntry fname="Andrew" lname="Douglas" role="Godfather" />
                        <IndividualEntry fname="Tony" lname="Soprano" role="Godfather" />
                    </IndividualSubTable>
                </td>

            </tr>

            <tr>
              <td>2</td>
              <td>Fraud</td>
              <td>10 years</td>
              <td>
                <OverlayTrigger trigger="click" placement="left" overlay={popoverLawActions}>
                  <Button size="sm" type="actionsButton">Actions</Button>
                </OverlayTrigger>
              </td>
            </tr>
            <tr>
                <td colSpan="5">
                    <IndividualSubTable>
                        <IndividualEntry fname="Andrew" lname="Douglas" role="Godfather" />
                        <IndividualEntry fname="Tony" lname="Soprano" role="Godfather" />
                        <IndividualEntry fname="Oliver" lname="Twist" role="Godfather" />
                    </IndividualSubTable>
                </td>
            </tr>

            <tr>
              <td>3</td>
              <td>Tax Evasion</td>
              <td>15 years</td>
              <td>
                <OverlayTrigger trigger="click" placement="left" overlay={popoverLawActions}>
                  <Button size="sm" type="actionsButton">Actions</Button>
                </OverlayTrigger>
              </td>
            </tr>
            <tr>
                <td colSpan="5">
                    <IndividualSubTable>
                        <IndividualEntry fname="Bill" lname="Omerta" role="Godfather" />
                        <IndividualEntry fname="Joe" lname="Alpha" role="Godfather" />
                        <IndividualEntry fname="Andrew" lname="Douglas" role="Godfather" />
                        <IndividualEntry fname="Tony" lname="Soprano" role="Godfather" />
                        <IndividualEntry fname="Oliver" lname="Twist" role="Godfather" />
                    </IndividualSubTable>
                </td>
            </tr>
          </tbody>
        </Table>
      </Container>
  );
}


function IndividualEntry(props) {
    return (
          <tr>
            <td>{props.fname}</td>
            <td>{props.lname}</td>
            <td>{props.role}</td>
            <td><Button size="sm" variant="danger" type="delete">Delete</Button></td>
          </tr>
    );
}

function IndividualSubTable(props) {
  return (
    <Container>
        <b>Law Breakers</b>
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
           {props.children}
          </tbody>
      </Table>
    </Container>
  );
}


const popoverLawActions = (
  <Popover id="popover-basic">
    <Popover.Content>
      <Button size="sm" type="showHideSubTable">Show law breakers</Button>
      <br></br><br></br>
      <Button type="update" size="sm" className="mr-1">Update</Button>
      <br></br><br></br>
      <Button type="delete" variant="danger" size="sm">Delete</Button>
    </Popover.Content>
  </Popover>
);


export default Laws;
