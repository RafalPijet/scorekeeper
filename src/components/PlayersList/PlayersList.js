import React from 'react';
import Player from '../Player/Player';
import './PlayersList.css';

const PlayersList = props => (
    <ul className="PlayersList">
        {props.players.map((player, i) => (
            <Player
                key={i}
                id={i}
                name={player.name}
                score={player.score}
                onPlayerRemove={props.onPlayerRemove}
                onPlayerScoreChange={points => props.onScoreUpdate(i, points)}
                onPlayerNameChange={newName => props.onNameUpdate(i, newName)}
            />
        ))}
    </ul>
);

export default PlayersList;
