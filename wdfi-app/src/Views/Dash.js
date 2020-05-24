import React from 'react';
import Events from "../Components/Events"; 
import Calendar from "../Components/Calendar";
import styled from "styled-components";

const StyledWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
min-width: 100vw;
background-color: #e42f2b;

`;

function Dash(props) {
    return (
        <StyledWrapper>

        <div>
        <br></br>
              <Events></Events>
              <br></br>
              <Calendar></Calendar>
        </div>


        </StyledWrapper>

    )
}

export default Dash




