/** @jsx jsx */
/** @jsxFrag React.Fragment */
/*eslint-disable no-unused-vars*/
import React, { useState } from 'react';
import './App.css';
import { jsx, css } from '@emotion/core';

function GuestList({ listOfNamesArray, deleteGuest, id }) {
  const unorderedListStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 500px;
    border-color: red;
    border-radius: 8px;
    border-width: 4px;
  `;

  const nameListStyles = css`
    display: flex;
    align-content: center;
    justify-content: space-between;
    list-style-type: none;
    padding: 20px 50px;
    padding: 0;
  `;

  const buttonStyles = css`
    margin-left: 10px;
  `;

  return (
    <div>
      <ul>
        <div css={unorderedListStyles}>
          {listOfNamesArray.map((item) => (
            <li key={item.id} css={nameListStyles}>
              {item.firstName} {item.lastName}
              <button
                onClick={() => {
                  deleteGuest(item);
                }}
                css={buttonStyles}
              >
                X
              </button>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default GuestList;
