import React, { Component } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import $myAxios from '../../api/myAxios'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class UploadFile extends Component {
  constructor(props) {
    super(props)
    const { imgs } = props
    let imgsList = []
    if (imgs && imgs.length > 0) {
      imgsList = imgs.map((name, index) =>
        ({
          uid: -index,
          name: name,
          status: 'done',
          url: `http://localhost:5000/upload/${name}`
        })
      )
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: imgsList,
    }
  }

  getImgs = () => {
    return this.state.fileList.map(f => f.name)
  }
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async ({ file, fileList }) => {
    console.log(file, fileList)
    if (file.status === 'done') {
      let result = file.response
      if (result.status === 0) {
        fileList[fileList.length - 1].name = result.data.name
        fileList[fileList.length - 1].url = result.data.url
      }
    } else if (file.status === 'removed') {
      let res = await $myAxios('deleteImgApi', { name: file.name })
      if (res.status === 0) {
        message.success("删除成功")
      } else {
        message.error("删除失败")
      }
    }
    this.setState({ fileList })
  };
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload" // "https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          accept="image/*"
          name="image"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadFile