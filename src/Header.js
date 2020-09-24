/** @jsx jsx */
/** @jsxFrag React.Fragment */
/*eslint-disable no-unused-vars*/
import React from 'react';
import { jsx, css } from '@emotion/core';

const headerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 24px;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
`;

function Header() {
  return (
    <div css={headerStyles}>
      <p>Guest List</p>
    </div>
  );
}

export default Header;
