import React, { Component } from 'react'; 
import "./styles.css";
import imageSample from "./assets/sample.png";

class Ingredient extends Component {
    constructor(props){
        super(props); 

        this.state = {
            ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
            preparation: ['preparation1', 'preparation2', 'preparation3'],
        };
    }
        render() {
            const {ingredients} = this.state; 
            const {preparation} = this.state; 
            return(
                <div className="recipe-form">
                    <img className = "image-style" src = {imageSample} alt = ""/>
                    <div className="style-text">
                        <label>INGREDIENTS</label>
                        <ul className='style-list'>
                            {ingredients.map(task => <i><li>{task}</li></i>)}
                        </ul>
                    </div>
                    <div className="style-text">
                        <label>PREPARATION</label>
                        <ol className='style-list'>
                            {preparation.map(task => <i><li>{task}</li></i>)}
                        </ol>
                    </div>
                </div>
            );
        }
}

export default Ingredient; 