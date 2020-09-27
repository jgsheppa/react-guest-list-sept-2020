/** @jsx jsx */
/** @jsxFrag React.Fragment */
/*eslint-disable no-unused-vars*/
import React from 'react';
import './App.css';
import { jsx, css } from '@emotion/core';

const inputStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 500px;
`;

function UserInput({
  handleFirstNameChange,
  handleLastNameChange,
  handleRSVP,
  firstName,
  lastName,
}) {
  return (
    <>
      <div css={inputStyles}>
        <div>
          <label>
            First name:
            <input value={firstName} onChange={handleFirstNameChange}></input>
          </label>
        </div>
        <div>
          <label>
            Last name:
            <input value={lastName} onChange={handleLastNameChange}></input>
          </label>
        </div>
        <div>
          <label>
            RSVP:{' '}
            <select onChange={handleRSVP}>
              <option onChange={handleRSVP} value="Attending">
                Attending
              </option>
              <option onChange={handleRSVP} value="Not Attending">
                Not Attending
              </option>
              <option onChange={handleRSVP} value="Maybe">
                Maybe
              </option>
            </select>
          </label>
        </div>
      </div>
    </>
  );
}

export default UserInput;
