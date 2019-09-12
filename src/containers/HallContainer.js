import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Hall from '../components/Hall';

const mapStateToProps = state => ({
  friends: state.userInfo.friends,
  rooms: state.rooms
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hall);
