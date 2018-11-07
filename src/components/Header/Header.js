import React, { Component } from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {userLogin} from '../../ducks/reducer';
import moment from 'moment';
import axios from 'axios';

class Header extends Component {
    constructor(){
        super();
        this.state={
            buttonOn: true,
            pixalCheck: null,
            userId: null,
            duplicatedEntry: false
        }
        // this.checkPixal=this.checkPixal.bind(this);
        this.disable=this.disable.bind(this);
        this.time=this.time.bind(this);
    }
    componentDidMount(){
        axios.get('/api/me').then(response=>{
            this.props.userLogin(response.data);
        }) 
        // this.disable()
    }

    // componentWillUnmount(){
    //     clearInterval(this.test)
    // }

    // test = () => {
    //     console.log(`time is ${Date.now()}`)
    // }

    disable(){
        if(this.state.pixalCheck === []){
            document.getElementById('rainbow').disabled = true
        }

    }
    // checkPixal(id){
    //     let number = moment().dayOfYear()
    //     axios.get(`/api/pixals/${id}/${number}`).then(res=>{
    //         console.log(res.data)
    //         this.setState({pixalCheck:res.data})
    //     })
    //     // if(this.state.pixalCheck === []){
    //     //     document.getElementById('rainbow').disabled = true
    //     // }
    // }
    logout(){
        axios.post('/api/logout').then(()=>{
            this.props.userLogin(null);
            console.log('Bye Bye')
        })
        sessionStorage.clear();
        this.props.history.push('/');
    }
    postColor(){
        let date = moment().format('YYYY-MM-DD')
        this.props.user && axios.post('/api/pixals', {
            user_id:this.props.user.id,
            date: date,
            mood: this.props.color
            }).then((res)=>{
                console.log(res)
            }).catch(()=>{
                this.setState({duplicatedEntry: true})
                this.time();
            })
    }
    time(){
        setTimeout(()=>{this.setState({duplicatedEntry:false})},4000)
    }

    email(){
        this.props.user && axios.post('/api/email', {email: this.props.user.email}).then(()=>{
            alert('Email Sent')
        })
    }
    render() {
        const {user} = this.props;
        const redirect_uri = encodeURIComponent(window.location.origin+'/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirect_uri}&response_type=code`;
        return (
            this.props.pathname !== '/' ? 
            (<div className='Vertical'>
                {this.state.duplicatedEntry && <img className="popup" src='https://art.pixilart.com/e62f3fa6e0c1c5f.png' width="300" alt=''/>}
                {user? <Link to='/chart'><h1>YEARLY</h1></Link> 
                : <Link to='/'><h1>YEARLY</h1></Link>}
                <div className="links">
                    <ul>
                        <Link to= '/profile'><li>Profile</li></Link>
                        <Link to= '/chart'><li>Calendar</li></Link>
                        <li className="rainbowContainer"><button id="rainbow" onClick={()=>this.postColor()} disabled={!this.state.buttonOn}>Finalize Your Color</button></li>
                        <li><button onClick={()=>this.email()}>Click Me!</button></li>
                        <li><button className="logout" onClick={()=>this.logout()}>Logout</button></li>
                    </ul>
                </div>
            </div>) 
            : 
            (<div className='Horizontal'>
                <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet"></link>
                <Link to='/'><h1>YEARLY</h1></Link>
                <a href={url}>Login</a>
            </div>)

        );
    }
}
function mapStateToProps(state){
    return{
        user:state.user,
        color:state.color
    }
}
export default connect(mapStateToProps, {userLogin})(Header);