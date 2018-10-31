import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeColor} from '../../ducks/reducer';
import './ColorTheme.css';

class ColorTheme extends Component{
    constructor(){
        super();
        this.state={
            toggle1: false,
            toggle2: false,
            toggle3: false,
            toggle4: false,
            toggle5: false,
            toggle6: false,
        }
    }
    toggle1 = () =>{this.setState((prevState)=>{return{toggle1: !prevState.toggle1}})}
    toggle2 = () =>{this.setState((prevState)=>{return{toggle2: !prevState.toggle2}})}
    toggle3 = () =>{this.setState((prevState)=>{return{toggle3: !prevState.toggle3}})}
    toggle4 = () =>{this.setState((prevState)=>{return{toggle4: !prevState.toggle4}})}
    toggle5 = () =>{this.setState((prevState)=>{return{toggle5: !prevState.toggle5}})}
    toggle6 = () =>{this.setState((prevState)=>{return{toggle6: !prevState.toggle6}})}
    render(){
        const {changeColor} = this.props
        return (
            <div>
                <div className="themeOne">
                    <button id="color-one" onClick={()=>changeColor('rgb(245,181,107)')} 
                    onMouseOver={this.toggle1} onMouseLeave={this.toggle1}>1</button>
                    <button id="color-two" onClick={()=>changeColor('rgb(220,108,120)')}
                    onMouseOver={this.toggle2} onMouseLeave={this.toggle2}>2</button>
                    <button id="color-three" onClick={()=>changeColor('rgb(67,89,148)')}
                    onMouseOver={this.toggle3} onMouseLeave={this.toggle3}>3</button>
                    <button id="color-four" onClick={()=>changeColor('rgb(165,100,120)')}
                    onMouseOver={this.toggle4} onMouseLeave={this.toggle4}>4</button>
                    <button id="color-five" onClick={()=>changeColor('rgb(96,85,110)')}
                    onMouseOver={this.toggle5} onMouseLeave={this.toggle5}>5</button>
                    <button id="color-six" onClick={()=>changeColor('rgb(170,43,34)')}
                    onMouseOver={this.toggle6} onMouseLeave={this.toggle6}>6</button>
                </div>
                <div className="Emotions">
                    <p className={this.state.toggle1? 'show':''}> Joyful, Happy, Relaxed, Great, Content</p>
                    <p className={this.state.toggle2? 'show':''}> Productive, Energetic, Active, Motivated</p>
                    <p className={this.state.toggle3? 'show':''}> Average, Normal, Uneventful, Good</p>
                    <p className={this.state.toggle4? 'show':''}> Sick, Tired, Lazy, Bored, Unmotivated</p>
                    <p className={this.state.toggle5? 'show':''}> Sad, Lonely, Insecure, Numb</p>
                    <p className={this.state.toggle6? 'show':''}> Angry, Anxious, Frustrated, Grumpy</p>
                </div>

            </div>
        );
    };
}
function mapStateToProps(state){
    return{
        color:state.color
    }
}
export default connect(mapStateToProps, {changeColor})(ColorTheme);