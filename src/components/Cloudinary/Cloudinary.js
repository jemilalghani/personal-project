import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './Cloudinary.css';
import {connect} from 'react-redux';
import {uploadImg} from '../../ducks/reducer';

const CLOUDINARY_UPLOAD_PRESET = 'gz0ctmrp';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dptjp5wvq/image/upload';

class Cloudinary extends Component {
    constructor(){
        super();
        this.state={
            uploadedFile: null,
            uploadedFileCloudinaryUrl:''
        }
    }
    onImageDrop(files){
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }
    handleImageUpload(file){
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', file);
        upload.end((err,response)=>{
            if(err){
                console.error(err)
            } 
            if(response.body.secure_url !== ''){
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                })
                this.props.uploadImg(response.body.secure_url);
            }
        })
    }
    render() {
        return (
            <form>
                <div className="Cloudinary">
                    <Dropzone
                    multiple ={false}
                    accept="image/*"
                    onDrop={this.onImageDrop.bind(this)}
                    className="Cloud"
                    placeholder= "drop image here">
                    {!this.state.uploadedFileCloudinaryUrl && <p>drop image here</p>}
                    <div>
                        {this.state.uploadedFileCloudinaryUrl === ''? null: 
                            <div>
                                {/* <img src={this.state.uploadedFileCloudinaryUrl} /> */}
                                <p>{this.state.uploadedFile.name}</p>
                            </div>
                        }
                    </div>
                    </Dropzone>
                </div>
            </form>
        );
    }
}
function mapStateToProps(state){
    return {
        image:state.image
    }
}
export default connect(mapStateToProps, {uploadImg})(Cloudinary);