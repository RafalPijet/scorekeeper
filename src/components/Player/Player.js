import React, {Component} from 'react';
import './Player.css';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.name !== this.state.name) {
            this.setState({name: nextProps.name});
        }
    }

    handleChangeName = () => {
        this.props.onPlayerNameChange(this.state.name);
    };

    render() {
        return (
            <li className="Player">
                <input className="Player__name" type="text" value={this.state.name}
                       onChange={event => this.setState({name: event.target.value})} onBlur={() => this.handleChangeName()}/>
                <span className="Player__score">{this.props.score}</span>
                <span className="Player__button" onClick={() => this.props.onPlayerScoreChange(1)}>+</span>
                <span className="Player__button" onClick={() => this.props.onPlayerScoreChange(-1)}>-</span>
                <span className="Player__button-remove" onClick={() => this.props.onPlayerRemove(this.props.id)}>Remove</span>
            </li>
        );
    }
}

export default Player;
