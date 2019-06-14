import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import PlayersList from "./components/PlayersList/PlayersList";
import AddPlayer from "./components/AddPlayer/AddPlayer";
import Player from './components/Player/Player';
import SetMultiplier from "./components/SetMultiplier/SetMultiplier";

it('renders without crashing', () => {
  shallow(<App />);
});

it('should update player score', () => {

  const appComponent = shallow(<App/>);

  const onScoreUpdate = appComponent.find(PlayersList).prop('onScoreUpdate');
  onScoreUpdate(0, 5);

  const playersAfterUpdate = appComponent.state().players;

  const firstPlayerScoreAfterChange = playersAfterUpdate[0].score;

  expect(firstPlayerScoreAfterChange).toEqual(10);
});

it('should call onPlayerAdd', () => {
  const appComponent = shallow(<App />);
  const onPlayerAdd = appComponent.find(AddPlayer).prop('onPlayerAdd');
  onPlayerAdd('Ania');
  const players = appComponent.state('players');

  expect(players.length).toEqual(3);
  expect(players[2].name).toEqual('Ania');
  expect(players[2].score).toEqual(0);
});

it('should call onRemovePlayer', () => {
  const appComponent = mount(<App />);
  const playersListComponent = appComponent.find(PlayersList);
  const onPlayerRemove = playersListComponent.find(Player).first().prop('onPlayerRemove');
  onPlayerRemove(0);
  const players = appComponent.state('players');

  expect(players.length).toEqual(1);
});

it('should call setMultiplier', () => {
  const appComponent = mount(<App />);
  const setMultiplierComponent = appComponent.find(SetMultiplier);
  const fifthMultiplier = setMultiplierComponent.find('#five');
  fifthMultiplier.simulate('change', {target: {value: 5}});
  const multiplierValue = appComponent.state('multiplier');

  expect(multiplierValue).toEqual(5);
});

it('should call onSortSelect', () => {
  const appComponent = mount(<App />);
  const setMultiplierComponent = appComponent.find(SetMultiplier);
  const selectButton = setMultiplierComponent.find('#select');
  selectButton.simulate('change', {target: {checked: true}});
  const isSelect = appComponent.state('isSort');

  expect(isSelect).toEqual(true);
});

it('should call onNameUpdate', () => {
  const appComponent = mount(<App/>);
  const namePlayerBeforeChanging = appComponent.state('players')[0].name;
  const playersListComponent = appComponent.find(PlayersList);
  const firstPlayer = playersListComponent.find(Player).first().find('.Player__name');
  firstPlayer.simulate('change', {target: {value: 'Kuna'}});
  firstPlayer.simulate('blur');
  const namePlayerAfterChanging = appComponent.state('players')[0].name;

  expect(namePlayerBeforeChanging).toEqual('Kunegunda');
  expect(namePlayerAfterChanging).toEqual('Kuna');
});

it('should call sortPlayers', () => {
  const players = [
    {
      name: 'Kunegunda',
      score: 5
    },
    {
      name: 'Antoś',
      score: 0
    },
    {
      name: 'Oskar',
      score: 10
    }
  ];
  const appComponent = mount(<App />);
  appComponent.setState({ players });
  const firstPlayerBeforeSoring = appComponent.state('players')[0].name;
  const setMultiplierComponent = appComponent.find(SetMultiplier);
  const selectButton = setMultiplierComponent.find('#select');
  selectButton.simulate('change', {target: {checked: true}});
  appComponent.instance().sortPlayers();
  const firstPlayerAfterSorting = appComponent.state('players')[0].name;

  expect(firstPlayerBeforeSoring).toEqual('Kunegunda');
  expect(firstPlayerAfterSorting).toEqual('Oskar');
});
