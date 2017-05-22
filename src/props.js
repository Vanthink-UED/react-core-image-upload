// default props
export default {
  url: '',
  text: 'upload',
  inputOfFile: 'files',
  crop: false,
  cropBtn: {
    ok: 'Save',
    cancel: 'Cancel',
  },
  extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'],
  cropRatio: '1:1',
  resize: false,
  resizeBtn: {
    ok: 'Save',
    cancel: 'Cancel',
  },
  inputAccept: 'image/jpg,image/jpeg,image/png',
  data: {},
  header: {},
  isXhr: true,
  multiple: false,
  compress: 0,
  imageUploaded: function(res) {

  },
  imageUploading: function(res) {
    console.info('uploading');
  },
  imageChanged: function() {

  },
  errorHandle: function(err) {
    console.error(err);
  },
};
