import React from 'react';
import Events from "../Components/Events"; 
import Calendar from "../Components/Calendar";


function Schedule(props) {
    return (
        <div>
              <Events></Events>
              <br></br>
              <Calendar></Calendar>
        </div>
    )
}


export default Schedule

