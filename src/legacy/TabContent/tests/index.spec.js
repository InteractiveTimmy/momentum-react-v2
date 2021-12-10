import React from 'react';
import { shallow, mount } from 'enzyme';
import { TabContent } from '@momentum-ui/react-collaboration';

describe('tests for <TabContent />', () => {
  it('should match SnapShot', () => {
    const container = mount(<TabContent id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one TabContent', () => {
    const container = shallow(<TabContent />);

    expect(container.find('.md-tab__content').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <TabContent>
        <div className="testingforTC" />
      </TabContent>
    );

    expect(container.find('.testingforTC').length).toEqual(1);
  });
});
