import React from 'react';
import Iframe from 'react-iframe';
import styled from "styled-components";
import Tile from "../Components/Tile";

const StyledTile = styled(Tile)`
display: grid;
grid-template-columns: repeat(1, 1fr);
justify-content: center;
grid-row-gap: 20px;
width: 100%;
background-color: white;
border-radius: 20px 20px 20px 20px;
box-shadow: 10px 5px 5px #000;
@media (min-width: 600px) {
  width: 50%;
}
`;


function Calendar() {
  return (
    <StyledTile>

    <div className="Calendar">
      <iframe src="https://calendar.google.com/calendar/embed?src=j7jsvjjgafhbq5blmi6llvoeng%40group.calendar.google.com&ctz=Europe%2FLondon"  width="800" height="600" frameborder="0" scrolling="no"></iframe>
    </div>
       
    </StyledTile>

      
  );
}

export default Calendar;
