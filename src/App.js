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
  flex-direction: row;
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
  margin-top: 52px;
  margin-left: 20px;
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
  align-items: center;
  padding: 10px 20px;
  max-width: 800px;

  button {
    background-color: #fff;
    padding: 10px 30px;
    border-color: #666;
    border-width: 2px;
    font-weight: 200px;
    margin-left: 10px;
  }
`;

const baseUrl = 'https://upleveled-api.herokuapp.com';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [listOfNamesArray, setListOfNamesArray] = useState([]);
  const [attending, setAttending] = useState('Attending');
  const [idCount, setIdCount] = useState(0);
  const [filter, setFilter] = useState('unfiltered');
  const wholeListOfNames = [
    ...listOfNamesArray,
    { id: idCount, firstName, lastName, attending },
  ];

  useEffect(() => {
    async function getAllGuests() {
      const response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();
      setListOfNamesArray(allGuests);
    }
    getAllGuests();
  }, []);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  async function createNewGuest() {
    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, attending }),
    });
    const createdGuest = await response.json();
    return createdGuest;
  }

  async function handleSubmit() {
    setListOfNamesArray(wholeListOfNames);
    setLastName('');
    setFirstName('');
    setIdCount(idCount + 1);

    const newGuest = await createNewGuest();
    return newGuest;
  }

  const handleRSVP = (e) => {
    if (e.target.value === 'Attending') {
      setAttending('Attending');
    } else if (e.target.value === 'Not Attending') {
      setAttending('Not Attending');
    }
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
  }

  const clearAllListNameHelper = () => {
    const urlArray = [];
    for (let i = 0; i < listOfNamesArray.length; i++) {
      urlArray.push(`${baseUrl}/${listOfNamesArray[i].id}`);
    }
    return urlArray;
  };

  async function deleteAllGuestsFromServer() {
    const urls = clearAllListNameHelper();

    for (const url of urls) {
      const response = await fetch(`${url}`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();
      console.log(deletedGuest);
    }
  }

  async function handleClearAll() {
    const deleteGuests = await deleteAllGuestsFromServer();
    setListOfNamesArray([]);
    return deleteGuests;
  }

  const filterListOfNames = listOfNamesArray.filter((name) => {
    if (filter === 'Attending' && name.attending !== 'Attending') {
      return false;
    } else if (
      filter === 'Not Attending' &&
      name.attending !== 'Not Attending'
    ) {
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
            firstName={firstName}
            lastName={lastName}
          ></UserInput>
          <div css={buttonStyles}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <div css={filterStyles}>
          <p>Filter by: </p>
          <button onClick={handleAttendingFilter}>Attending</button>
          <button onClick={handleNonAttendingFilter}>Not Attending</button>
          <button onClick={handleViewAllGuests}>All Guests</button>
        </div>
        <div>
          <GuestList
            wholeListOfNames={wholeListOfNames}
            deleteGuest={deleteGuest}
            filterListOfNames={filterListOfNames}
            // deleteGuestFromServer={deleteGuestFromServer}
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
