import React from 'react';
import { shallow } from 'enzyme';
import SetMultiplier from './SetMultiplier'

it('renders without crashing', () => {
    shallow(<SetMultiplier/>)
});

it('should call setMultiplier', () => {
    const mockedSetMultiplier = jest.fn();
    const setMultiplierComponent = shallow(<SetMultiplier setMultiplier={mockedSetMultiplier} />);
    const secondMultiplier = setMultiplierComponent.find('#two');
    secondMultiplier.simulate('change', {target: {value: 2}});

    expect(mockedSetMultiplier).toBeCalledWith(2);
});

it('should call onSortSelect', () => {
    const mockedOnSortSelect = jest.fn();
    const setMultiplierComponent = shallow(<SetMultiplier onSortSelect={mockedOnSortSelect} />);
    const selectButton = setMultiplierComponent.find('#select');
    selectButton.simulate('change', {target: {checked: true}});

    expect(mockedOnSortSelect).toBeCalledWith(true);
});
