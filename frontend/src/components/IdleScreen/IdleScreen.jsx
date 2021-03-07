import styled from '@emotion/styled';
import {colors} from '../../constants/styles';

/**
 * IdleScreen component.
 * @module
 */

/**
 * Creates screen to be displayed when user is in idle state
 * @param {object} props
 * @return {JSX.Element} Idle image within the idle container
 */
const IdleScreen = (props) => {
	return (
		<IdleContainer>
			<IdleImage Image src="idle.png" />
		</IdleContainer>
	)
}

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
	z-index=-1;
`;

export default IdleScreen;