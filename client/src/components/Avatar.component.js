import React, { Component } from 'react';
import { Upload, Icon } from 'antd';

require('antd/lib/upload/style/css');
require('antd/lib/icon/style/css');

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class Avatar extends Component {
    state = {
        loading: false,
        imageUrl: this.props.imageUrl || null
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                this.setState({
                    imageUrl,
                    loading: false,
                });
                this.props.setFile(imageUrl);
            });
        }
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Avatar</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <Upload
                name="logo"
                listType="picture-card"
                className="avatar-uploader"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                showUploadList={false}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
    }
}

export default Avatar;