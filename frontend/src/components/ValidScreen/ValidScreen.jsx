import styled from '@emotion/styled';
import {colors} from '../../constants/styles';

/**
 * ValidScreen component.
 * @module
 */

/**
 * Creates screen to be displayed when user is in valid state
 * @param {object} props
 * @return {JSX.Element} Displays ethicality classification and EULA summary
 */

const ValidScreen = (props) => {
	return(
		<>
			<YourEulaAnalysis>Your EULA Analysis</YourEulaAnalysis>
			<EulaAnalysisTop>
				<Header>Your EULA is:</Header>
				<EthicalityBar classification={props.classification}>{props.classification}</EthicalityBar>
			</EulaAnalysisTop>
			<EulaAnalysisBottom>
				<Header>Summary:</Header>
				<SummaryText>{props.summary}</SummaryText>
			</EulaAnalysisBottom>
		</>
	)
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

export default ValidScreen;