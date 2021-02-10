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
			"text":"",
			"file": null,
			"inputType": 1
		}

	}

	updateText = (e) => {
		e.preventDefault()
		this.setState({"text":e.target.value})
	}

	getFile = (e) => {
		console.log(e.target.files[0])
		this.setState({file: e.target.files[0]});
	}

	sendInput = (e) => {
		e.preventDefault()
		if(this.state.inputType === 1){
			if(this.state.text.length > 0){
				alert("Do something with this input text: "+this.state.text)
				// TODO: send this text to the server
			}
			
		}
		if(this.state.inputType === 2){
			if(this.state.file !== null){
				alert("Sending file!")
				// TODO: send this file over the server
			}
			
		}
		
		
		this.setState({"text":""})
	}

	setInputType = (key) => {
		let keyVal = Number(key.target.id.slice(-1))
		this.setState({"inputType": keyVal})
	}
 
	render() {
		return (
	    	<div>
		    	<Container>
		        	<Tabs defaultActiveKey={1} id="uncontrolled-tab-example" onClick={this.setInputType}>
					  <Tab eventKey={1} title="Text Input"  >
					  		<textarea className="field" placeholder="Paste your agreement" 
					  		onChange={this.updateText} value={this.state.text}/>	  	
					  </Tab>
					  <Tab eventKey={2} title="Upload PDF">
					  	<input type="file" onChange={this.getFile}/>
					  </Tab>
					</Tabs>
		    	</Container>
		    	<button onClick={this.sendInput} className="calculateButton">Calculate</button>
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