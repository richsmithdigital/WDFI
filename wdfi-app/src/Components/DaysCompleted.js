import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Tile from "./Tile";
import Histogram from "./Histogram";
import ProgressBar from "./ProgressBar";
import styled from "styled-components";
import moment from "moment";

const StyledDaysCompleteHeading = styled.h2`
  text-align: center;
  color: ${props => props.theme.colors.purple};
`;

const StyledRootDiv = styled.div`
  display: grid;
  grid-template-columns: 0.8fr;
  grid-template-rows: 55px 80px 20px auto;
  justify-content: center;
`;

const StyledGoalHeading = styled.h4`
  color: #1f2041;
`;

function DaysCompleted(props) {
  
  const { days, checkins, readChallenges} = props;
  const [challengeDaysCompleted, setChallengeDaysCompleted]  = useState();
  const [challengePercentage, setChallengePercentage] = useState(0);

  

  useEffect(() => {
    
    ( async () =>  {
      const challengeRef = await readChallenges();
      let challenges = []
      challengeRef.forEach(c => challenges.push(c.data()));
      
      // for now we'll just get the first challenge 
      const {start, end} = {start:challenges[0].start.toDate(), end:challenges[0].end.toDate()};

      const daysToEnd = moment().diff(end, 'days') * -1;  // this will be negative, so we can make it positive by * 1
      const daysFromStart =  moment().diff(start, 'days');
      
      setChallengeDaysCompleted(daysFromStart);
      setChallengePercentage((daysFromStart / (daysFromStart + daysToEnd)) * 100);  
    })()
    
  }, [readChallenges])

  return (
    <Tile>
      <StyledRootDiv>
        <StyledDaysCompleteHeading>
          {" "}
          {challengeDaysCompleted} Days Completed!{" "}
        </StyledDaysCompleteHeading>
        <Histogram barCount={7} bars={checkins.map(c => c.total * 5)} />
        <ProgressBar percentage={challengePercentage}/>
        <StyledGoalHeading>
          <strong>{Math.round(challengePercentage)} %</strong> TO GOAL!
        </StyledGoalHeading>
      </StyledRootDiv>
    </Tile>
  );
}

DaysCompleted.propTypes = {
  days: PropTypes.number,
  checkins: PropTypes.array.isRequired,
  readChallenges: PropTypes.object.isRequired
};

DaysCompleted.defaultProps = {
  days: 0
};

export default DaysCompleted;
