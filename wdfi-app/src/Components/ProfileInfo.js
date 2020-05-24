import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import avatarLarge from "../assets/avatar_large.png";
import avatarPlaceholder from "../assets/avatar_placeholder.png";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";


const StyledUserAvatar = styled.div`
color: ${({ theme }) => theme.colors.darkShade[50]};
display: flex;
width: 80%;
align-items: center;
justify-content: flex-end;
img {
  margin-top: 8%;
  margin-bottom: 2%;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 2%
}
`;

function ProfileInfo(props) {
    const { onClick, open, user, signOut } = props;
    const location = useLocation();
  
  
    const handleClick = e => {
      e.preventDefault();
      onClick(e);
    };
  
    const handleSignOutClick = () => {
      signOut();
  
    }
  
    
  
  
    return (
      <div>
          <StyledUserAvatar>
            {/* <FontAwesomeIcon style={{ fontSize: "16px" }} icon={faChevronDown} /> */}
            <h6> {user.email}  <span style={{textDecoration: "underline", cursor:"pointer"}} onClick={handleSignOutClick}> (logout) </span></h6>
            <img src={user.photoURL || avatarPlaceholder} alt="avatar" />
          </StyledUserAvatar>
      </div>
    );
  }

  ProfileInfo.propTypes = {
    onClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired, 
    user: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
    
  };

export default ProfileInfo;
