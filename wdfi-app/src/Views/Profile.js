import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import { Link, useLocation } from "react-router-dom";
import ImageUpload from "../Components/ImageUpload";
import styled from "styled-components";
import ProfileInfo from "../Components/ProfileInfo";


const StyledWrapper = styled.div`
justify-content: center;
align: center;
min-height: 100vh;
min-width: 100vw;
background-color: #e42f2b;
}
`;

function Profile(props) {


  return (

    <StyledWrapper>
      <br></br>
     <br></br>
      <div>
    <ImageUpload></ImageUpload>
    </div>
    </StyledWrapper>
    )
  
}


export default Profile