import React, {Component} from 'react';
import styled from '@emotion/styled';
import {colors} from '../../constants/styles';

class Output extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ethicalityScore: 80,
			confidenceScore: 60,
			points: [
				'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
				"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
				'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
			],
		};
	}

	render() {
		return (
			<Container>
				<TopBar />
				<BelowTopBar>
					<YourEulaAnalysis>YOUR EULA ANALYSIS</YourEulaAnalysis>
					<Header>ETHICALITY SCORE</Header>
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
					</PercentageBar>
					<Header>SUMMARY</Header>
					{this.state.points.map((point) => (
						<SummaryPoint>
							<BulletPoint />
							<SummaryText>{point}</SummaryText>
						</SummaryPoint>
					))}
				</BelowTopBar>
			</Container>
		);
	}
}

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
