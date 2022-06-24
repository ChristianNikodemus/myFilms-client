import React from "react";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";

import { setFilter } from "../../actions/actions";

import "./visibility-filter-input.scss";

/**
 * @function VisibilityFilterInput
 * @param props
 * @returns a search bar
 * @description This allows the user to search for any movies
 */
function VisibilityFilterInput(props) {
  return (
    <Form.Control
      className="searchbar"
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Search movie"
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
