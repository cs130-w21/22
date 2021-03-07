import styled from '@emotion/styled';
import {colors} from '../../constants/styles';

/**
 * ErrorScreen component.
 * @module
 */

/**
 * Creates screen to be displayed when user is in error state
 * @param {object} props
 * @return {JSX.Element} Displays error image
 */

const ErrorScreen = (props) => {
	return(
		<ErrorContainer>
			<ErrorContainerInner>
				<ErrorImage Image src="error.png" />
				<Oops>Oops!</Oops>
				<ErrorMessage>{props.error}</ErrorMessage>
			</ErrorContainerInner>
		</ErrorContainer>
	)
}

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

export default ErrorScreen;