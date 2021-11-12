import React from 'react';
import { mount } from 'enzyme';
import { FocusScope } from '@react-aria/focus';

import ModalContainer from '../ModalContainer';

import Overlay, { OVERLAY_CONSTANTS as CONSTANTS } from './';

describe('<Overlay />', () => {
  const commonChildren = 'Children';

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Overlay>{commonChildren}</Overlay>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should extend <ModalContainer />', () => {
      expect.assertions(1);

      const component = mount(<Overlay>{commonChildren}</Overlay>).find(Overlay);
      const target = component.find(ModalContainer);

      expect(component.props().children).toBe(target.props().children);
    });

    it('should contain a focus scope', () => {
      expect.assertions(1);

      const component = mount(<Overlay>{commonChildren}</Overlay>).find(Overlay);

      const target = component.find(FocusScope);

      expect(target.exists()).toBe(true);
    });

    it('should pass focus scope props', () => {
      expect.assertions(1);

      const component = mount(<Overlay>{commonChildren}</Overlay>).find(Overlay);

      const target = component.find(FocusScope);

      expect(target.props()).toMatchObject(CONSTANTS.DEFAULTS);
    });
  });
});
