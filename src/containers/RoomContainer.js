import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Room from '../components/Room';

const mapStateToProps = state => ({
  friends: state.userInfo.friends,
  chatLog: state.chatLog,
  rooms: state.rooms
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
