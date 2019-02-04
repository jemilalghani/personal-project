import React, { Component } from "react";
import { HorizontalBar, Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import "./UserChartJS.css";
import moment from "moment";
import axios from "axios";

let colorPalette = [
  "rgb(245,181,107)",
  "rgb(220,108,120)",
  "rgb(67,89,148)",
  "rgb(165,100,120)",
  "rgb(96,85,110)",
  "rgb(170,43,34)"
];
let legend = ["joyful", "productive", "average", "unmotivated", "sad", "angry"];
let dataset = [];
let Monday = ["Monday"];
let Tuesday = ["Tuesday"];
let Wednesday = ["Wednesday"];
let Thursday = ["Thursday"];
let Friday = ["Friday"];
let Saturday = ["Saturday"];
let Sunday = ["Sunday"];

class UserChartJS extends Component {
  constructor() {
    super();
    this.state = {
      pixals: [],
      barData: {
        labels: legend,
        datasets: [
          {
            backgroundColor: colorPalette,
            borderColor: "white",
            data: dataset
          }
        ]
      }
    };
  }
  async componentDidMount() {
    await axios.get(`/api/pixals/${this.props.user.id}`).then(pixals => {
      this.setState({ pixals: pixals.data });
    });
    this.dayOfWeek(Monday);
  }
  getPixals() {
    axios.get(`/api/pixals/${this.props.user.id}`).then(pixals => {
      this.setState({ pixals: pixals.data });
    });
  }
  checkDatabase(daySelected) {
    if (this.state.pixals) {
      for (let i = 0; i < this.state.pixals.length; i++) {
        let date = moment(this.state.pixals[i].date).format("dddd");
        date === daySelected[0] && daySelected.push(this.state.pixals[i].mood);
      }
      if (daySelected.length > 1) {
        this.pushToDataSet(daySelected);
      }
    }
  }
  clear() {
    const barData = { ...this.state.barData };
    dataset = [];
    barData.datasets[0].data = dataset;
    this.setState({ barData });
  }
  dayOfWeek(day) {
    this.clear();
    this.getPixals();
    this.checkDatabase(day);
    this.setState({ day });
  }
  pushToDataSet(day) {
    dataset.push(day.filter(item => item === "rgb(245,181,107)").length);
    dataset.push(day.filter(item => item === "rgb(220,108,120)").length);
    dataset.push(day.filter(item => item === "rgb(67,89,148)").length);
    dataset.push(day.filter(item => item === "rgb(165,100,120)").length);
    dataset.push(day.filter(item => item === "rgb(96,85,110)").length);
    dataset.push(day.filter(item => item === "rgb(170,43,34)").length);
  }

  render() {
    const { barData } = this.state;
    return (
      <div className="chartjs-container2">
        <HorizontalBar
          data={barData}
          redraw={true}
          height={1}
          width={2}
          options={{
            legend: { display: false },
            maintainAspectRatio: true,
            scales: {
              xAxes: [
                {
                  ticks: { display: false },
                  gridLines: { drawBorder: false, display: false }
                }
              ],
              yAxes: [
                {
                  categoryPercentage: 1.0,
                  gridLines: { display: false },
                  ticks: {
                    fontFamily: "VT323, monospace",
                    fontSize: "15",
                    fontColor: "rgb(138, 139, 139)"
                  }
                }
              ]
            }
          }}
        />
        <div className="weekUserButtons">
          <button
            onClick={() => this.dayOfWeek(Monday)}
            style={{ color: this.state.day === Monday && "black" }}
          >
            Monday
          </button>
          <button
            onClick={() => this.dayOfWeek(Tuesday)}
            style={{ color: this.state.day === Tuesday && "black" }}
          >
            Tuesday
          </button>
          <button
            onClick={() => this.dayOfWeek(Wednesday)}
            style={{ color: this.state.day === Wednesday && "black" }}
          >
            Wednesday
          </button>
          <button
            onClick={() => this.dayOfWeek(Thursday)}
            style={{ color: this.state.day === Thursday && "black" }}
          >
            Thursday
          </button>
          <button
            onClick={() => this.dayOfWeek(Friday)}
            style={{ color: this.state.day === Friday && "black" }}
          >
            Friday
          </button>
          <button
            onClick={() => this.dayOfWeek(Saturday)}
            style={{ color: this.state.day === Saturday && "black" }}
          >
            Saturday
          </button>
          <button
            onClick={() => this.dayOfWeek(Sunday)}
            style={{ color: this.state.day === Sunday && "black" }}
          >
            Sunday
          </button>
        </div>
        <Doughnut
          data={barData}
          redraw={true}
          height={1}
          width={1}
          options={{
            legend: { display: false },
            maintainAspectRatio: true
          }}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(UserChartJS);
