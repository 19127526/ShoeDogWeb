import {useRef, useState} from "react";
import JoditEditor from 'jodit-react'
import {PlusOutlined} from '@ant-design/icons';
import {message, Modal, Upload} from 'antd';
import {getBase64} from "../../utils/Utils";

const {Dragger} = Upload;


const uploadButton = (
  <div>
    <PlusOutlined/>
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </div>
);

const AddProductPage = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({fileList: newFileList}) => {
    setFileList(newFileList)
  };

  const editor = useRef(null);
  const [valueEditor, setValueEditor] = useState(null);

  return (<>
    <article className="content item-editor-page" id="ajax">
      <div className="title-block">
        <h3 className="title"> Thêm sản phẩm
          <span className="sparkline bar" data-type="bar"></span>
        </h3>
      </div>
      <form method="post">
        <div className="card card-block">
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right"> Tiêu đề: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control boxed" name="title" id="title" placeholder=""/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right"> Content: </label>
            <div className="col-sm-10">
              <JoditEditor ref={editor} onChange={content => setValueEditor(content)}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right"> Quận: </label>
            <div className="col-sm-10">
              <select className="c-select form-control boxed" name="ward" id="ward">
                <option selected>dsds</option>
                <option>dsd3s</option>
                <option>dsd22s</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right"> Images: </label>
            <div className="col-sm-10">
              <div className="image-container">
                <Upload

                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  multiple={true}
                  beforeUpload={(file) => {
                    const isPNG = file.type === 'image/png' || file.type === 'image/jpeg'||file.type==='image/svg+xml';
                    if (!isPNG) {
                      message.error(`${file.name} is not a png, svg and jpeg file`);
                    }
                    return false;
                  }}
                >
                  { uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                  <img
                    alt="example"
                    style={{
                      width: '100%',
                    }}
                    src={previewImage}
                  />
                </Modal>
              </div>
              <div className="title-block">
                <h3 className="title">
                  Lưu ý: Điền đầy đủ thông tin
                </h3>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10 col-sm-offset-2 "
                 style={{display: "flex", justifyContent: "center", width: "100%", marginLeft: "50px"}}>
              <button type="submit" id="post" className="btn btn-primary"> Thêm sản phẩm</button>
            </div>
          </div>
        </div>
      </form>
    </article>

    <div className="modal fade" id="modal-media">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Media Library</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="modal-body modal-tab-container">
            <ul className="nav nav-tabs modal-tabs" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" href="#gallery" data-toggle="tab" role="tab">Gallery</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#upload" data-toggle="tab" role="tab">Upload</a>
              </li>
            </ul>
            <form method="post" encType="multipart/form-data">
              <div className="tab-content modal-tab-content">
                <div className="tab-pane fade active in" id="upload" role="tabpanel">

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default AddProductPage