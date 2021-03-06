import React, {Component} from 'react';
import styled from '@emotion/styled';
import {colors} from '../../constants/styles';

class Output extends Component {
	constructor(props) {
		super(props);
		this.state = {
			outputState: 0 /* 0 = idle, 1 = calculating, 2 = valid response, 3 = error */,
			error: '',
			classification: '',
			summary: '',
		};
	}

	componentWillReceiveProps(props) {
		this.setState(props.updateResponse);
	}

	render() {
		return (
			<Container>
				<TopBar />
				<BelowTopBar>
					{this.state.outputState == 0 && <div>not ready</div>}
					{this.state.outputState == 1 && (
						<>
							{/* TODO (Ruban): Calculating screen */}
							<div>Calculating</div>
						</>
					)}
					{this.state.outputState == 2 && (
						<>
							<YourEulaAnalysis>Your EULA Analysis</YourEulaAnalysis>
							<EulaAnalysisTop>
								<Header>Your EULA is:</Header>
								<EthicalityBar classification={this.state.classification}>{this.state.classification}</EthicalityBar>
							</EulaAnalysisTop>
							<EulaAnalysisBottom>
								<Header>Summary:</Header>
								<SummaryText>{this.state.summary}</SummaryText>
							</EulaAnalysisBottom>
						</>
					)}
					{this.state.outputState == 3 && (
						<>
							<div>{this.state.error}</div>
						</>
					)}
				</BelowTopBar>
			</Container>
		);
	}
}

////////////////////// TODO (Stephanie): Not ready ///////////////////////

////////////////////// TODO (Ruban): Calculating ///////////////////////

////////////////////// Valid response ///////////////////////

const YourEulaAnalysis = styled.div`
	width: 100%;
	font-weight: bolder;
	font-size: 4vh;
	letter-spacing: 2px;
	text-transform: uppercase;
	color: ${colors.DARKER_PURPLE};
`;

const EulaAnalysisTop = styled.div`
	height: 100%;
	width: 98%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 3vh;
`;

const EthicalityBar = styled.div`
	height: 5vh;
	width: 100%;
	background-color: ${(props) => (props.classification == 'ethical' ? '#9EBEAF' : '#FFC4BB')};
	padding-right: 10px;
	margin-top: 1vh;
	text-transform: uppercase;
	font-weight: bolder;
	font-size: 18px;
	color: ${colors.BLACK};
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const Header = styled.div`
	width: 100%;
	font-weight: bolder;
	font-size: 2.5vh;
	letter-spacing: 1px;
	color: ${colors.BLACK};
	text-align: left;
	text-transform: uppercase;
`;

const EulaAnalysisBottom = styled.div`
	margin-top: 3vh;
`;

const SummaryText = styled.div`
	width: 94%;
	font-size: 2.4vh;
	text-align: left;
	margin-top: 2vh;
	margin-left: 2vw;
`;

////////////////////// TODO (Stephanie): Error ///////////////////////

////////////////////// General ///////////////////////

const BelowTopBar = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 96%;
	padding: 16px 28px;
`;

const TopBar = styled.div`
	height: 6px;
	width: 100%;
	background-color: ${colors.DARK_PURPLE};
`;

const Container = styled.div`
	height: 74vh;
	width: 36vw;
	background-color: ${colors.WHITE};
	overflow-y: scroll;
`;

export default Output;
