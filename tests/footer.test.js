import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Footer from '../src/components/footer';

describe('Footer Component Tests', function () {
  it('contains copyright words',function() {
    expect(shallow(<Footer />).contains(<p className="other-info">All Rights Reserved By Vanthink-UED</p>)).toEqual(true);
  })
  it('contains four link',function() {
    expect(shallow(<Footer />).find('a').length).toBe(4);
  })
});