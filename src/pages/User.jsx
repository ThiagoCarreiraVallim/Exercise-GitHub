import React, { Component } from 'react';
import { requestUser, requestRepo } from '../services/requestAPI';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {},
      projects: false,
    }
    this.searchUser = this.searchUser.bind(this);
    this.searchRepo = this.searchRepo.bind(this);
  }

  async searchUser() {
    const { match: { params: { user } } } = this.props;
    const obj = await requestUser(user)
    this.setState({
      loading: false,
      user: obj,
    })
    this.searchRepo(user)
  }

  async searchRepo(user) {
    const obj = await requestRepo(user);
    const favRepos = [obj[0], obj[1], obj[2]];
    this.setState({
      projects: favRepos,
    })
  }

  componentDidMount() {
    this.searchUser();
  }

  render() {
    const { loading, user, projects } = this.state;
    console.log(projects);
    if (loading) return <h3>Loading</h3>
    return (
      <div>
        <h1>Dados do Usuário</h1>
        <h2>Nome: { user.name }</h2>
        <img src={ user.avatar_url } alt="Avatar do usuário" />
        <p>Seguindo: { user.following }</p>
        <p>Seguidores: { user.followers }</p>
        <p>Endereço: { user.location }</p>
        <a href={ user.html_url }>Link do perfil</a>
        <div>
          <h2>Projetos</h2>
          {
            projects ? projects.map((project) => {
              return (
                <div>
                  <h3>{ project.name }</h3>
                  <p>{ project.description }</p>
                  <p>{ project.language }</p>
                  <a href={ project.html_url }>Link do repositório</a>
                </div>
              );
            }) : <span>Loading...</span>
          }
        </div>
      </div>
    );
  }
}

export default User;
