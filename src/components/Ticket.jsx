import React from 'react'
import PropTypes from 'prop-types'
import './Ticket.css'
import './Ticket'

function Ticket(props){
  var myStyledComponentStyles = {
    backgroundColor: '#ecf0f1',
    fontFamily: 'sans-serif',
    paddingTop: '50px'
  }
  var pinkIssueStyle = {
    backgroundColor: 'pink'
  }
  const ticketInformation =
  <div>
    <h3>{props.location} - {props.names}</h3>
    <h4>{props.formattedWaitTime}</h4>
    <hr/>
  </div>;
  if (props.currentRouterPath === '/admin'){
    return (
      <div onClick={() => {props.onTicketSelection(props.ticketId);}}>
        {ticketInformation}
      </div>
    );
  } else {
    return (
      <div>
        {ticketInformation}
      </div>
    );
  }
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  formattedWaitTime: PropTypes.string,
  currentRouterPath: PropTypes.string,
  onTicketSelection: PropTypes.func,
  ticketId: PropTypes.string.isRequired
};

export default Ticket;
