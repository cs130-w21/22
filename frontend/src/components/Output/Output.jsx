import React, {Component} from 'react';
import styled from '@emotion/styled';
import {colors} from '../../constants/styles';

class Output extends Component {
	constructor(props) {
		super(props);
		this.state = {
			outputState: 0 /* 0 = not ready, 1 = valid response, 2 = error */,
			error: '',
			ethical: 'ethical',
			summary:
				'Company will notify Customer before Customer exceeds the Title Request Use Limit indicated on the Order Form. Company will invoice Customer for Overages on written notice (which may be by email). If, after 30 days from the date of that written notice, Company may stop providing the Service to the Customer',
		};
	}

	componentWillReceiveProps(props) {
		let response = props.updateResponse;
		if (response.error == 'None') {
			this.setState({
				outputState: 1,
				error: '',
				ethical: response.classification,
				summary: response.summary,
			});
		} else {
			this.setState({
				outputState: 2,
				error: response.error,
				ethical: '',
				summary: '',
			});
		}
		console.log('PROPS:', props.updateResponse.classification);
	}

	render() {
		return (
			<Container>
				<TopBar />
				<BelowTopBar>
					{this.state.outputState == 0 && <div>not ready</div>}
					{this.state.outputState == 1 && (
						<>
							<YourEulaAnalysis>Your EULA Analysis</YourEulaAnalysis>
							<EulaAnalysisTop>
								<Header>Your EULA is:</Header>
								<EthicalityBar ethical={this.state.ethical}>{this.state.ethical}</EthicalityBar>
							</EulaAnalysisTop>
							<EulaAnalysisBottom>
								<Header>Summary:</Header>
								<SummaryText>{this.state.summary}</SummaryText>
							</EulaAnalysisBottom>
						</>
					)}
					{this.state.outputState == 2 && (
						<>
							<div>{this.state.error}</div>
						</>
					)}
				</BelowTopBar>
			</Container>
		);
	}
}

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
	background-color: ${(props) => (props.ethical == 'ethical' ? '#9EBEAF' : '#FFC4BB')};
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
	/* margin-top: 14px; */
	/* margin-bottom: 6px; */
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

/////////

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
