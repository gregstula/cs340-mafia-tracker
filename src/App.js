import logo from './logo.svg';
import {Navbar,Nav} from 'react-bootstrap';
import {HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
     return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/families">Families</Nav.Link>
            <Nav.Link as={Link} to="/individuals">Individuals</Nav.Link>
            </Nav>
        </Navbar>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/individuals">
            <Individuals />
          </Route>
          <Route path="/families">
            <Families />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Families() {
  return <h2>Families</h2>;
}

function Individuals() {
  return <h2>Individuals</h2>;
}


export default App;
