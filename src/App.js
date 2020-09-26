/** @jsx jsx */
/** @jsxFrag React.Fragment */
/*eslint-disable no-unused-vars*/
import React, { useState } from 'react';
import './App.css';
import Header from './Header.js';
import { jsx, css } from '@emotion/core';
import GuestList from './GuestLIst';
import shortid from 'shortid';

const inputStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [listOfNamesArray, setListOfNamesArray] = useState([]);
  const wholeListOfNames = [
    ...listOfNamesArray,
    { id: shortid.generate(), firstName, lastName },
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

  return (
    <div>
      <Header></Header>
      <div css={inputStyles}>
        <div>
          <label>
            First name:
            <input
              // ref={register}
              value={firstName}
              onChange={handleFirstNameChange}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Last name:
            <input
              // ref={register}
              value={lastName}
              onChange={handleLastNameChange}
            ></input>
          </label>
        </div>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div>
          <GuestList
            listOfNamesArray={listOfNamesArray}
            wholeListOfNames={wholeListOfNames}
            deleteGuest={deleteGuest}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
