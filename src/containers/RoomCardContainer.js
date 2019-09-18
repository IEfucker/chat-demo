import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import RoomCard from '../components/RoomCard';

const mapStateToProps = (state, props) => ({
  friends: state.userInfo.friends,
  user: state.userInfo.user,
  rooms: state.rooms,
  room: props.room,
  owner: props.owner
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomCard);
