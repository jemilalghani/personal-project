import React, { Component } from 'react';
import {HorizontalBar, Doughnut} from 'react-chartjs-2';
import './ChartJS.css';
import moment from 'moment';

let colorPalette = ['rgb(245,181,107)','rgb(220,108,120)', 'rgb(67,89,148)', 'rgb(165,100,120)', 'rgb(96,85,110)', 'rgb(170,43,34)'];
let legend = ["joyful", "productive", "average", "unmotivated", "sad", "angry"];
let dataset = [[29,29,29,29,29,29],[29,30,40,33,27,39],[30,25,36,33,25,22],[15,20,25,18,11,10],[25,20,25,28,20,30]];



export default class ChartJS extends Component {
    constructor(){
        super();
        this.state={
            Monday: false,
            Tuesday: false,
            Wednesday:false,
            Thursday:false,
            Friday:false,
            Saturday:false,
            Sunday:false,
            barData: {
                labels: legend,
                datasets: [{
                    backgroundColor: colorPalette,
                    borderColor: 'white',
                    data: dataset[1],
                }]
            }
        }
    }
    componentDidMount(){
        window.addEventListener("resize", this.resize)
        this.dayOfWeek()
    }
    dayOfWeek(){
        let day = moment().format('dddd');
        this.setState({[day]: true});
    }

    resize = () => {
        this.setState({
            resizeWidth: window.innerWidth
        })
        
    }

    randomNumber(){
        let number = Math.floor(Math.random() * 5) 
        const barData = { ...this.state.barData};
        barData.datasets[0].data= dataset[number];
        this.setState({barData})
    }
    render() {
        const {barData} = this.state;
        console.log("this.state.resizeWidth",this.state.resizeWidth)


        return (
            <div className="chartjs-container">
                <HorizontalBar
                data={barData}
                redraw={true}
                height={1}
                width={2}
	            options={{
                    
                    legend: { display: false },
                    maintainAspectRatio: true,
                    scales: {   xAxes: [{ticks: {display: false}, gridLines: {drawBorder: false,display:false}}],
                                yAxes: [{categoryPercentage: 1.0, gridLines: {display:false}}] 
                            }
                }}/>
                <div className="weekButtons">
                    <button className={this.state.Monday?"show": 'hide'} onClick={()=>this.randomNumber()}>Monday</button>
                    <button className={this.state.Tuesday? "show": 'hide'} onClick={()=>this.randomNumber()}>Tuesday</button>
                    <button className={this.state.Wednesday? "show" : 'hide'} onClick={()=>this.randomNumber()}>Wednesday</button>
                    <button className={this.state.Thursday? "show" : 'hide'} onClick={()=>this.randomNumber()}>Thursday</button>
                    <button className={this.state.Friday? "show": 'hide'} onClick={()=>this.randomNumber()}>Friday</button>
                    <button className={this.state.Saturday? "show":'hide'} onClick={()=>this.randomNumber()}>Saturday</button>
                    <button className={this.state.Sunday? "show": 'hide'} onClick={()=>this.randomNumber()}>Sunday</button>
                </div>
                <Doughnut
                    data={barData}
                    redraw={true}
                    height={1}
                    width={1}
                    options={{
                        legend: { display: false },
                        maintainAspectRatio: true
                    }}/>
            </div>
        );
    }
}