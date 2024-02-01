import "./ChallengeCard.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ChallengeCard = ({ challengeId, challengeTitle, challengeSummary }) => {
  return (
    <div>
      <Link to={`/challenge/${challengeId}`}>
        <div className="card">
          <div className="content">
            <div>
              <img className="poster" src="challenge/example.jpg" alt="..." />
            </div>
            <div className="title">{challengeTitle}</div>
            <div className="description">{challengeSummary}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

ChallengeCard.propTypes = {
  challengeId: PropTypes.number,
  challengeTitle: PropTypes.string,
  challengeSummary: PropTypes.string,
};

export default ChallengeCard;