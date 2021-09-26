import React from 'react';

import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-year">
          <span className="label">Year: </span>
          <span className="value">{movie.Year}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          {movie.Genre.map((Genre) => (
              <span key={Genre._id} className="value">
                {Genre.Title}
              </span>
            ))
            //.join(", ")
            }
        </div>
        <div className="movie-director">
          <span className="label">Director(s): </span>
          {movie.Director.map((Director) => (
              <span key={Director._id} className="value">
                {Director.Name}
              </span>
            ))
            //.join(", ")
            }
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}