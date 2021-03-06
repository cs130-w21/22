import React, {Component, useState} from 'react';
import styled from '@emotion/styled';
import {Tabs, Tab, Tooltip} from 'react-bootstrap';
import Dropzone from 'react-dropzone';

import {colors} from '../../constants/styles';
import {input} from '../../constants/input-mode';

import axios from 'axios';

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
				axios.post("/text",
					{text: this.state.text},
					{
						headers: {
						"Content-type": "application/json; charset=UTF-8",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
						}
					}
					).then((response) => {
					console.log(response.data);
					}, (error) => {
					console.log(error);
					});
				
				
			}
		}
		// if (this.state.inputType === input.FILE) {
		else{
			if (this.state.isFileSelected && this.state.file !== null) {
				alert('Sending file!');
				const formData = new FormData();
					formData.append(
			        "file",
			        this.state.file,
			        this.state.file.name
		      	);
				axios.post("/pdf",formData,
					{
						headers: {
						"Content-type": "application/json; charset=UTF-8",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
						}
					}
				).then((response) => {
				console.log(response.data);
				}, (error) => {
				console.log(error);
				});
			}
		}
	};

	setInputType = (key) => {
		this.setState({inputType: key});
	};

	handleDrop = (acceptedFiles, rejectedFiles) => {
		if (acceptedFiles) {
			if (acceptedFiles.length != 1) {
				console.log('Cannot upload multiple files');
				return;
			}
			this.setState({file: acceptedFiles[0]});
			this.setState({isFileSelected: true});
			console.log('ACCEPTED FILE', acceptedFiles[0]);
		}
		if (rejectedFiles && rejectedFiles.length) {
			rejectedFiles.map((file) => {
				console.log('ERROR', file.errors);
			});
		}
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
							<UploadContainer>
								<Dropzone onDrop={this.handleDrop} multiple="false" accept="application/pdf">
									{({getRootProps, getInputProps}) => (
										<div {...getRootProps({className: 'dropzone'})}>
											<input {...getInputProps()} />
											<FileImage src="files.png" />
											<DragAndDropText>Drag and drop your file here</DragAndDropText>
											<OrText>or</OrText>
											<BrowseComputerText>Browse your computer</BrowseComputerText>
										</div>
									)}
								</Dropzone>
								{/* <input type="file" onChange={this.getFile} /> */}

								{this.state.file && (
									<UploadedFileBox>
										<UploadedFileBoxLeft>
											<PDFImage src="pdf.png" />
										</UploadedFileBoxLeft>
										<UploadedFileBoxRight>
											<UploadedFileBoxRightTop>
												<FileName>{this.state.file.name}</FileName>
												<Percentage>0%</Percentage>
											</UploadedFileBoxRightTop>
											<Uploading>UPLOADING</Uploading>
											<UploadBar />
										</UploadedFileBoxRight>
									</UploadedFileBox>
								)}
							</UploadContainer>
						</Tab>
					</Tabs>
				</Container>
				<CalculateButton
					onClick={this.sendInput}
					disabled={
						(this.state.inputType == input.TEXT && this.state.text.length === 0) ||
						(this.state.inputType == input.FILE && this.state.isFileSelected === null)
					}
				>
					CALCULATE
				</CalculateButton>
			</div>
		);
	}
}

const UploadedFileBoxRightTop = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const UploadedFileBoxRight = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Uploading = styled.div`
	font-size: 10px;
	letter-spacing: 1px;
	color: ${colors.GRAY};
	text-align: left;
`;

const UploadBar = styled.div`
	width: 100%;
	height: 6px;
	background-color: ${colors.LIGHTER_GRAY};
`;

const FileName = styled.div`
	color: ${colors.CHARCOAL};
`;

const Percentage = styled.div`
	color: ${colors.GRAY};
`;

const UploadedFileBox = styled.div`
	height: 50px;
	width: 80%;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const UploadedFileBoxLeft = styled.div`
	width: 15%;
`;

const PDFImage = styled.img`
	height: 100%;
`;

const UploadContainer = styled.div`
	height: 380px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding-top: 26px;
	padding-bottom: 22px;
`;

const FileImage = styled.img`
	width: 14vw;
	height: auto;
	margin-left: auto;
	margin-right: auto;
`;

const DragAndDropText = styled.div`
	color: ${colors.CHARCOAL};
	margin-top: 20px;
`;

const OrText = styled.div`
	color: ${colors.GRAY};
`;

const BrowseComputerText = styled.div`
	color: ${colors.DARKER_PURPLE};
`;

const Container = styled.div`
	height: 420px;
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
