/** @jsx jsx */
/** @jsxFrag React.Fragment */
/*eslint-disable no-unused-vars*/
import React, { useState } from 'react';
import './App.css';
import Header from './Header.js';
import { jsx, css } from '@emotion/core';
import GuestList from './GuestLIst';
import shortid from 'shortid';
import UserInput from './UserInput.js';

const containerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const buttonStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
  max-width: 400px;

  button {
    background-color: #fff;
    padding: 10px 30px;
    border-color: #666;
    border-width: 2px;
    font-weight: 200px;
  }

  .clear-all {
    background-color: #fd2127;
    color: #fff;
    border-color: #fff;
    border-width: 2px;
  }
`;

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [listOfNamesArray, setListOfNamesArray] = useState([]);
  const [rsvp, setRSVP] = useState('Attending');
  const [filter, setFilter] = useState('unfiltered');
  const wholeListOfNames = [
    ...listOfNamesArray,
    { id: shortid.generate(), firstName, lastName, rsvp },
  ];

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = () => {
    setListOfNamesArray(wholeListOfNames);
    setLastName('');
    setFirstName('');
  };

  const handleRSVP = (e) => {
    setRSVP(e.target.value);
  };

  function deleteGuest(guestID) {
    const indexOfName = listOfNamesArray.indexOf(guestID);
    console.log(indexOfName);
    let listAfterDeletion = [];
    for (let i = 0; i < listOfNamesArray.length; i++) {
      if (i !== indexOfName) {
        listAfterDeletion.push(listOfNamesArray[i]);
        console.log(listAfterDeletion);
      }
    }
    setListOfNamesArray(listAfterDeletion);
  }

  function handleClearAll() {
    setListOfNamesArray([]);
  }

  const filterListOfNames = listOfNamesArray.filter((name) => {
    if (filter === 'Attending' && name.rsvp !== 'Attending') {
      return false;
    } else if (filter === 'Not Attending' && name.rsvp !== 'Not Attending') {
      return false;
    }
    return true;
  });

  function handleAttendingFilter() {
    setFilter('Attending');
  }

  function handleNonAttendingFilter() {
    setFilter('Not Attending');
  }

  function handleViewAllGuests() {
    setFilter('unfiltered');
  }
  return (
    <>
      <Header></Header>
      <div css={containerStyles}>
        <UserInput
          handleFirstNameChange={handleFirstNameChange}
          handleLastNameChange={handleLastNameChange}
          handleRSVP={handleRSVP}
        ></UserInput>
        <div css={buttonStyles}>
          <button onClick={handleSubmit}>Submit</button>
          <button className="clear-all" onClick={handleClearAll}>
            Clear All
          </button>
        </div>
        <div css={buttonStyles}>
          <button onClick={handleNonAttendingFilter}>
            Filter Non-Attending
          </button>
          <button onClick={handleAttendingFilter}>Filter Attending</button>
          <button onClick={handleViewAllGuests}>Show All Guests</button>
        </div>
        <div>
          <GuestList
            wholeListOfNames={wholeListOfNames}
            deleteGuest={deleteGuest}
            filterListOfNames={filterListOfNames}
          />
        </div>
      </div>
    </>
  );
}

export default App;
