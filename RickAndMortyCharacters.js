import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


class RickAndMortyCharacters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    const { page } = this.state;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
      this.setState({
        characters: response.data.results,
      });
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  handlePrevPage = () => {
    this.setState((prevState) => ({ page: Math.max(prevState.page - 1, 1) }), this.fetchCharacters);
  };

  handleNextPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), this.fetchCharacters);
  };

  render() {
    const { characters } = this.state;

    return (
      <div className="RickAndMortyCharacters">
        <div className="pagination">
          <button onClick={this.handlePrevPage}>Anterior</button>
          <button onClick={this.handleNextPage}>Siguiente</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Especie</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character) => (
              <tr key={character.id}>
                <td>
                  <img src={character.image} alt={character.name} />
                </td>
                <td>{character.name}</td>
                <td>{character.species}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RickAndMortyCharacters;
