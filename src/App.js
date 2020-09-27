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
  max-width: 300px;

  button {
    background-color: #fff;
    padding: 10px 30px;
    border-color: #666;
    border-width: 2px;
    font-weight: 200px;
  }
`;

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [listOfNamesArray, setListOfNamesArray] = useState([]);
  const [rsvp, setRSVP] = useState('Attending');
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
          <button onClick={handleClearAll}>Clear All</button>
        </div>
        <div>
          <GuestList
            listOfNamesArray={listOfNamesArray}
            wholeListOfNames={wholeListOfNames}
            deleteGuest={deleteGuest}
          />
        </div>
      </div>
    </>
  );
}

export default App;
