import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchUserName } from '../action';
import logo from '../images/github-logo-white.png';
import './Search.css';

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
      <div className="searchPage">
        <div>
          <img src={ logo } className="logo" />
          <form>
            <h1>Pesquise o usuário</h1>
            <div className="inputForm">
              <input
                type="text"
                value={ userName }
                onChange={ this.handlerInput }
                name="userName"
              />
              <div className="buttonFake" onClick={ this.sendSearch }>Pesquisar</div>
            </div>
          </form>
          <div className="results">
            { list.length > 0 ? <h3>Usuários encontrados</h3> : null }
            { list.map((user) => <Link to={`/user/${user.login}`} key={ user.login } className="linkUser"><div>{user.login}</div></Link>) }
          </div>
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