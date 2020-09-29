/** @jsx jsx */
/** @jsxFrag React.Fragment */
/*eslint-disable no-unused-vars*/
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header.js';
import { jsx, css } from '@emotion/core';
import GuestList from './GuestLIst';
import UserInput from './UserInput.js';

const containerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  max-width: 1440px;
`;

const inputContainterStyles = css`
  display: flex;
  display: row;
  justify-content: center;
  align-content: center;
  border: solid;
  border-color: #666;
  border-width: 2px;
  padding: 20px;
  max-width: 400px;
`;

const buttonStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  padding: 10px 20px;
  max-width: 1440px;

  button {
    background-color: #7bffa0;
    padding: 10px 30px;
    border-color: #fff;
    border-width: 2px;
    font-weight: 800px;
    border-radius: 20px;
    max-height: 40px;
    max-width: 120px;
  }

  .clear-all {
    background-color: #fd2127;
    color: #fff;
    border-color: #fff;
    border-width: 2px;
    margin-top: 50px;
  }
`;

const filterStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 20px;
  max-width: 1440px;

  button {
    background-color: #fff;
    padding: 10px 30px;
    border-color: #666;
    border-width: 2px;
    font-weight: 200px;
  }
`;

const baseUrl = 'https://upleveled-api.herokuapp.com/';
console.log(baseUrl);

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [listOfNamesArray, setListOfNamesArray] = useState([]);
  const [rsvp, setRSVP] = useState('attending');
  const [idCount, setIdCount] = useState(0);
  const [filter, setFilter] = useState('unfiltered');
  const wholeListOfNames = [
    ...listOfNamesArray,
    { id: idCount, firstName, lastName, rsvp },
  ];

  useEffect(() => {
    async function getAllGuests() {
      const response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();
      return setListOfNamesArray(allGuests);
    }

    async function updateGuest() {
      const response = await fetch(`${baseUrl}/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: true }),
      });
      const updatedGuest = await response.json();
      return updatedGuest;
    }

    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/1`, { method: 'DELETE' });
      const deletedGuest = await response.json();
      return deletedGuest;
    }

    updateGuest();
    getAllGuests();

    deleteGuest();
  }, []);

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
    setIdCount(idCount + 1);

    async function createNewGuest() {
      const response = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      });
      console.log(response);
      const createdGuest = await response.json();
      console.log(createdGuest);
      return createdGuest;
    }
    createNewGuest(firstName, lastName, rsvp);
  };

  const handleRSVP = (e) => {
    setRSVP(e.target.value);
  };

  function deleteGuest(guestID) {
    const indexOfName = listOfNamesArray.indexOf(guestID);
    let listAfterDeletion = [];
    for (let i = 0; i < listOfNamesArray.length; i++) {
      if (i !== indexOfName) {
        listAfterDeletion.push(listOfNamesArray[i]);
      }
    }
    setListOfNamesArray(listAfterDeletion);

    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/1`, { method: 'DELETE' });
      const deletedGuest = await response.json();
      return deletedGuest;
    }

    deleteGuest();
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
        <div css={inputContainterStyles}>
          <UserInput
            handleFirstNameChange={handleFirstNameChange}
            handleLastNameChange={handleLastNameChange}
            handleRSVP={handleRSVP}
          ></UserInput>
          <div css={buttonStyles}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <div css={filterStyles}>
          <button onClick={handleNonAttendingFilter}>Non-Attending</button>
          <button onClick={handleAttendingFilter}>Attending</button>
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
      <div css={buttonStyles}>
        <button className="clear-all" onClick={handleClearAll}>
          Clear All
        </button>
      </div>
    </>
  );
}

export default App;
