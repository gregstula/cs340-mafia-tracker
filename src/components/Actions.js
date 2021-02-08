import {Container, Button} from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover'
import PopoverContent from 'react-bootstrap/PopoverContent'

function Actions() {
    return (
      <Container>
      <Button type="update" size="sm" className="mr-1">Update</Button>
      <br></br><br></br>
      <Button type="delete" variant="danger" size="sm">Delete</Button>
      </Container>
   );
}


export default Actions
