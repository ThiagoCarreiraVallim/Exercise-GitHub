import React, { Component } from 'react';
import { requestUser, requestRepo } from '../services/requestAPI';
import './User.css'

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
    if (loading) return <h3>Loading</h3>
    return (
      <div className="userData">
        <h1>Dados do Usuário</h1>
        <h2 className="name">{ user.name }</h2>
        <img className="userImg" src={ user.avatar_url } alt="Avatar do usuário" />
        <div className="followers">
          <p>Seguindo: { user.following }</p>
          <p>Seguidores: { user.followers }</p>
        </div>
        <p>Endereço: { user.location }</p>
        <a className="links" href={ user.html_url }>Link do perfil</a>
        <div className="projects">
          <h2>Projetos</h2>
          {
            projects ? projects.map((project) => {
              return (
                <div key={ project.name } className="projects">
                  <h3 className="projectsTitle">{ project.name }</h3>
                  {project.description && <p>{ project.description }</p>}
                  {project.language && <p>{ project.language }</p>}
                  <a className="links" href={ project.html_url }>Link do repositório</a>
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
