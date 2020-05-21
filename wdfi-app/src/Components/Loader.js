import React from 'react';
import styled from "styled-components";
import ClipLoader from "react-spinners/FadeLoader";
import spinner from "../assets/spinner.svg";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  flex-direction: column;
}`

const  Loader = () => {
    return (
        <StyledWrapper>

            <div>
            <h1>loading ...</h1>
            <img src={spinner} alt="Loading..." />
            </div>
       
       
        </StyledWrapper>
        
       
    )
}


export default Loader;
