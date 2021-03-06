import React, {Component} from 'react';
import styled from '@emotion/styled';
import {css, Global} from '@emotion/react';

import {colors} from './constants/styles';

import Input from './components/Input/Input';
import Output from './components/Output/Output';

const globalStyles = (
	<Global
		styles={css`
			html,
			body {
				padding: 0;
				margin: 0;
				font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
					Droid Sans, Helvetica Neue, sans-serif;
				letter-spacing: 0.5px;
			}
			a {
				color: inherit;
				text-decoration: none;
			}
			* {
				box-sizing: border-box;
			}
		`}
	/>
);

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			outputState: 0 /* 0 = idle, 1 = calculating, 2 = valid response, 3 = error */,
			error: '',
			classification: '',
			summary: '',
		};
		this.updateOutputState = this.updateOutputState.bind(this);
		this.setCalculating = this.setCalculating.bind(this);
	}

	updateOutputState(response) {
		if (response.error == 'None') {
			this.setState({
				outputState: 2 /* valid response */,
				error: '',
				classification: response.classification,
				summary: response.summary,
			});
		} else {
			this.setState({
				outputState: 3 /* error */,
				error: response.error,
				classification: '',
				summary: '',
			});
		}
	}

	setCalculating() {
		this.setState({
			outputState: 1 /* calculating */,
			error: '',
			classification: '',
			summary: '',
		});
	}

	render() {
		return (
			<Container>
				{globalStyles}
				<HeaderBox>
					<HeaderTop>
						<Logo src="logo.png" />
					</HeaderTop>
					<HeaderBottom>
						<Headline>How ethical is your end user license agreement?</Headline>
					</HeaderBottom>
				</HeaderBox>
				<BodyBox>
					<BodyBoxHalf>
						<Input updateOutput={this.updateOutputState} setCalculating={this.setCalculating} />
					</BodyBoxHalf>
					<BodyBoxHalf>
						<Output updateResponse={this.state} />
					</BodyBoxHalf>
				</BodyBox>
			</Container>
		);
	}
}

const HeaderBox = styled('div')`
	width: 100%;
	height: 22vh;
`;

const HeaderTop = styled('div')`
	height: 15%;
	width: 100%;
	text-align: left;
`;

const HeaderBottom = styled('div')`
	height: 85%;
	width: 100%;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const Headline = styled('div')`
	margin: auto;
	width: 50%;
	text-align: center;
	font-size: 5.5vh;
	font-weight: 700;
	line-height: 7vh;
`;

const Logo = styled('img')`
	width: 6vw;
	height: auto;
`;

const Container = styled('div')`
	text-align: center;
	background: linear-gradient(white, #dcdeff);
	padding: 3vh 5vw 8vh 5vw;
	height: 100%;
`;

const BodyBox = styled('div')`
	margin-left: auto;
	margin-right: auto;
	width: 100%;
	min-height: 75vh;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const BodyBoxHalf = styled('div')`
	width: 100%;
	min-height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	padding-top: 5vh;
	padding-bottom: 5vh;
`;

export default App;
