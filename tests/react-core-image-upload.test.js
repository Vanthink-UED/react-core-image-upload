import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ReactCoreImageUpload from '../src/react-core-image-upload';

describe('ReactCoreImageUpload Component Tests', function () {
  
  it('has a form',function() {
    expect(shallow(<ReactCoreImageUpload />).find('form').length).toBe(1);
  });
  
  it('has a file input',function() {
    expect(shallow(<ReactCoreImageUpload />).find('input[type="file"]').length).toBe(1);
  });
  
  it('allows us to set props', () => {
    let  isSuccess = false;
    const successCallback = function() {
      isSuccess = true;
    }; 
    const wrapper = mount(<ReactCoreImageUpload text="Upload Your Image" class={['pure-button', 'pure-button-primary', 'js-btn-crop']}  inputOfFile="files" url="./api/upload.php" imageUploaded={successCallback}>
        </ReactCoreImageUpload>);
    expect(wrapper.props().text).toEqual("Upload Your Image");
    wrapper.setProps({ class: ['btn']});
    expect(wrapper.props().class).toEqual(['btn']);
  });
});