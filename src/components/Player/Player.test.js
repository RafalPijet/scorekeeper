import React from 'react';
import { shallow } from 'enzyme';
import Player from './Player';

it('renders without crashing', () => {
    shallow(<Player />);
});

it('renders correct name', () => {
    const playerNamePassed = 'Ania';
    const playerComponent = shallow(<Player name={playerNamePassed} />);

    const playerNameRendered = playerComponent.find('.Player__name').render().attr('value');

    expect(playerNameRendered).toEqual(playerNamePassed);
});

it('renders correct score', () => {
    const playerScore = 21;
    const playerComponent = shallow(<Player score={playerScore} />);

    const playerScoreRendered = Number(playerComponent.find('.Player__score').text());
    expect(playerScoreRendered).toEqual(playerScore);
});

it('should call onPlayerScoreChange with 1 when plus button is clicked', () => {
    const mockedOnPlayerScoreChange = jest.fn();
    const playerComponent = shallow(<Player onPlayerScoreChange={mockedOnPlayerScoreChange} />);

    const plusButton = playerComponent.find('.Player__button').first();

    plusButton.simulate('click');

    expect(mockedOnPlayerScoreChange).toBeCalledWith(1);
});

it('should call onPlayerScoreChange with 1 when minus button is clicked', () => {
   const mockedOnPlayerScoreChange = jest.fn();
   const playerComponent = shallow(<Player onPlayerScoreChange={mockedOnPlayerScoreChange} />);

   const minusButton = playerComponent.find('.Player__button').last();

   minusButton.simulate('click');

   expect(mockedOnPlayerScoreChange).toBeCalledWith(-1);
});

it('should call onPlayerRemove and return the index number of player', () => {
    const playerId = 12345;
    const mockedOnPlayerRemove = jest.fn();
    const playerComponent = shallow(<Player id={playerId} onPlayerRemove={mockedOnPlayerRemove}/>);
    const removeButton = playerComponent.find('.Player__button-remove');

    removeButton.simulate('click');

    expect(mockedOnPlayerRemove).toBeCalledWith(12345);
});

it('update name', () => {
    const playerNameBeforeChanging = 'Ania';
    const playerComponent = shallow(<Player name={playerNameBeforeChanging}/>);
    const playerNameRendered = playerComponent.find('.Player__name');
    playerNameRendered.simulate('change', {target: {value: "Anna"}});
    const playerNameAfterChanging = playerComponent.state('name');

    expect(playerNameAfterChanging).toEqual('Anna');
});
