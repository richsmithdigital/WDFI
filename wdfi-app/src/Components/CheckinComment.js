import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tile from "./Tile";
import styled from "styled-components";
import moment from "moment";
import avatarSmall from "../assets/avatar_small.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import avatarPlaceholder from "../assets/avatar_placeholder.png";
import Histogram from "./Histogram";

function LikeButton(props) {
  const StyledDiv = styled.div`
    border-radius: 11px;
    border: 1px solid ${({ theme }) => theme.colors.purple};
    width: 40px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.purple};
  `;

  return (
    <StyledDiv>
      <h6>
        <FontAwesomeIcon style={{ fontSize: "12px" }} icon={faHeart} /> 12{" "}
      </h6>
    </StyledDiv>
  );
}
const StyledDetailsArea = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.small ? "0.3fr 1.7fr;" : "0.5fr 3fr"};
  align-items: center;
  textarea {
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.darkShade[25]};
  }
`;

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.colors.purple};
`;

const StyledPhotoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;

  img {
    margin-top: 8%;
    margin-bottom: 20%;
    width: ${props => (props.small ? "25px" : "45px")};
    height: ${props => (props.small ? "25px" : "45px")};
    border-radius: 50%;
    margin: 2%;
  }
`;

const StyledCheckinArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 190px;
`;

const StyledScoreArea = styled.div`
    
    display: flex;
    flex-direction: row;
    h3 {
      color: ${({ theme }) => theme.colors.purple};
    },`;

const StyledDivider = styled.hr`
  border: 0.3px solid ${({ theme }) => theme.colors.darkShade[5]};
  width: 100%;
`;

const CommentArea = styled.div`
  
   border-radius: 15px;
   background-color: ${({ theme }) => theme.colors.grey};
   width: 95%;
   margin-bottom: 2%;
   margin-top: 2%;
   min-height: 80px;
   padding 3%;
   h6:nth-child(2) {
       margin-top: 5%
   }, 
  `;

function CheckinResponse(props) {
  const { comments } = props;

  const Comment = ({ comment }) => (
    <StyledDetailsArea>
      <StyledPhotoArea>
        <img
          src={comment.photo || avatarPlaceholder}
          style={{ marginBottom: "-40px" }}
          alt="avatar"
        />
      </StyledPhotoArea>

      <CommentArea>
        <h6>
          Joe Appleton <em> {moment(comment.time.toDate()).fromNow()} </em>
        </h6>

        <h6> {comment.body} </h6>
      </CommentArea>
    </StyledDetailsArea>
  );

  return comments.map(c => <Comment comment={c} />);
}

function CheckinComment(props) {
  const { checkin, readCheckinComments, writeCheckinComments, user } = props;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const getComments = async () => {
    let commentList = [];
    const commentsRef = await readCheckinComments(checkin.id);
    commentsRef.forEach(c => commentList.push(c.data()));
    setComments(commentList);
  };

  useEffect(() => {
    getComments();
  }, [readCheckinComments, checkin, setComments]);

  const handleChangeAndEnter = async e => {

    if (!e.key) {
      setComment(e.target.value);

      return;
    }

    if (comment !== "" && e.key=== "Enter") {
      try {
        const newComment = {
          body: comment,
          time: new Date(),
          photo: user.photoURL || "",
          userId: user.uid,
          userName: user.displayName || user.email
        };
        setComment("");
        await writeCheckinComments(checkin.id, newComment);
        getComments();
      } catch (error) {
        console.log(error.message);
      }
      return;
    }
  };

  return (
    <Tile elevation="0.06">
      <StyledDetailsArea>
        <StyledPhotoArea>
          <img
            src={checkin.photo || avatarPlaceholder}
            style={{ marginBottom: "-20px" }}
            alt="avatar"
          />

          <div style={{ marginTop: "50%" }}>
            <LikeButton></LikeButton>
          </div>
        </StyledPhotoArea>

        <StyledCheckinArea>
          <h6>
            {" "}
            {checkin.userName} <StyledSpan> Checked In </StyledSpan>
          </h6>
          <em> {moment(checkin.time.toDate()).fromNow()} </em>{" "}
          <h6>{checkin.comment}</h6>
          <h6> Total</h6>
          <StyledScoreArea>
            {" "}
            <h3>{checkin.total}</h3>{" "}
            <div style={{ width: "100%", height: "90%", marginLeft: "10px" }}>
              <Histogram barCount={7} bars={[10, 10, 10, 10, 10, 10, 10]} />
            </div>
          </StyledScoreArea>
        </StyledCheckinArea>
      </StyledDetailsArea>
      <StyledDivider />

      <CheckinResponse comments={comments} />

      <StyledDetailsArea small>
        <StyledPhotoArea small>
          <img
            src={user.photoURL || avatarPlaceholder}
            style={{ marginBottom: "-20px" }}
            alt="avatar"
          />
        </StyledPhotoArea>
        <textarea
          rows="4"
          onChange={handleChangeAndEnter}
          onKeyPress={handleChangeAndEnter}
          value={comment}
        ></textarea>
      </StyledDetailsArea>
    </Tile>
  );
}

CheckinComment.propTypes = {
  checkin: PropTypes.array.isRequired,
  readCheckinComments: PropTypes.object.isRequired,
  writeCheckinComments: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default CheckinComment;
