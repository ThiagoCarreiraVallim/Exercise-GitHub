import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchUserName } from '../action';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    }
    this.handlerInput = this.handlerInput.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
  }

  handlerInput({ target }) {
    this.setState({
      [target.name]: target.value,
    })
  }

  sendSearch() {
    const { userName } = this.state;
    const { searchUser } = this.props;
    searchUser(userName);
  }

  render() {
    const { userName } = this.state;
    const { list } = this.props;
    return (
      <div>
        <form>
          <h1>Pesquise o usuário</h1>
          <input
            type="text"
            value={ userName }
            onChange={ this.handlerInput }
            name="userName"
          />
          <button type="button" onClick={ this.sendSearch }>Pesquisar</button>
        </form>
        <div>
          { list.map((user) => <Link to={`/user/${user.login}`}><div>{user.login}</div></Link>) }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchUser: (query) => dispatch(searchUserName(query)),
});

const mapStateToProps = (state) => ({
  list: state.searchReducer.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);