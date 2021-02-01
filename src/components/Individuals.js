import {Container, Form, Button} from 'react-bootstrap';

function Individuals() {
     return (
      <Container>
      <h1>Individuals</h1>
        <div>
          <Form>
            <Form.Label>First Name</Form.Label>
            <Form.Control size="lg" type="text" placeholder="First Name" />
            <Form.Label>Last Name</Form.Label>
            <Form.Control size="lg" type="text" placeholder="Last Name" />
            <Form.Label>Age</Form.Label>
            <Form.Control size="lg" type="text" placeholder="Age" />
            <Form.Label>Mafia Family</Form.Label>
            <Form.Control size="lg" type="text" placeholder="Family" />
            <Form.Label>Mafia Role</Form.Label>
            <Form.Control size="lg" type="text" placeholder="Role" />
          </Form>
         <Button type="submit">Submit</Button>
        </div>
      </Container>
  );
}


export default Individuals;
