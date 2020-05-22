import React, { Component } from "react";
import moment from "moment";
import schools_out from "../assets/schools_out.jpeg";
import spinner from "../assets/spinner.svg";
import { gapi } from 'gapi-script';
import { GOOGLE_API_KEY, CALENDAR_ID } from "../config/API_config";
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

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("dd, Do MMMM, h:mm A"),
      events: [],
      isBusy: false,
      isEmpty: false,
      isLoading: true
    };
  }

  componentDidMount = () => {
    this.getEvents();
    setInterval(() => {
      this.tick();
    }, 1000);
    setInterval(() => {
      this.getEvents();
    }, 60000);
  };

  getEvents() {
    let that = this;
    function start() {
      gapi.client
        .init({
          apiKey: GOOGLE_API_KEY
        })
        .then(function () {

          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=11&orderBy=updated&timeMin=${moment().toISOString()}&timeMax=${moment()
              .endOf("day")
              .toISOString()}`
          });
        })
        .then(
          response => {
            let events = response.result.items;
            let sortedEvents = events.sort(function (a, b) {
              return (
                moment(b.start.dateTime).format("YYYYMMDD") -
                moment(a.start.dateTime).format("YYYYMMDD")
              );
            });
            if (events.length > 0) {
              that.setState(
                {
                  events: sortedEvents,
                  isLoading: false,
                  isEmpty: false
                },
                () => {
                  that.setStatus();
                }
              );
            } else {
              that.setState({
                isBusy: false,
                isEmpty: true,
                isLoading: false
              });
            }
          },
          function (reason) {
            console.log(reason);
          }
        );
    }
    gapi.load("client", start);
  }

  tick = () => {
    let time = moment().format("dddd, Do MMMM, h:mm A");
    this.setState({
      time: time
    });
  };

  setStatus = () => {
    let now = moment();
    let events = this.state.events;
    for (var e = 0; e < events.length; e++) {
      var eventItem = events[e];
      if (
        moment(now).isBetween(
          moment(eventItem.start.dateTime),
          moment(eventItem.end.dateTime)
        )
      ) {
        this.setState({
          isBusy: true
        });
        return false;
      } else {
        this.setState({
          isBusy: false
        });
      }
    }
  };

  render() {
    const { time, events } = this.state;

    let eventsList = events.map(function (event) {
      return (

          <a
            className="list-group-item"
            href={event.htmlLink}
            target="_blank"
            key={event.id}
          >
            {event.summary}{" "}
            <span className="badge">
              {moment(event.start.dateTime).format("h:mm a")},{" "}
              {moment(event.end.dateTime).diff(
                moment(event.start.dateTime),
                "minutes"
              )}{" "}
            minutes, {moment(event.start.dateTime).format("MMMM Do")}{" "}
            </span>
          </a>

      );
    });

    let emptyState = (
      <div className="empty">
        <img src={schools_out} alt="Welcome" />
      </div>
    );

    let loadingState = (
      <div className="loading">
        <img src={spinner} alt="Loading..." />
      </div>
    );

    return (
      <StyledTile>
      <div className="container">
        <div
          className={
            this.state.isBusy ? "current-status busy" : "current-status open"
          }
        >
          <h1>{this.state.isBusy ? "Your Late Get to Class!" : "No classes, relax and make sure your on top of your work"}</h1>
        </div>
        <br></br>
        <div className="upcoming-lessons">
          <div className="current-time">{time}, 2020</div>
          <br></br>

          <h1>Upcoming Lessons:</h1>
          <br></br>

          <div className="list-group">
            {this.state.isLoading && loadingState}
            {events.length > 0 && eventsList}
            {this.state.isEmpty && emptyState}
          </div>
          <br></br>

          <a
            className="primary-cta"
            href="https://calendar.google.com/calendar/embed?src=j7jsvjjgafhbq5blmi6llvoeng%40group.calendar.google.com&ctz=Europe%2FLondon"
            target="_blank"
          >
                      <h2>Add a new event here</h2>
          </a>
        </div>
      </div>
      </StyledTile>

    );
  }
}