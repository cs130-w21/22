import React, { Component } from "react";
import styled from "@emotion/styled";

import { colors } from "./constants/styles";

import Input from './components/Input';
import Output from './components/Output';

function App() {
  return (
    <Container>
      <HeaderBox>
        <HeaderTop>
          <Logo src="logo.png" />
        </HeaderTop>
        <HeaderBottom>
          <Headline>How ethical is your end user license agreement?</Headline>
        </HeaderBottom>
      </HeaderBox>
      <BodyBox>
        <BodyBoxHalf>
          <Input/>
        </BodyBoxHalf>
        <BodyBoxHalf>
          <Output/>
        </BodyBoxHalf>
      </BodyBox>
    </Container>
  );
}

const HeaderBox = styled("div")`
  /* border: 1px solid red; */
  width: 100%;
  height: 22vh;
`;

const HeaderTop = styled("div")`
  /* border: 1px solid red; */
  height: 15%;
  width: 100%;

  text-align: left;
`;

const HeaderBottom = styled("div")`
  /* border: 1px solid red; */
  height: 85%;
  width: 100%;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Headline = styled("div")`
  margin: auto;
  /* border: 1px solid red; */
  width: 50%;
  text-align: center;

  font-size: 36px;
  font-weight: 600;
  line-height: 48px;
`;

const Logo = styled("img")`
  /* border: 1px solid red; */
  width: 6vw;
  height: auto;
`;

const Container = styled("div")`
  text-align: center;
  background: linear-gradient(white, #DCDEFF);
  padding: 3vh 5vw;
`;

const BodyBox = styled("div")`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  min-height: 75vh;
  /* border: 1px solid red; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BodyBoxHalf = styled("div")`
  width: 100%;
  min-height: 100%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 5vh;
  padding-bottom: 5vh;
`;

export default App;
