import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DaysCompleted from "../Components/DaysCompleted";
import CheckinComment from "../Components/CheckinComment";


function Dash(props) {

  const {readCheckins,readCheckinComments, user, writeCheckinComments, readChallenges } = props;
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    const getAllCheckins = async () => {
      let ci = [];
      const allCheckinRef = await readCheckins(); 
      allCheckinRef.forEach(checkin => ci.push({...checkin.data(),...{id:checkin.id}}));
      setCheckins(ci);
    }

    getAllCheckins();

  }, [setCheckins, readCheckins])

  return (
    <div>
      <DaysCompleted days={15} readChallenges={readChallenges}   checkins={checkins}>
        {" "}
      </DaysCompleted>
       {
         checkins.map( c =>  <CheckinComment user={user} checkin={c}  writeCheckinComments={writeCheckinComments} readCheckinComments={readCheckinComments} /> )
       }

     
    </div>
  );
}

Dash.propTypes = {
    user: PropTypes.object.isRequired,
    checkins: PropTypes.array.isRequired,
    readCheckins : PropTypes.array.isRequired,
    writeCheckinComments: PropTypes.array.isRequired,
    readCheckinComments: PropTypes.object.isRequired,
    readChallenges: PropTypes.object.isRequired
};

export default Dash;


