import PlayersList from './PlayersList';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Player from "../Player/Player";

it('renders without crashing', () => {
   shallow(<PlayersList players={[]} />);
});

it('renders correct number of players', () => {
    const players = [
        {
            name: 'Kunegunda',
            score: 5
        },
        {
            name: 'Antoś',
            score: 0
        }
    ];
    const playerComponent = shallow(<PlayersList players={players} />);

    const expectedPlayersNumber = playerComponent.find(Player).length;

    expect(expectedPlayersNumber).toEqual(2);
});

it('should call onScoreUpdate', () => {
    const players = [
        {
            name: 'Kunegunda',
            score: 5
        },
        {
            name: 'Antoś',
            score: 0
        }
    ];
    const mockedOnScoreUpdate = jest.fn();
    const playerComponent = shallow(<PlayersList players={players} onScoreUpdate={mockedOnScoreUpdate} />);

    const firstPlayer = playerComponent.find(Player).last();

    const onPlayerScoreChange = firstPlayer.prop('onPlayerScoreChange');
    onPlayerScoreChange(5);

    expect(mockedOnScoreUpdate).toBeCalledWith(1, 5);
});

it('should call onPlayerRemove', () => {
    const players = [
        {
            name: 'Kunegunda',
            score: 5
        },
        {
            name: 'Antoś',
            score: 0
        }
    ];
    const mockedOnPlayerRemove = jest.fn();
    const playerListComponent = mount(<PlayersList players={players} onPlayerRemove={mockedOnPlayerRemove} />);

    const firstPlayer = playerListComponent.find(Player).first();
    const removeButton = firstPlayer.find('.Player__button-remove');
    removeButton.simulate('click');

    expect(mockedOnPlayerRemove).toBeCalledWith(0);
});
