import React from 'react';
import Calendar from "../Components/Calendar"; 
import styled from "styled-components";

const StyledWrapper = styled.div`
justify-content: center;
align-items: center;
width: 100;
min-height: 100vh;
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

