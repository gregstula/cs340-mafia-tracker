import {Container, Form, Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'





function Laws() {
     return (
      <Container>
      <h1>Laws</h1>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Sentence</th>
              <th>Law Breakers</th>
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
              <td></td>
              <td>
                <Button type="submit">Submit</Button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Extortion</td>
              <td>3 years</td>
              <td><Button type="showHideSubTable">Show Members</Button></td>
              <td><Actions /></td>
            </tr>
            <tr>
            <td colSpan="5">
                    <IndividualSubTable>
                        <IndividualEntry    fname="Bill" lname="Omerta" role="Godfather" />
                        <IndividualEntry fname="Joe" lname="Alpha" role="Godfather" />
                        <IndividualEntry fname="Andrew" lname="Douglas" role="Godfather" />
                        <IndividualEntry fname="Tony" lname="Soprano" role="Godfather" />
                        <IndividualEntry fname="Oliver" lname="Twist" role="Godfather" />
                    </IndividualSubTable>
                </td>

            </tr>

            <tr>
              <td>2</td>
              <td>Fraud</td>
              <td>10 years</td>
              <td><Button type="showHideSubTable">Show Members</Button></td>
              <td><Actions /></td>
            </tr>
            <tr>
                <td colSpan="5">
                    <IndividualSubTable>
                        <IndividualEntry    fname="Bill" lname="Omerta" role="Godfather" />
                        <IndividualEntry fname="Joe" lname="Alpha" role="Godfather" />
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
              <td><Button type="showHideSubTable">Show Members</Button></td>
              <td><Actions /></td>
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
            <td><Button type="delete">Delete</Button></td>
          </tr>
    );
}

function IndividualSubTable(props) {
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
           {props.children}
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


export default Laws;

