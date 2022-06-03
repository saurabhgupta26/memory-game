import React, { Component } from 'react'
import Grid from "./Grid"

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tiles: [
                { "value": "A", "isMatch": false },
                { "value": "B", "isMatch": false },
                { "value": "C", "isMatch": false },
                { "value": "D", "isMatch": false },
                { "value": "E", "isMatch": false },
                { "value": "F", "isMatch": false },
                { "value": "G", "isMatch": false },
                { "value": "H", "isMatch": false }
            ],
            shuffledTiles: [],
            count: 0,
            firstChoice: null,
            secondChoice: null,
        }
    }
    disable = false;

    componentDidMount() {
        this.shuffleDeck();
    }

    componentDidUpdate() {
        if (this.state.firstChoice && this.state.secondChoice) {
            this.disabled = true;
            if (this.state.firstChoice.value === this.state.secondChoice.value) {
                this.setState({
                    shuffledTiles: this.state.shuffledTiles
                        .map(tile => {
                            if (tile.value === this.state.firstChoice.value) {
                                return { ...tile, isMatch: true };
                            } else {
                                return tile;
                            }
                        })
                });
                this.resetChoices();
            } else {
                setTimeout(() => {
                    this.resetChoices();
                }, 1000);
            }
        }
    }

    resetChoices = () => {
        this.setState({
            firstChoice: null,
            secondChoice: null,
            count: this.state.count + 1,
            // disabled: false
        })
        this.disabled = false;
    }
    shuffleDeck = () => {
        const shuffledDeck = [...this.state.tiles, ...this.state.tiles]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        this.setState({ shuffledTiles: shuffledDeck, firstChoice: null, secondChoice: null, count: 0 })
    }
    handleChange = (card) => {
        if (!this.state.firstChoice) {
            this.setState({ firstChoice: card, })
        } else {
            this.setState({ secondChoice: card, })
        }
    }
    render() {
        window.onbeforeunload = function (event) {
            return window.confirm('Are you sure you want to leave?');
        };
        return (
            <div className="background">
                <div className="flex flex_baseline flex-align-start">
                    <div className="d-block">
                        <h2 className="title">Memory Game</h2>
                        <p className="description">The memory game, or concentration, as it is sometimes called, is a popular card game played by children and adults around the world. Good memory is one of the qualities required in order to succeed in it. This, however, is not enough. When it is assumed that the players have perfect memory, the memory game can be seen as a game of strategy. The game is analysed under this assumption and the optimal strategy is found. It is simple and perhaps unexpected.
                            <br />In contrast to the simplicity of the optimal strategy, the analysis leading to its optimality proof is rather involved. It supplies an interesting example of concrete mathematics of the sort used in the analysis of algorithms. It is doubtful whether this analysis could have been carried out without resort to experimentation and a substantial use of automated symbolic computations.</p>
                    </div>
                    <div className="container firstRow">
                        {this.state.shuffledTiles.map(tile => {
                            return <Grid
                                tile={tile}
                                key={tile.id}
                                handleChange={this.handleChange}
                                flipped={tile === this.state.firstChoice || tile === this.state.secondChoice || tile.isMatch}
                                disabled={this.disabled}
                            />
                        })}
                    </div>
                    <div className="d-block">
                        <button className='btn_restart' onClick={this.shuffleDeck}> Restart</button>
                        <div className="flex flex-start" style={{ margin: "100px" }}>
                            <h4 className="moves">Moves: </h4>
                            <p className='score'> &nbsp;{this.state.count}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}