import React, {useState} from "react";
import PropTypes from 'prop-types';
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
grid-template-columns: repeat(1, 1fr);
justify-content: center;
grid-row-gap: 20px;
width: 100%;
background-color: white;
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
const StyledLink = styled(Link)`
text-align: center;
color: ${({ theme }) => theme.colors.yellow};
`;

const StyledHeading2 = styled.h3`
  text-align: center;
  margin-top: 2%;
  color: ${({ theme }) => theme.colors.yellow};
  `;

function Join(props) {

  const {createEmailUser, signInWithProvider} = props;
  const [error, setError] = useState();
  

  const handleSubmit = async (data) => {
    
    const {email, password} = data;
    
    try {
      await createEmailUser(email, password);
    } catch (error) {
      setError(error.message);
    }
    
  }

  const handleSocialLogin = provider => {
    signInWithProvider(provider);
  }

  return (
    <StyledWrapper>
      <StyledTile>
        <StyledHeading>Sign up With Google</StyledHeading>
        <Form onSocialLogin={handleSocialLogin} onSubmit={handleSubmit} serverError={error} />
        <StyledHeading2>Already A member?</StyledHeading2>
        <StyledLink to="/login"> Login Here </StyledLink>
      </StyledTile>
    </StyledWrapper>
  );
}

Join.propTypes = {
  createEmailUser: PropTypes.func.isRequired,
  signInWithProvider: PropTypes.func.isRequired

};

export default Join;
