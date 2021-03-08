import React, {Component, useState} from 'react';
import styled from '@emotion/styled';
import {Tabs, Tab, Tooltip} from 'react-bootstrap';
import Dropzone from 'react-dropzone';

import {colors} from '../../constants/styles';
import {input} from '../../constants/input-mode';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Input.css';

/**
 * Class Input component.
 * @class
 */
class Input extends Component {
	/**
	 * Constructor which intializes component's state
	 * Current state includes text, file, fileSize, isFileSelected, and inputType values
	 * @constructor
	 * @param {object} props - updateOutput and setCalculating function: to manipulate and
	 * set EULA claffication and state values in other components
	 */
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			file: null,
			fileSize: null,
			isFileSelected: false,
			inputType: input.TEXT,
		};
	}

	/**
	 * Updates this.state.text value
	 * @function updateText
	 * @param {event} e - event decription and metadata
	 */
	updateText = (e) => {
		console.log('INPUT TYPE:', this.state.inputType);
		e.preventDefault();
		this.setState({text: e.target.value});
	};

	/**
	 * Sends input of either text or PDF to Flask endpoint
	 * @function sendInput
	 * @param {event} e - event decription and metadata
	 */
	sendInput = (e) => {
		e.preventDefault();
		if (this.state.inputType === input.TEXT) {
			if (this.state.text.length > 0) {
				this.props.setCalculating();
				axios
					.post(
						'/text',
						{text: this.state.text},
						{
							headers: {
								'Content-type': 'application/json; charset=UTF-8',
								'Access-Control-Allow-Origin': '*',
								'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
							},
						}
					)
					.then(
						(response) => {
							console.log(response.data);
							this.props.updateOutput(response.data);
						},
						(error) => {
							console.log(error);
							this.props.updateOutput(error);
						}
					);
			}
		} else {
			if (this.state.isFileSelected && this.state.file !== null) {
				const formData = new FormData();
				formData.append('file', this.state.file, this.state.file.name);
				this.props.setCalculating();
				axios
					.post('/pdf', formData, {
						headers: {
							'Content-type': 'application/json; charset=UTF-8',
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
						},
					})
					.then(
						(response) => {
							console.log(response.data);
							this.props.updateOutput(response.data);
						},
						(error) => {
							console.log(error);
							this.props.updateOutput(error);
						}
					);
			}
		}
	};

	/**
	 * Set this.state.inputType value to associated key value
	 * @function setInputType
	 * @param {int} key - determines between text and PDF input
	 */
	setInputType = (key) => {
		this.setState({inputType: key});
	};

	/**
	 * Only sends a single accepted file, and logs rejected files
	 * @function handleDrop
	 * @param {file[]} acceptedFiles} - list of accepted files
	 * @param {file[]} rejectedFiles} - list of rejected files
	 * @return {void}
	 */
	handleDrop = (acceptedFiles, rejectedFiles) => {
		if (acceptedFiles) {
			if (acceptedFiles.length != 1) {
				console.log('Cannot upload multiple files');
				return;
			}
			this.setState({file: acceptedFiles[0]});
			this.setState({isFileSelected: true});

			console.log('FILE:', this.state.file);
		}
		if (rejectedFiles && rejectedFiles.length) {
			rejectedFiles.map((file) => {
				// TODO: Handle input error
				console.log('ERROR', file.errors);
			});
		}
	};

	/**
	 * determines size of file
	 * @function bytesToSize
	 * @param {int} bytes - list of accepted files
	 * @return {int} - total size
	 */
	bytesToSize = (bytes) => {
		let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) return '0 Byte';
		let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	};
	/**
	 * Function to render componnent to screen
	 * @function render
	 * @return {JSX.Element} returns either the text box or file drop input screens
	 */
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
								<UploadContainerInner>
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

									{this.state.file && (
										<UploadedFileBox>
											<UploadedFileBoxLeft>
												<PDFImage src="pdf.png" />
											</UploadedFileBoxLeft>
											<UploadedFileBoxRight>
												<UploadedFileBoxRightTop>
													<FileName>{this.state.file.name}</FileName>
													<FileSize>{this.bytesToSize(this.state.file.size)}</FileSize>
												</UploadedFileBoxRightTop>
												<Uploading>Ready to upload</Uploading>
											</UploadedFileBoxRight>
										</UploadedFileBox>
									)}
								</UploadContainerInner>
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
					Calculate
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
	font-size: 1.8vh;
	letter-spacing: 0.2vh;
	line-height: 2vh;
	color: ${colors.GRAY};
	text-align: left;
	text-transform: uppercase;
`;

const FileName = styled.div`
	font-size: 3vh;
	color: ${colors.CHARCOAL};
`;

const FileSize = styled.div`
	font-size: 3vh;
	color: ${colors.GRAY};
`;

const UploadedFileBox = styled.div`
	height: 6.5vh;
	width: 80%;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 4vh;
	font-size: 2.5vh;
	line-height: 3vh;
`;

const UploadedFileBoxLeft = styled.div`
	width: 15%;
`;

const PDFImage = styled.img`
	height: 100%;
`;

const UploadContainerInner = styled.div`
	height: auto;
	width: 100%;
`;

const UploadContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const FileImage = styled.img`
	width: 14vw;
	height: auto;
	margin-left: auto;
	margin-right: auto;
`;

const DragAndDropText = styled.div`
	color: ${colors.CHARCOAL};
	margin-top: 5vh;
`;

const OrText = styled.div`
	color: ${colors.GRAY};
`;

const BrowseComputerText = styled.div`
	color: ${colors.DARKER_PURPLE};
`;

const Container = styled.div`
	height: 65vh;
	width: 36vw;
	background-color: ${colors.WHITE};
`;

const CalculateButton = styled.button`
	background: linear-gradient(${colors.DARK_PURPLE}, ${colors.DARKER_PURPLE});
	color: ${colors.WHITE};
	margin-top: 3vh;
	border: none !important;
	font-weight: bold;
	font-size: 2.5vh;
	text-transform: uppercase;
	height: 6vh;
	width: 100%;
	border-radius: 3.5px;
	padding: auto;
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
	font-size: 2.5vh;
	padding: 5px 10px;
	border: none !important;
	&:focus {
		outline: none !important;
	}
`;

export default Input;
