import React, {Component} from 'react';
import styled from '@emotion/styled';
import {Tabs, Tab, Tooltip} from 'react-bootstrap';

import {colors} from '../../constants/styles';
import {input} from '../../constants/input-mode';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Input.css';

class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			file: null,
			isFileSelected: false,
			inputType: input.TEXT,
		};
	}

	updateText = (e) => {
		console.log('INPUT TYPE:', this.state.inputType);
		e.preventDefault();
		this.setState({text: e.target.value});
	};

	getFile = (e) => {
		console.log('INPUT TYPE:', this.state.inputType);
		console.log(e.target.files[0]);
		this.setState({file: e.target.files[0]});
		this.setState({isFileSelected: true});
	};

	sendInput = (e) => {
		e.preventDefault();
		if (this.state.inputType === input.TEXT) {
			if (this.state.text.length > 0) {
				alert('Do something with this input text: ' + this.state.text);
				// TODO: send this text to the server
			}
		}
		if (this.state.inputType === input.FILE) {
			if (this.state.isFileSelected && this.state.file !== null) {
				alert('Sending file!');
				// TODO: send this file over the server
			}
		}
	};

	setInputType = (key) => {
		this.setState({inputType: key});
	};

	render() {
		return (
			<div>
				<Container>
					<Tabs defaultActiveKey={input.TEXT} onSelect={this.setInputType}>
						<Tab eventKey={input.TEXT} title="TEXT INPUT">
							<TextInput placeholder="Paste your agreement" onChange={this.updateText} value={this.state.text} />
						</Tab>
						<Tab eventKey={input.FILE} title="UPLOAD PDF">
							<input type="file" onChange={this.getFile} />
						</Tab>
					</Tabs>
				</Container>
				<CalculateButton
					onClick={this.sendInput}
					disabled={
						(this.state.inputType == input.TEXT && !this.state.text) ||
						(this.state.inputType == input.FILE && !this.state.isFileSelected)
					}
				>
					CALCULATE
				</CalculateButton>
			</div>
		);
	}
}

const Container = styled.div`
	height: 90%;
	width: 36vw;
	background-color: ${colors.WHITE};
`;

const CalculateButton = styled.button`
	background: linear-gradient(${colors.DARK_PURPLE}, ${colors.DARKER_PURPLE});
	color: ${colors.WHITE};
	margin-top: 3vh;
	border: none !important;
	font-weight: bold;
	width: 100%;
	border-radius: 3.5px;
	padding: 10px !important;
	opacity: 1;
	transition: 0.3s;
	letter-spacing: 1px !important;
	&:disabled {
		background: ${colors.DARK_PURPLE};
		opacity: 0.8;
	}
	&:hover:enabled {
		opacity: 0.9;
	}
`;

const TextInput = styled('textarea')`
	width: 100%;
	height: 100%;
	resize: none;

	padding: 5px 10px;
	border: none !important;

	&:focus {
		outline: none !important;
	}
`;

export default Input;
