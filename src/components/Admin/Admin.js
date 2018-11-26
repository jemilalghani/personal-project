import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css';
import moment from 'moment';


export default class Admin extends Component {
    constructor(){
        super();
        this.state={
            user: null,
            username: null,
            password: null,
            count: null,
            percentOne: '0%',
            percentTwo: '0%',
            percentThree: '0%',
            green: null
        }
    }
    async componentDidMount(){
        const count = await axios('/api/count');
        const percents = await axios('/api/usercount');
        const users = await axios('/api/users');
        const todayUser = await axios(`/api/email/${moment().format('YYYY-MM-DD')}`)
        let one = (percents.data[0].count / 366)*100
        let two = (percents.data[1].count / 366)*100
        let three = (percents.data[2].count / 366)*100
        this.setState({count: count.data[0].count})
        this.setState({
            percentOne: `${one}%`,
            percentTwo: `${two}%`,
            percentThree: `${three}%`,
            one: percents.data[0].count,
            two: percents.data[1].count,
            three: percents.data[2].count,
            users: users,
            green: todayUser.data
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
        this.setState({message: null})
      }
      logout =()=>{
          axios.post('/api/adminlogout').then(res=>{
              console.log(res)
              this.setState({user:null})
          })
      }
      getMessage = error => error.response ? error.response.data ? error.response.data.message: JSON.stringify(error.response.data, null, 2): error.message;
      render() {
          let display = this.state.users && this.state.users.data.map((user, i)=>{
                    return <div key={i} className="users">
                                {i+1}.
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </div>
                }
          )
          let activity = this.state.green && this.state.green.map((el, i)=>{
            return <div key={i} className="users">
                        {i+1}.
                        <p>{el.name}</p>
                        <p>{el.email}</p>
                    </div>
          })
          return (
              this.state.user ? 
                <div className="AdminPage">
                    <p>Total Users: {this.state.count}</p>
                    <h2>User Activity:</h2>
                    
                    <div className="barcontainer">
                        <div className="bar" style={{height:"24px",width:this.state.percentOne}}></div>
                        <p>{this.state.one}/366</p>
                    </div>
                    <div className="barcontainer">
                        <div className="bar" style={{height:"24px",width:this.state.percentTwo}}></div>
                        <p>{this.state.two}/366</p>
                    </div>
                    <div className="barcontainer">
                        <div className="bar" style={{height:"24px",width:this.state.percentThree}}></div>
                        <p>{this.state.three}/366</p>
                    </div>
                    <div className="userContainer">
                        {display}
                    </div>
                    <div>
                        {activity}
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