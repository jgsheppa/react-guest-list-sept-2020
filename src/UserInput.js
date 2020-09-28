/** @jsx jsx */
/** @jsxFrag React.Fragment */
/*eslint-disable no-unused-vars*/
import React from 'react';
import './App.css';
import { jsx, css } from '@emotion/core';

const inputStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;

  div {
    display: flex;
    align-content: flex-start;
    margin: 5px 0;
    max-width: 250px;
    max-height: 120px;
  }

  input {
    margin-left: 5px;
  }
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
            </select>
          </label>
        </div>
      </div>
    </>
  );
}

export default UserInput;
