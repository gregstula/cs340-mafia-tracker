import logo from './logo.svg';
import {Navbar,Nav} from 'react-bootstrap';
import './App.css';

function App() {
  return (
      <div>
        <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Families</Nav.Link>
      <Nav.Link href="#pricing">Individuals</Nav.Link>
    </Nav>
  </Navbar>
  </div>
  );
}

export default App;
