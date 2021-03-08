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
	return (
		<>
			<YourEulaAnalysis>Calculating</YourEulaAnalysis>
			<CalculatingContainer>
				<CalculatingBackground src="calculating_background.png" />
				<Circle />
				<CalcImage src="calculating.png" />
			</CalculatingContainer>
		</>
	);
};

const YourEulaAnalysis = styled.div`
	width: 100%;
	font-weight: bolder;
	font-size: 4vh;
	letter-spacing: 2px;
	text-transform: uppercase;
	color: ${colors.DARKER_PURPLE};
`;

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

export default CalculatingScreen;
