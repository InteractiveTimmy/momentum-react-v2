import React from 'react';
import { shallow, mount } from 'enzyme';
import { SidebarBody } from '@momentum-ui/react-collaboration';

describe('<SidebarBody />', () => {
  it('should render a SidebarBody', () => {
    const wrapper = mount(<SidebarBody />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallow(<SidebarBody className="testClassName" />);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallow(
      <SidebarBody>
        <div className="dummy-children">Dummy Children</div>
      </SidebarBody>
    );

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });
});
