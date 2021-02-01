import {Container, Form, Button} from 'react-bootstrap';

function Families() {
     return (
      <Container>
      <h1>Families</h1>
          <Form>
            <Form.Control size="lg" type="text" placeholder="Name" />
          </Form>
         <Button type="submit">Submit</Button>
      </Container>
  );
}


export default Families;
