/** @jsx jsx */
/** @jsxFrag React.Fragment */
/*eslint-disable no-unused-vars*/
import React, { useState } from 'react';
import './App.css';
import { jsx, css } from '@emotion/core';

function GuestList({ deleteGuest, filterListOfNames }) {
  const unorderedListStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    > div {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: space-between;
      width: 450px;
    }

    li {
      display: flex;
      justify-content: space-between;
      list-style-type: none;
      border-color: red;
      border-radius: 8px;
      border-width: 4px;
    }

    li div {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  `;

  return (
    <div>
      <ul css={unorderedListStyles}>
        <div>
          <li>
            <u>Name</u> <u>RSVP-Response</u>
          </li>
          {filterListOfNames.map((item) => (
            <li key={item.id}>
              {item.firstName} {item.lastName}
              <div>
                <b>Status: </b>
                <i>{item.rsvp}</i>
                <button
                  onClick={() => {
                    deleteGuest(item);
                  }}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default GuestList;
