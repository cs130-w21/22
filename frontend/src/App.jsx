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
			outputState: 0 /* 0 = not ready, 1 = valid response, 2 = error */,
			output: '',
		};
		this.handleResponse = this.handleResponse.bind(this);
	}

	handleResponse(response) {
		this.setState({output: response});
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
						<Input getResponse={this.handleResponse} />
					</BodyBoxHalf>
					<BodyBoxHalf>
						<Output updateResponse={this.state.output} />
					</BodyBoxHalf>
				</BodyBox>
			</Container>
		);
	}
}

const HeaderBox = styled('div')`
	/* border: 1px solid red; */
	width: 100%;
	height: 22vh;
`;

const HeaderTop = styled('div')`
	/* border: 1px solid red; */
	height: 15%;
	width: 100%;

	text-align: left;
`;

const HeaderBottom = styled('div')`
	/* border: 1px solid red; */
	height: 85%;
	width: 100%;
	text-align: center;

	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const Headline = styled('div')`
	margin: auto;
	/* border: 1px solid red; */
	width: 50%;
	text-align: center;

	font-size: 5.5vh;
	font-weight: 700;
	line-height: 7vh;
`;

const Logo = styled('img')`
	/* border: 1px solid red; */
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
	/* border: 1px solid red; */

	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const BodyBoxHalf = styled('div')`
	width: 100%;
	min-height: 100%;
	/* border: 1px solid red; */
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	padding-top: 5vh;
	padding-bottom: 5vh;
`;

export default App;
