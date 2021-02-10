import React, { Component } from "react";
import styled from "@emotion/styled";
import { colors } from "../constants/styles";
import { Tabs, Tab, Sonnet } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Input.css'


const Input = () => {
    return (
        <Container>
        	<Tabs defaultActiveKey="textInput" id="uncontrolled-tab-example">
			  <Tab eventKey="textInput" title="Text Input">
			  	<Container>
			  	Text Input
			  	</Container>
			  </Tab>
			  <Tab eventKey="uploadPDF" title="Upload PDF">
			  	Upload PDF
			  </Tab>
			</Tabs>
        </Container>
    );
}

const Container = styled("div")`
    height: 100%;
    width: 36vw;
    background-color: ${colors.WHITE};
    /* border: 1px solid red; */
`;


export default Input;