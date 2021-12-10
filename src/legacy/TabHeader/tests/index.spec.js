import React from 'react';
import { shallow, mount } from 'enzyme';
import { TabHeader } from '@momentum-ui/react-collaboration';

describe('tests for <TabHeader />', () => {
  it('should match SnapShot', () => {
    const container = mount(<TabHeader heading="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one TabHeader', () => {
    const container = shallow(<TabHeader heading="test" />);

    expect(container.find('md-tab-heading').length).toEqual(1);
  });

  it('should render subheading', () => {
    const container = shallow(<TabHeader heading="test" subHeading="subtest" />);

    expect(container.find('div').text()).toEqual('subtest');
  });
});
