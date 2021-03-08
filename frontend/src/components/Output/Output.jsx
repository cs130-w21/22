import React, {Component} from 'react';
import styled from '@emotion/styled';
import {colors} from '../../constants/styles';

import ErrorScreen from '../ErrorScreen/ErrorScreen';
import ValidScreen from '../ValidScreen/ValidScreen';
import CalculatingScreen from '../CalculatingScreen/CalculatingScreen';
import IdleScreen from '../IdleScreen/IdleScreen';

/**
 * Class Output component.
 * @class
 */
class Output extends Component {
	/**
	 * Constructor which intializes component's state
	 * Current state includes outputState, error, classification, and summary values
	 * @constructor
	 * @param {object} props - updateResponse object from root app
	 */
	constructor(props) {
		super(props);
		this.state = {
			outputState: 0 /* 0 = idle, 1 = calculating, 2 = valid response, 3 = error */,
			error: '',
			classification: '',
			summary: '',
		};
	}

	/**
	 * Function called to set state to incoming props
	 * @function componentWillReceiveProps
	 */
	componentWillReceiveProps(props) {
		this.setState(props.updateResponse);
	}

	/**
	 * Function to render componnent to screen
	 * @function render
	 * @return {JSX.Element} returns a specific screen: idle, calculating, valid, or error
	 */
	render() {
		return (
			<Container state={this.state.outputState}>
				<TopBar />
				<BelowTopBar state={this.state.outputState}>
					{this.state.outputState == 0 && (
						<>
							<IdleScreen />
						</>
					)}
					{this.state.outputState == 1 && (
						<>
							<CalculatingScreen />
						</>
					)}
					{this.state.outputState == 2 && (
						<>
							<ValidScreen summary={this.state.summary} classification={this.state.classification} />
						</>
					)}
					{this.state.outputState == 3 && (
						<>
							<ErrorScreen error={this.state.error} />
						</>
					)}
				</BelowTopBar>
			</Container>
		);
	}
}

////////////////////// General ///////////////////////
/**
 * Sets overflow rule
 * @function setOverflow
 * @param {int} value - current output state
 * @return {string} - scrolling ability
 */
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
	height: 69vh;
	overflow-y: ${(props) => setOverflow(props.state)};
`;

const TopBar = styled.div`
	height: 1vh;
	width: 100%;
	background-color: ${colors.DARK_PURPLE};
`;
/**
 * Sets background color
 * @function setColor
 * @param {int} value - current output state
 * @return {string} - background color
 */
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
