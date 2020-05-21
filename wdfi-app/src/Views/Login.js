import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Tile from "../Components/Tile";
import { Link } from "react-router-dom";
import Form from "../Components/LoginForm";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background-color: #e42f2b;
`;

const StyledTile = styled(Tile)`
  display: grid;
  background-color: white;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  grid-row-gap: 20px;
  width: 100%;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 10px 5px 5px #000;
  @media (min-width: 600px) {
    width: 30%;
  }
`;

const StyledHeading = styled.h1`
  text-align: center;
  margin-top: 2%;
  color: ${({ theme }) => theme.colors.red};

`;

const StyledHeading2 = styled.h3`
  text-align: center;
  margin-top: 2%;
  color: ${({ theme }) => theme.colors.yellow};

`;
const StyledLink = styled(Link)`
  text-align: center;
  color: ${({ theme }) => theme.colors.yellow};


`;

function Login(props) {
  const { signInEmailUser, signInWithProvider } = props;
  const [error, setError] = useState();

  const handleSubmit = async data => {
    const { email, password } = data;

    try {
      const user = await signInEmailUser(email, password);
      console.log(user);
    } catch (error) {
      debugger;
      setError(error.message);
    }
  };

  const handleSocialLogin = provider => {
    signInWithProvider(provider);
  };

  return (
    <StyledWrapper>
      <StyledTile>
        <StyledHeading>Login With Google </StyledHeading>
        <Form
          onSocialLogin={handleSocialLogin}
          serverError={error}
          onSubmit={handleSubmit}
          buttonText="LOGIN"
        />
        <StyledHeading2>First Time?</StyledHeading2>
        <StyledLink to="/join"> Click here to set up your Solent Calendar </StyledLink>
      </StyledTile>
    </StyledWrapper>
  );
}

Login.propTypes = {
  signInEmailUser: PropTypes.func.isRequired,
  signInWithProvider: PropTypes.func.isRequired
};

export default Login;
