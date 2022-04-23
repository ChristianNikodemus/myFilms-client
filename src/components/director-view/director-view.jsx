import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

import "./director-view.scss";

export class DirectorView extends React.Component {
  /**
   * Renders the view of the directors information
   * @returns
   */
  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
        <div className="director-name">
          <h1>
            <span className="value">{director.Name}</span>
          </h1>
        </div>
        <div className="director-bio">
          <span className="value">{director.Bio}</span>
        </div>
        <br />
        <div className="director-birthyear">
          <span className="value">Born: {director.Birthyear}</span>
        </div>
        <br />
        <div className="director-deathyear">
          <span className="value">Past away: {director.Deathyear}</span>
        </div>

        <Button
          variant="link"
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string.isRequired,
    Deathyear: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default DirectorView;
