import React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

import "./movies-list.scss";

/**
 * @function mapStateToProps
 * @param state
 * @returns The VisibilityFilterInput component and then the movie cards in a grid
 * @description The VisibilityFilterInput component first determines which cards to display in the grid
 */
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
        <Row>
          {filteredMovies.map((m) => (
            <Col md={3} sm={4} key={m._id}>
              <MovieCard movie={m} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
