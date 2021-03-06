import React, {Component} from 'react';
import styled from '@emotion/styled';
import {colors} from '../../constants/styles';

class Output extends Component {
	constructor(props) {
		super(props);
		this.state = {
			classification: this.props.summary_value.classification,
			error: this.props.summary_value.error,
			summary: this.props.summary_value.summary
		};
	}



	render() {
		console.log(this.props)
		return (
			<Container>
				<TopBar />
				<BelowTopBar>
					<YourEulaAnalysis>YOUR EULA ANALYSIS</YourEulaAnalysis>
					{/*<Header>ETHICALITY SCORE</Header>
					<PercentageBar>
						<PercentageBarInner widthPercentage={this.state.ethicalityScore} color="#9EBEAF">
							<PercentageNumber>{this.state.ethicalityScore}%</PercentageNumber>
						</PercentageBarInner>
					</PercentageBar>
					<Header>CONFIDENCE SCORE</Header>
					<PercentageBar>
						<PercentageBarInner widthPercentage={this.state.confidenceScore} color="#FFCBA1">
							<PercentageNumber>{this.state.confidenceScore}%</PercentageNumber>
						</PercentageBarInner>
					</PercentageBar>*/}
					<Header>
						YOUR EULA IS:
						<EthicalityBanner ethical_value={this.state.classification}> 
							{this.state.classification.charAt(0).toUpperCase() + this.state.classification.slice(1)}
						</EthicalityBanner>
					</Header> 
					<Header>SUMMARY</Header>
					<SummaryPoint>
						<SummaryText>{this.state.summary}</SummaryText>
					</SummaryPoint>
				</BelowTopBar>
			</Container>
		);
	}
}

const gang = (value) => {
	if(value === "unethical") {
		return "#ff9e8e";
	}
	if(value === "ethical") {
		return "#9EBEAF";
	}
	
}
const EthicalityBanner = styled.span`

	background-color: ${(props) => gang(props.ethical_value) };
	padding: 1.5% 9%;
	margin-left: 40px;
`;

const BulletPoint = styled.div`
	width: 8px;
	height: 8px;
	margin-top: 8px;
	background-color: ${colors.DARK_PURPLE};
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const SummaryText = styled.div`
	width: 94%;
	font-size: 14px;
	letter-spacing: -0.5px;

`;

const SummaryPoint = styled.div`
	width: 100%;
	text-align: left;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 10px;
	padding: 0px 40px;
`;

const PercentageNumber = styled.div`
	width: 100%;
	font-weight: bolder;
	font-size: 18px;
	color: ${colors.BLACK};
	text-align: right;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const PercentageBarInner = styled.div`
	width: ${(props) => props.widthPercentage}%;
	height: 100%;
	background-color: ${(props) => props.color};
	padding-right: 10px;
`;

const PercentageBar = styled.div`
	width: 100%;
	height: 40px;
	background-color: ${colors.LIGHTER_GRAY};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const BelowTopBar = styled.div`
	width: 100%;
	padding: 16px 28px;
`;

const Header = styled.div`
	width: 100%;
	font-weight: bolder;
	font-size: 14px;
	letter-spacing: 1px;
	color: ${colors.BLACK};
	text-align: left;
	margin-top: 14px;
	margin-bottom: 6px;
`;

const YourEulaAnalysis = styled.div`
	width: 100%;
	font-weight: bolder;
	font-size: 22px;
	letter-spacing: 2px;
	color: ${colors.DARKER_PURPLE};
`;

const TopBar = styled.div`
	height: 6px;
	width: 100%;
	background-color: ${colors.DARK_PURPLE};
`;

const Container = styled.div`
	height: 480px;
	width: 36vw;
	background-color: ${colors.WHITE};
	overflow-y: scroll;
`;

export default Output;
