import React from 'react';
import { mount } from 'enzyme';
import { Tab, TabList } from '@momentum-ui/react-collaboration';

describe('tests for <TabList />', () => {
  it('should match SnapShot', () => {
    const context = { focus: 0, onFocus: () => {}, onActivate: () => {} };
    const container = mount(
      <TabList id="test">
        <Tab heading="one" />
      </TabList>,
      { context }
    );

    expect(container).toMatchSnapshot();
  });

  it('should render children', () => {
    const context = { focus: 0, onFocus: () => {}, onActivate: () => {} };
    const container = mount(
      <TabList>
        <Tab heading="one" />
      </TabList>,
      { context }
    );

    expect(container.find('.md-tab__item').length).toEqual(1);
  });
});
