import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css';


export default class Admin extends Component {
    constructor(){
        super();
        this.state={
            user: true,
            username: null,
            password: null,
            count: null,
            percentOne: '0%',
            percentTwo: '0%',
            percentThree: '0%'
        }
    }
    async componentDidMount(){
        const count = await axios('/api/count');
        const percents = await axios('/api/usercount')
        let one = (percents.data[0].count / 365)*100
        let two = (percents.data[1].count / 365)*100
        let three = (percents.data[2].count / 365)*100
        this.setState({count: count.data[0].count})
        this.setState({
            percentOne: `${one}%`,
            percentTwo: `${two}%`,
            percentThree: `${three}%`
        })
    }
    handleChange(key, e){
        this.setState({[key]: e.target.value})
    }
    login = () => {
        const username = this.state.username;
        const password = this.state.password;
        axios.post('/api/login', {
          username: username,
          password: password
        }).then(response => {
          this.setState({ user: response.data });
        }).catch(error => {
          this.setState({ message: this.getMessage(error) });
          console.log(error)
        });
      }
      logout =()=>{
          axios.post('/api/adminlogout').then(res=>{
              console.log(res)
              this.setState({user:null})
          })
      }
      getMessage = error => error.response ? error.response.data ? error.response.data.message: JSON.stringify(error.response.data, null, 2): error.message;
      render() {
          return (
              this.state.user ? 
                <div className="AdminPage">
                    <p>Total Users: {this.state.count}</p>
                    <h2>User Activity:</h2>
                    
                    <div className="barcontainer">
                        <div className="bar" style={{height:"24px",width:this.state.percentOne}}></div>
                    </div>
                    <div className="barcontainer">
                        <div className="bar" style={{height:"24px",width:this.state.percentTwo}}></div>
                    </div>
                    <div className="barcontainer">
                        <div className="bar" style={{height:"24px",width:this.state.percentThree}}></div>
                    </div>
    
                    <button onClick={this.logout}>Logout</button>

                </div>
                :
                <div className="Login">
                    <h2>Admin</h2>
                    <p>{this.state.message && this.state.message}</p>
                    UserName: <input onChange={(e)=>this.handleChange('username', e)}></input>
                    Password: <input onChange={(e)=>this.handleChange('password', e)} type="password"></input>
                    <button onClick={this.login}>Log in</button>
                </div>
        );
    }
}
                                //   register = () => {
                                //       const username = this.state.username;
                                //       const password = this.state.password;
                                //       axios.post('/api/register', {
                                //         username,
                                //         password
                                //       }).then(response => {
                                //         this.setState({ user: response.data });
                                //       }).catch(error => {
                                //         this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
                                //       });
                                //     };