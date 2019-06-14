import React from 'react';
import './SetMultiplier.css';

const SetMultiplier = props => {
    return (
        <div className="main">
            <form className="multiplier" onSubmit={event => event.preventDefault()}>
                <div className="select-box">
                    <input type="radio" id="one" name="multiplier" value="1" defaultChecked={true}
                           onChange={event => props.setMultiplier(event.target.value)}/>
                    <label htmlFor="one">x1</label>
                </div>
                <div className="select-box">
                    <input type="radio" id="two" name="multiplier" value="2"
                           onChange={event => props.setMultiplier(event.target.value)}/>
                    <label htmlFor="two">x2</label>
                </div>
                <div className="select-box">
                    <input type="radio" id="three" name="multiplier" value="3"
                           onChange={event => props.setMultiplier(event.target.value)}/>
                    <label htmlFor="three">x3</label>
                </div>
                <div className="select-box">
                    <input type="radio" id="four" name="multiplier" value="4"
                           onChange={event => props.setMultiplier(event.target.value)}/>
                    <label htmlFor="four">x4</label>
                </div>
                <div className="select-box">
                    <input type="radio" id="five" name="multiplier" value="5"
                           onChange={event => props.setMultiplier(event.target.value)}/>
                    <label htmlFor="five">x5</label>
                </div>
            </form>
            <form className="sort">
                <input type="checkbox" id="select" onChange={event => props.onSortSelect(event.target.checked)} />
                <label htmlFor="select">sort by score</label>
            </form>
        </div>
    )
};

export default SetMultiplier;
