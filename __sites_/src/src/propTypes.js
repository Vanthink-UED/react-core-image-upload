import PropTypes from 'prop-types';

export default {
  url: PropTypes.string,
  text: PropTypes.string,
  inputAccept: PropTypes.string,
  inputOfFile: PropTypes.string,
  cropBtn: PropTypes.object,
  cropRatio: PropTypes.string,
  resizeBtn: PropTypes.object,
  maxFileSize: PropTypes.number,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  data: PropTypes.object,
  header: PropTypes.object,
  multipleSize: PropTypes.number,
  compress: PropTypes.number,
};
