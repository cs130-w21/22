import React, { Component } from "react";
import styled from "@emotion/styled";
import { colors } from "../../constants/styles";
import { Tabs, Tab, Sonnet } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Input.css'


class Input extends Component {
	constructor(props){
		super(props);
		this.state = {
			"text":""
		}

	}

	updateText = (e) => {
		e.preventDefault()
		this.setState({"text":e.target.value})
	}

	getText = (e) => {
		if(this.state.text.length > 0){
			alert("Do something with this text: "+this.state.text)
		}
		// TODO: send this text to the server
		
		this.setState({"text":""})
	}

	render() {
		return (
	    	<div>
		    	<Container>
		        	<Tabs defaultActiveKey="textInput" id="uncontrolled-tab-example">
					  <Tab eventKey="textInput" title="Text Input">
					  		<textarea className="field" placeholder="Paste your agreement" 
					  		onChange={this.updateText} value={this.state.text}/>	  	
					  </Tab>
					  <Tab eventKey="uploadPDF" title="Upload PDF">
					  	Upload PDF
					  </Tab>
					</Tabs>
		    	</Container>
		    	<button onClick={this.getText}>Calculate</button>
		    </div>
    	);

	}
    
}

const Container = styled("div")`
    height: 90%;
    width: 36vw;
    background-color: ${colors.WHITE};
    /* border: 1px solid red; */
`;



export default Input;