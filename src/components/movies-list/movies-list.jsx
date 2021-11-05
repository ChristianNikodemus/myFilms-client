import React from "react";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

import "./movies-list.scss";

const mapStateToProps = (state) => {
  const { movies, visibilityFilter } = state;
  return { movies, visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <div className="movie-cards">
        <Col md={12} className="search-bar">
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        {filteredMovies.map((m) => (
          <Col md={3} sm={4} key={m._id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </div>
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
