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
					{this.state.outputState == 0 && (
						<>
							<IdleContainer>
								<IdleImage Image src="idle.png" />
							</IdleContainer>
						</>
					)}
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
							<ErrorContainer>
								<ErrorContainerInner>
									<ErrorImage Image src="error.png" />
									<Oops>Oops!</Oops>
									<ErrorMessage>{this.state.error}</ErrorMessage>
								</ErrorContainerInner>
							</ErrorContainer>
						</>
					)}
				</BelowTopBar>
			</Container>
		);
	}
}

////////////////////// Idle ///////////////////////

const IdleContainer = styled.div`
	height: 100%;
	width: 100%;
	text-align: center;
`;

const IdleImage = styled.img`
	height: 68vh;
	width: auto;
	margin-left: auto;
	margin-right: auto;
`;

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

////////////////////// Error ///////////////////////

const ErrorContainer = styled.div`
	height: 100%;
	width: 100%;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const ErrorContainerInner = styled.div`
	height: 80%;
	width: 100%;
	text-align: center;
`;

const ErrorImage = styled.img`
	height: 36vh;
	width: auto;
	margin-left: auto;
	margin-right: auto;
`;

const Oops = styled.div`
	height: auto;
	width: 100%;
	text-align: center;
	margin-top: 5vh;

	font-size: 3.8vh;
	text-transform: uppercase;
	color: ${colors.RED};
	font-weight: bold;
	letter-spacing: 0.2vw;
`;

const ErrorMessage = styled.div`
	font-size: 2.6vh;
	line-height: 3.4vh;
	margin-top: 1vh;
	letter-spacing: 0.05vw;
`;

////////////////////// General ///////////////////////

const BelowTopBar = styled.div`
	margin-left: auto;
	margin-right: auto;
	margin-top: 2vh;
	margin-bottom: 2vh;
	width: 96%;
	padding: 0px 28px;
	height: 69vh;
	overflow-y: scroll;
`;

const TopBar = styled.div`
	height: 1vh;
	width: 100%;
	background-color: ${colors.DARK_PURPLE};
`;

const Container = styled.div`
	height: 74vh;
	width: 36vw;
	background-color: ${colors.WHITE};
`;

export default Output;
