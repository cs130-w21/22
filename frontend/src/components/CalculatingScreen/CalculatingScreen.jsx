import styled from '@emotion/styled';
import {colors} from '../../constants/styles';

/**
 * CalculatingScreen component.
 * @module
 */

/**
 * Creates screen to be displayed when user is in calculating state
 * @param {object} props
 * @return {JSX.Element} Image displayed during calculating in backend
 */

const CalculatingScreen = (props) => {
	return(
		<>
			<YourEulaAnalysis>Calculating</YourEulaAnalysis>
			<CalcHeaderWrapper> 
				<CalcHeader>Hold On tight for<br></br>your result</CalcHeader>
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
			</CalcTextContainer>
				
			<CalcContainer>
				<CalcImage Image src="calculating.png" />
			</CalcContainer>
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

const CalcContainer = styled.div`
	height: 100%;
	width: 100%;
	text-align: center;
	position: relative;
	overflow: hidden;
`;

const CalcImage = styled.img`
	height: 55vh;
	margin-left: auto;
	margin-right: auto;
	left: 40px;
	position: absolute;
`;

const CalcHeaderWrapper = styled.div`
	display: grid;
    grid-template-columns: 1fr 1fr;

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
	overflow:hidden;
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

export default CalculatingScreen;