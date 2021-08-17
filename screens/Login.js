import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// Using Formik !
import { Formik } from 'formik';

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from './../components/styles'; // linking the styles.js to this login page
import { View, ActivityIndicator } from 'react-native';

// Colours I will be using for login page (destructure)
const { darkLight, brand, primary } = Colors;

// Icons that I will be using for login page
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

// Keyboard avoiding view wrapper
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// API CLIENT 
import axios from 'axios';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState(); // To display the error/success message so we create a variable for it
  const [messageType, setMessageType] = useState();

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null); // clear the old message when button is pressed
    const url = 'mongodb+srv://dbJamie:3j9qFLlUQuM0w5Mb@cluster0.ihhtq.mongodb.net/dbJamie?retryWrites=true&w=majority';

    // POST -----------------------------------------------------------------------------------------
    axios
      .post(url, credientials) // use post method to send request - 1st parameter is link to API
      .then((response) => { // return a promise
        const result = response.data;
        const { message, status, data } = result; // destructure this in the result to show us

        if (status !== 'SUCCESS') { // if status is not equal to success
          handleMessage(message, status); // then handleMessage will set is as error
        } else {
          navigation.navigate('Welcome', { ...data[0] });  // if is successfull, it navigates to welcome page! 
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false); // after seeing an error, set submitting to false
        handleMessage('An error occurred. Check your network and try again');
        console.log(error.toJSON());
      });
  };


const handleMessage = (message, type = 'FAILED') => { // if no message is added, default failed
  setMessage(message);
  setmessageType(type);
};

// The top section heading follow by form 
return (
  <KeyboardAvoidingWrapper><StyledContainer>
    <StatusBar style="dark" />
    <InnerContainer>
      <PageLogo resizeMode="cover" source={require('./../assets/img/expo-bg3.png')} />
      <PageTitle>My Task Planner</PageTitle>
      <SubTitle>Account Login</SubTitle>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, {setSubmitting}) => {
          if (values.email == '' || values.password == '') { // if the input fields are empty
            handleMessage('Please fill all the fields'); // we will send a message ask user fill in
            setSubmitting(false); // then it will become false
          } else {
            handleLogin(values, setSubmitting); // send request to handleLogin function
          }
        }}
      >

        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <StyledFormArea>
            <MyTextInput
              label="Email Address"
              placeholder="enteryouremail@gmail.com"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              icon="mail"
            />

            <MyTextInput
              label="Password"
              placeholder="* * * * * * * *"
              placeholderTextColor={darkLight}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={hidePassword}
              icon="lock"
              isPassword={true}
              hidePassword={hidePassword}
              setHidePassword={setHidePassword}
            />

            <MsgBox type={messageType}>{message}</MsgBox>

            {/* {!isSubmitting && (
            <StyledButton onPress={handleSubmit}>
              <ButtonText>Login</ButtonText>
            </StyledButton>
            )}

            {!isSubmitting && ( 
            <StyledButton disabled={true}> 
              <ActivityIndicator size="large" color={primary}/> 
            </StyledButton>
            )} */}

          <StyledButton onPress={() => navigation.navigate('Welcome')}>
              <ButtonText>Login</ButtonText>
            </StyledButton>

            <Line />

            <StyledButton google={true}>
              <Fontisto name="google" size={25} color={primary} />
              <ButtonText google={true}>Sign in with Google</ButtonText>
            </StyledButton>
            <ExtraView>
              <ExtraText>New here?</ExtraText>
              <TextLink onPress={() => navigation.navigate('Signup')}>
                <TextLinkContent> Sign up now!</TextLinkContent>
              </TextLink>
            </ExtraView>
          </StyledFormArea>
        )}
      </Formik>
    </InnerContainer>
  </StyledContainer>
  </KeyboardAvoidingWrapper>
);
};

// Form input !!
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
