import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toggle, { TOGGLE_CONSTANTS as CONSTANTS } from './';

describe('<Toggle />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Toggle aria-label={'toggle'} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with label', () => {
      expect.assertions(1);

      const container = mount(<Toggle aria-label={'toggle'} label={'Hello toggle'} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<Toggle className={className} aria-label={'toggle'} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<Toggle id={id} aria-label={'toggle'} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<Toggle style={style} aria-label={'toggle'} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with disabled', () => {
      expect.assertions(1);

      const container = mount(<Toggle isDisabled={true} aria-label={'toggle'} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with selected', () => {
      expect.assertions(1);

      const container = mount(<Toggle defaultSelected={true} aria-label={'toggle'} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class and data atts reflect the default values', () => {
      expect.assertions(3);

      const wrapper = mount(<Toggle aria-label={'toggle'} />)
        .find(Toggle)
        .getDOMNode();

      expect(wrapper.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
      expect(wrapper.getAttribute('data-disabled')).toBe('false');
      expect(wrapper.getAttribute('data-selected')).toBe('false');
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<Toggle className={className} aria-label={'toggle'} />)
        .find(Toggle)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<Toggle id={id} aria-label={'toggle'} />)
        .find(Toggle)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<Toggle style={style} aria-label={'toggle'} />)
        .find(Toggle)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided disabled when disabled is provided', () => {
      expect.assertions(2);

      const component = mount(<Toggle isDisabled={true} aria-label={'toggle'} />);
      const wrapper = component.find(Toggle).getDOMNode();
      const input = component.find('input').getDOMNode();

      expect(wrapper.getAttribute('data-disabled')).toBe('true');
      expect(input).toBeDisabled();
    });

    it('should have provided selected when selected is provided', () => {
      expect.assertions(2);

      const component = mount(<Toggle defaultSelected={true} aria-label={'toggle'} />);
      const wrapper = component.find(Toggle).getDOMNode();
      const input = component.find('input').getDOMNode();

      expect(wrapper.getAttribute('data-selected')).toBe('true');
      expect(input).toBeChecked();
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(4);

      const mockCallback = jest.fn();

      const { getByRole } = render(
        <Toggle defaultSelected={false} onChange={mockCallback} aria-label={'toggle'} />
      );
      const input = getByRole('switch');

      userEvent.click(input);
      expect(mockCallback).toBeCalledTimes(1);
      expect(mockCallback).toBeCalledWith(true);

      userEvent.click(input);
      expect(mockCallback).toBeCalledTimes(2);
      expect(mockCallback).toBeCalledWith(false);
    });

    it('should handle press space key', async () => {
      expect.assertions(2);

      const mockCallback = jest.fn();

      const { getByRole } = render(
        <Toggle onChange={mockCallback} aria-label={'toggle'} label={'Toggle'} />
      );
      const input = getByRole('switch');

      userEvent.type(input, '{Space}');

      expect(mockCallback).toBeCalledWith(true);
      expect(input).toBeChecked();
    });
  });
});