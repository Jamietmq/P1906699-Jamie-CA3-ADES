import React from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
} from './../components/styles'; // linking the styles.js to this welcome page

// Back button to go back
const Welcome = ({ navigation, route }) => {
  // const { name } = route.params;
  return (
    <>
      <StatusBar style="dark" /> 
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/img/expo-bg4.png')} />

        <WelcomeContainer>
          <PageTitle welcome={true}>Let's Be Productive!</PageTitle>
          {/* <SubTitle welcome={true}>{name || 'Park Jimin'}</SubTitle> */}

          <StyledFormArea>
            <StyledButton google={true} onPress={() => navigation.navigate ('Planner')}>
              <ButtonText>Today's Task</ButtonText>
            </StyledButton>

            <Line />

            <StyledButton onPress={() => navigation.navigate ('Login')}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
