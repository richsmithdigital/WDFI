import React from 'react';
import Calendar from "../Components/Calendar"; 
import styled from "styled-components";
const StyledWrapper = styled.div`
align: center;
min-height: 100vh;
min-width: 100vw;
background-color: #e42f2b;

`;

function CalendarHome(props) {
    return (
        <StyledWrapper>

        <div>
            <br></br>
              <Calendar></Calendar>
        </div>
        </StyledWrapper>

    )
}


export default CalendarHome

