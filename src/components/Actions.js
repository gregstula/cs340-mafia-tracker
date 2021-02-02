import {Container, Button} from 'react-bootstrap';

function Actions() {
    return (
      <Container>
        <Button type="update">Update</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type="delete">Delete</Button>
      </Container>
   );
}

export default Actions
