import React from 'react';
import Events from "../Components/Events"; 
import Calendar from "../Components/Calendar";
import styled from "styled-components";

const StyledWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
min-width: 100vw;
min-height: 100vh;

background-color: #e42f2b;

`;

function Schedule(props) {
    return (
        <StyledWrapper>

        <div>
        <br></br>
              <Events></Events>
              <br></br>
        </div>


        </StyledWrapper>

    )
}

export default Schedule

