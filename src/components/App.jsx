import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Error404 from './Error404';
import { Switch, Route, withRouter } from 'react-router-dom';
import Moment from 'moment';
import Admin from './Admin';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null
    };
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
    this.updateTicketElapsedWaitTime = this.updateTicketElapsedWaitTime.bind(this);
  }

  componentDidMount() {
    console.log('in');
    this.waitTimeUpdateTimer = setInterval(() =>
    {
      this.updateTicketElapsedWaitTime();
      console.log(this);
    }, 5000 );
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
    console.log('out');
  }

  updateTicketElapsedWaitTime() {
    let newMasterTicketList = Object.assign({}, this.props.masterTicketList);
    console.log(this.props);
    Object.keys(newMasterTicketList).forEach(ticketId => {
      newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
      console.log(newMasterTicketList[ticketId].timeOpen.fromNow(true));
    });
    this.setState({masterTicketList: newMasterTicketList});
  }

  handleChangingSelectedTicket(ticketId){
    this.setState({selectedTicket: ticketId});
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><TicketList ticketList={this.props.masterTicketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl />} />
          <Route path='/admin' render={(props)=><Admin ticketList={this.props.masterTicketList} currentRouterPath={props.location.pathname}
          onTicketSelection={this.handleChangingSelectedTicket}
          selectedTicket={this.state.selectedTicket}/>} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  masterTicketList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    masterTicketList: state
  };
};

export default withRouter(connect(mapStateToProps)(App));
