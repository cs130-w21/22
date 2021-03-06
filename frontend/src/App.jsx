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

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			summary_value: {classification: "unethical", error: "None", summary: "Company will notify Customer before Customer exceeds the Title Request Use Limit indicated on the Order Form. Company will invoice Customer for Overages on written notice (which may be by email). If, after 30 days from the date of that written notice, Company may stop providing the Service to the Customer. ."}
			// summary_value: {classification: "", error: "", summary: ""}
			
		}
	}

	updateShared(value) {
        this.setState({summary_value: value});
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
						<Input summary_value={this.state.summary_value} updateShared={this.updateShared}/>
					</BodyBoxHalf>
					<BodyBoxHalf>
						<Output summary_value={this.state.summary_value}/>
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

	font-size: 36px;
	font-weight: 700;
	line-height: 48px;
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
