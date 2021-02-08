import {Container, Form, Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import Actions from './Actions'

//import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
//import Popover from 'react-bootstrap/Popover'
//import PopoverContent from 'react-bootstrap/PopoverContent'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import React, { useState } from 'react';

var laws = [
  {
    "id":1,
    "name":"Extortion",
    "sentence":"3 years",
    "showLawBreakers":true
  },
  {
    "id":2,
    "name":"Fraud",
    "sentence":"10 years",
    "showLawBreakers":true
  },
  {
    "id":3,
    "name":"Tax Evasion",
    "sentence":"15 years",
    "showLawBreakers":true
  },
];



function Laws() {
    const [lawsShown, setLawsShown] = useState(false);


    function LawRow(props) {
      return (
          <tr>
            <td>{laws[props.index].id}</td>
            <td>{laws[props.index].name}</td>
            <td>{laws[props.index].sentence}</td>
            <td>
              <DropDownLawActions index={props.index}/>
            </td>
          </tr>
      );
    }


    function LawRowBreakers(props) {
      if(!laws[props.index].showLawBreakers)
        return null;
      return (
        <tr>
          <td colSpan="5">
            <IndividualSubTable>
              <IndividualEntry fname="Andrew" lname="Douglas" role="Godfather" />
              <IndividualEntry fname="Tony" lname="Soprano" role="Godfather" />
            </IndividualSubTable>
          </td>
        </tr>
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


    function DropDownLawActions (props) {
      return (
        <DropdownButton id="dropdown-item-button" title="Dropdown button">
          <Dropdown.Item as="button" onClick={() => ShowLawBreakersSubTable(props.index)}>Show law breakers</Dropdown.Item>
          <Dropdown.Item as="button">Update</Dropdown.Item>
          <Dropdown.Item as="button">Delete</Dropdown.Item>
        </DropdownButton>
      );
    }


    function ShowLawBreakersSubTable(index) {
      console.log("index = " + index);
      laws[index].showLawBreakers = !laws[index].showLawBreakers;
      setLawsShown(!lawsShown);
      //forceUpdate();
    }


    // const popoverLawActions = (
    //   <Popover id="popover-basic">
    //     <Popover.Content>
    //       <Button size="sm" type="showHideSubTable">Show law breakers</Button>
    //       <br></br><br></br>
    //       <Actions />
    //     </Popover.Content>
    //   </Popover>
    // );


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

            <LawRow index="0" />
            <LawRowBreakers index="0" />

            <LawRow index="1" />
            <LawRowBreakers index="1" />

            <LawRow index="2" />
            <LawRowBreakers index="2" />

          </tbody>
        </Table>
      </Container>
  );
}





export default Laws;
