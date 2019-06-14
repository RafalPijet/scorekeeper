import React, {Component} from 'react';
import './App.css';
import PlayersList from './components/PlayersList/PlayersList';
import AddPlayer from "./components/AddPlayer/AddPlayer";
import SetMultiplier from "./components/SetMultiplier/SetMultiplier";

class App extends Component {
    constructor() {
        super();

        this.state = {
            players: [
                {
                    name: 'Kunegunda',
                    score: 5
                },
                {
                    name: 'Antoś',
                    score: 0
                }
            ],
            multiplier: 1,
            isSort: false
        }
    }

    compare = (a, b) => {
        const scoreA = a.score;
        const scoreB = b.score;
        let comparison = 0;

        if (scoreA > scoreB) {
            comparison = -1;
        } else if (scoreA < scoreB) {
            comparison = 1;
        }
        return comparison;
    };

    sortPlayers = () => {

        if (this.state.isSort) {
            let unsorted = this.state.players;
            let sorted = unsorted.sort(this.compare);
            this.setState({
                players: sorted
            })
        }
    };

    onPlayerAdd = playerName => {
        const newPlayer = {
            name: playerName,
            score: 0
        };
        this.setState({
            players: [...this.state.players, newPlayer]
        })
    };

    onNameUpdate = (playerIndex, nameChange) => {
      this.setState({
          players: this.state.players.map((player, index) => {
              if (index === playerIndex) {
                  return { ...player, name: nameChange }
              }
              return player;
          })
      });
    };

    onScoreUpdate = (playerIndex, scoreChange) => {
        const setScoreUpdate = () => new Promise(resolve => resolve(
            this.setState({
                players: this.state.players.map((player, index) => {
                    if (index === playerIndex) {
                        return {...player, score: player.score + scoreChange * this.state.multiplier}
                    }
                    return player;
                })
            })
        ));
        setScoreUpdate()
            .then(() => this.sortPlayers());
    };

    onSortSelect = select => {
        const setSort = () => new Promise(resolve => resolve(
            this.setState({
                isSort: select
            })
        ));
        setSort()
            .then(() => this.sortPlayers());
    };

    setMultiplier = value => {
        this.setState({multiplier: Number(value)});
    };

    onPlayerRemove = playerIndex => {
        this.setState({
            players: this.state.players.filter((player, index) => index !== playerIndex)
        });
    };

    render() {
        return (
            <div className="App">
                <div className="container">
                    <SetMultiplier setMultiplier={this.setMultiplier} onSortSelect={this.onSortSelect}/>
                    <AddPlayer onPlayerAdd={this.onPlayerAdd}/>
                    <PlayersList players={this.state.players} onScoreUpdate={this.onScoreUpdate}
                                 onPlayerRemove={this.onPlayerRemove} onNameUpdate={this.onNameUpdate}/>
                </div>
            </div>
        );
    }
}

export default App;
