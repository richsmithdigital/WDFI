import React from 'react';
import styled from "styled-components";
import MapComponent from "../Components/MapComponent"

const StyledWrapper = styled.div`
justify-content: center;
align-items: center;
width: 700px
min-height: 100vh;
background-color: #e42f2b;

`;

function Map(props) {
    return (
        <StyledWrapper>
        <div>
            <MapComponent></MapComponent>
            <br></br>
        </div>
        </StyledWrapper>

    )
}

export default Map

