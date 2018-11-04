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
            userId: null
        }
        this.checkPixal=this.checkPixal.bind(this);
    }
    componentDidMount(){
        axios.get('/api/me').then(response=>{
            this.props.userLogin(response.data);
            this.setState({userId: response.data.id})
            this.checkPixal()
        }) 
        if(this.state.pixalCheck === null){
            document.getElementById('rainbow').disabled = 'true' 
        }
    }
    checkPixal(){
        let user = this.state.userId
        let number = moment().dayOfYear()
        axios.get(`/api/pixals/${user}/${number}`).then(res=>{
            this.setState({pixalCheck:res.data})
        })
        
    }
    logout(){
        axios.post('/api/logout').then(()=>{
            this.props.userLogin(null);
            console.log('Bye Bye')
        })
        sessionStorage.clear();
        this.props.history.push('/');
    }
    postColor(){

        let year = moment().format('YYYY');
        let numberDate = moment().dayOfYear()
        this.props.user && axios.post('/api/pixals', {
            user_id:this.props.user.id,
            year: year,
            number_date: numberDate,
            mood: this.props.color
            }).then(()=>{
                console.log("You did it")
            })
        this.setState({buttonOn:false}) 
    }
    render() {
        const {user} = this.props;
        const redirect_uri = encodeURIComponent(window.location.origin+'/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirect_uri}&response_type=code`;
        return (
            this.props.pathname !== '/' ? 
            (<div className='Vertical'>
                {user? <Link to='/chart'><h1>YEARLY</h1></Link> 
                : <Link to='/'><h1>YEARLY</h1></Link>}
                <div className="links">
                    <ul>
                        <Link to= '/chart'><li>Chart</li></Link>
                        <Link to= '/profile'><li>Profile</li></Link>
                        <li className="rainbowContainer"><button id="rainbow" onClick={()=>this.postColor()} disabled={!this.state.buttonOn}>Finalize Your Color</button></li>
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