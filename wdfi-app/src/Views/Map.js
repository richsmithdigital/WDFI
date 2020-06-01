import React from 'react';
import styled from "styled-components";
import MapComponent from "../Components/MapComponent"
import MapComponent2 from "../Components/MapComponent2"

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
            <MapComponent></MapComponent>
            <br></br>
            <MapComponent2></MapComponent2>

        </div>
        </StyledWrapper>


    )
}


export default Map

