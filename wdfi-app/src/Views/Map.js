import React from 'react';
import styled from "styled-components";
import MapComponent from "../Components/MapComponent"

const StyledWrapper = styled.div`
justify-content: center;
align-items: center;
width: 100;
min-height: 100vh;
background-color: #e42f2b;

`;

function Map(props) {
    return (
        <StyledWrapper>
        <div>
        <br></br>
            <MapComponent></MapComponent>
            <br></br>
        </div>
        </StyledWrapper>

    )
}

export default Map

