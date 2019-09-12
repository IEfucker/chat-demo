import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import UserList from '../components/UserList';

const mapStateToProps = (state, props) => ({
  users: props.users || state.userInfo.friends,
  title: props.title,
  rightSlot: props.rightSlot
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
