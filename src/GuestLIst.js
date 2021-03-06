/** @jsx jsx */
/** @jsxFrag React.Fragment */
/*eslint-disable no-unused-vars*/
import React from 'react';
import { jsx, css } from '@emotion/core';
import './App.css';

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

  div b {
    margin-right: 5px;
  }

  div i {
    margin-right: 20px;
  }

  li {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    border-color: red;
    border-radius: 8px;
    border-width: 4px;
    padding: 5px 0;
  }

  li div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  button {
    font-size: 12px;
    border: solid;
    border-color: #666;
    border-radius: 5px;
    border-width: 2px;
    background-color: #ffffff;
  }
`;

function GuestList({ deleteGuest, filterListOfNames }) {
  function isAttending(obj) {
    if (obj.attending === 'Attending') {
      return 'Attending';
    }
    return 'Not Attending';
  }

  const deleteUrl = 'https://upleveled-api.herokuapp.com';

  async function deleteGuestFromServer(item) {
    const response = await fetch(`${deleteUrl}/${item.id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    return deletedGuest;
  }

  function deleteFromClientAndServer(item) {
    deleteGuestFromServer(item);
    deleteGuest(item);
  }

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
                <i>{isAttending(item)}</i>
                <button
                  onClick={() => {
                    deleteFromClientAndServer(item);
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
