import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { battle } from "../utils/api";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser,
} from "react-icons/fa";
import Card from "./card";
import Loading from "./loading";
import Tooltip from "./tooltip";
import PropTypes from "prop-types";

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="Users location">
            <FaCompass color="rgb(144, 115, 225)" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="Users company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

class Results extends Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };

  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(
      this.props.location.search
    );

    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading === true) {
      return <Loading text="Fetching data" speed={100} />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }
    return (
      <React.Fragment>
        <div className="grid space-arround container-sm">
          {/* WINNER CARD */}
          <Card
            header={winner.score === loser.score ? "Tie" : "Winner"}
            subheader={`Score: ${winner.score}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>

          {/* LOSER CARD */}
          <Card
            header={winner.score === loser.score ? "Tie" : "Loser"}
            subheader={`Score: ${loser.score}`}
            avatar={loser.profile.avatar_url}
            href={loser.profile.html_url}
            name={loser.profile.login}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <Link to="/battle" className="btn dark-btn btn-space">
          Reset
        </Link>
      </React.Fragment>
    );
  }
}

export default Results;
