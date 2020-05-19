import React from "react";
import PropTypes from "prop-types";
import Tile from "../Components/Tile";
import styled from "styled-components";
import CheckinForm from "../Components/CheckinForm";

const StyledTile = styled(Tile)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  grid-row-gap: 20px;
  width: 100%;
`;

const StyledHeading = styled.h4`
  text-align: center;
  margin-top: 2%;
  color: ${({ theme }) => theme.colors.purple};
`;

const Checkin = props => {
  const { user, createCheckin} = props;


  const handleSubmit = async checkin => {
    const ckin = {
      ...checkin,
      ...{
        photo: user.photoURL || "",
        userId: user.uid,
        userName: user.displayName || user.email,
        time: new Date()
      }
    };

    try {
      
      await createCheckin(ckin);

    } catch (error) {
      console.log(error);
    }

    
  };

  return (
    <StyledTile>
      <StyledHeading> Log Your Progress For May 18 </StyledHeading>
      <CheckinForm onSubmit={handleSubmit} />
    </StyledTile>
  );
};

Checkin.propTypes = {
  user: PropTypes.object.isRequired,
  createCheckin: PropTypes.func.isRequired
};

export default Checkin;
