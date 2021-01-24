import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const monthTable = {
  Jan: 'January',
  Feb: 'February',
  Mar: 'March',
  Apr: 'April',
  May: 'May',
  Jun: 'June',
  Jul: 'July',
  Aug: 'August',
  Sep: 'September',
  Oct: 'October',
  Nov: 'November',
  Dec: 'December',
};

const HostDetails = ({ name, date }) => {
  const month = monthTable[date.split(' ')[1]];
  const year = date.split(' ')[3];
  return (
    <div>
      <p>Hosted by { name }</p>
      <p>Joined in {`${month} ${year}`}</p>
    </div>
  );
};

export default HostDetails;

HostDetails.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};