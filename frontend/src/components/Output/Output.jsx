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
			<Container state={this.state.outputState}>
				<TopBar />
				<BelowTopBar state={this.state.outputState}>
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
							<YourEulaAnalysis>Calculating</YourEulaAnalysis>
							<CalculatingContainer>
								<CalculatingBackground src="calculating_background.png" />
								<Circle />
								<CalcImage src="calculating.png" />
							</CalculatingContainer>

							{/* <CalcHeaderWrapper>
								<CalcHeader>
									Hold On tight for<br></br>your result
								</CalcHeader>
								<BigBar></BigBar>
							</CalcHeaderWrapper>
							<CalcTextContainer>
								<CalcHeaderSummary>Summary</CalcHeaderSummary>
								<CalcBarGroup>
									<CalcGreyBar width="50vh">.</CalcGreyBar>
									<CalcGreyBar width="50vh">.</CalcGreyBar>
									<CalcGreyBar width="37vh">.</CalcGreyBar>
								</CalcBarGroup>
								<CalcBarGroup>
									<CalcGreyBar width="50vh">.</CalcGreyBar>
									<CalcGreyBar width="37vh">.</CalcGreyBar>
								</CalcBarGroup>
								<CalcBarGroup>
									<CalcGreyBar width="50vh">.</CalcGreyBar>
									<CalcGreyBar width="50vh">.</CalcGreyBar>
									<CalcGreyBar width="37vh">.</CalcGreyBar>
								</CalcBarGroup>
								<CalcBarGroup>
									<CalcGreyBar width="50vh">.</CalcGreyBar>
									<CalcGreyBar width="50vh">.</CalcGreyBar>
									<CalcGreyBar width="37vh">.</CalcGreyBar>
								</CalcBarGroup>
							</CalcTextContainer> */}
							{/* <CalcContainer></CalcContainer> */}
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

const CalculatingContainer = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	top: 0;
	left: 0;
`;

const CalculatingBackground = styled.img`
	height: auto;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 2vh;

	position: relative;
	top: 0;
	left: 0;
	/* border: 1px blue solid; */
`;

const Circle = styled.div`
	height: 50vh;
	width: 50vh;
	position: absolute;
	top: 2vh;
	left: 3.5vw;
	z-index: 2;

	border: 3vh solid ${colors.DARK_PURPLE};
	border-image-slice: 1;
	border-image-source: linear-gradient(to left, #743ad5, #d53a9d);

	--angle: 0deg;
	border-image: linear-gradient(var(--angle), ${colors.DARK_PURPLE}, rgba(255, 255, 255, 0)) 1;
	animation: 5s rotate linear infinite;

	box-sizing: border-box;
	border-radius: 50% !important;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;

	@keyframes rotate {
		to {
			--angle: 360deg;
		}
	}
	@property --angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}
`;

const CalcImage = styled.img`
	height: 55vh;
	position: absolute;
	top: 9vh;
	left: 10vw;
	z-index: 4;
	/* border: 1px green solid; */
`;

const CalcContainer = styled.div`
	height: 100%;
	width: 100%;
	text-align: center;
	position: relative;
	overflow: hidden;
	/* border: 1px solid red; */
`;

const CalcHeaderWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	/* border: solid 1px red; */
`;

const BigBar = styled.div`
	background: ${colors.BAR_GRAY};
	height: 5vh;
	width: 20vh;
	margin: 0 auto;
	margin-top: 2.5vh;
	color: ${colors.BAR_GRAY};
`;

const CalcHeader = styled.div`
	width: 100%;
	font-weight: bolder;
	font-size: 2.5vh;
	letter-spacing: 1px;
	color: ${colors.TEXT_GRAY};
	text-align: left;
	text-transform: uppercase;
	margin-top: 2.5vh;
`;

const CalcHeaderSummary = styled.div`
	width: 100%;
	font-weight: bolder;
	font-size: 2.5vh;
	letter-spacing: 1px;
	color: ${colors.TEXT_GRAY};
	text-align: left;
	text-transform: uppercase;
	margin-top: 2.5vh;
`;

const CalcTextContainer = styled.div`
	position: absolute;
	overflow: hidden;
	border: solid 1px red;
`;

const CalcGreyBar = styled.div`
	margin-top: 1vh;
	width: ${(props) => props.width};
	height: 1.5vh;
	background: ${colors.BAR_GRAY};
	color: ${colors.BAR_GRAY};
`;

const CalcBarGroup = styled.div`
	margin-top: 5vh;
	padding-left: 20px;
	padding-right: 20px;
`;

/* Rectangle 497 */

// position: absolute;
// width: 348px;
// height: 13px;
// left: 873px;
// top: 555px;

// background: #D1D0D0;

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
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 3vh;
	margin-left: 2vw;
	margin-right: 2vw;
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
	margin-left: 2vw;
	margin-right: 2vw;
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
	margin-left: 2vw;
	margin-right: 2vw;
`;

////////////////////// General ///////////////////////

let setOverflow = (value) => {
	if (value === 1) {
		return 'none';
	} else {
		return 'scroll';
	}
};

const BelowTopBar = styled.div`
	margin-left: auto;
	margin-right: auto;
	margin-top: 2vh;
	margin-bottom: 2vh;
	width: 96%;
	/* padding: 0px 28px; */
	height: 69vh;
	overflow-y: ${(props) => setOverflow(props.state)};
`;

const TopBar = styled.div`
	height: 1vh;
	width: 100%;
	background-color: ${colors.DARK_PURPLE};
`;

let setColor = (value) => {
	if (value === 1) {
		return colors.LIGHTEST_GRAY;
	} else {
		return colors.WHITE;
	}
};

const Container = styled.div`
	height: 74vh;
	width: 36vw;
	background-color: ${(props) => setColor(props.state)};
`;

export default Output;
