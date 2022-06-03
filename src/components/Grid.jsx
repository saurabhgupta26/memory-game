import React from 'react';

const Grid = ({ tile, handleChange, flipped, disabled }) => {
    const handleClick = () => {
        if (!disabled) {
            handleChange(tile);
        }
    }
    return (
        <div className="container grid" key={tile.id} >
            <div className={flipped ? 'flipped' : ''}>
                <button value={tile.value} className='front'> {tile.value} </button>
                <img className='back' onClick={handleClick} src="/images/front.jpeg" alt="back" />
            </div>
        </div >
    );
}

export default Grid;
