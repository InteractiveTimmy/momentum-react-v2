import React, { FC, useCallback, useState } from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Popover from './';
import { COLORS, STYLE } from '../ModalContainer/ModalContainer.constants';
import { PopoverInstance } from './Popover.types';

describe('<Popover />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} className={className}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} id={id}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} style={style}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} color={COLORS.TERTIARY}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided attributes when attributes are provided', async () => {
      expect.assertions(5);
      const className = 'example-class';
      const style = { color: 'pink' };
      const styleString = 'color: pink;';
      const id = 'example-id';

      render(
        <Popover
          triggerComponent={<button>Click Me!</button>}
          className={className}
          style={style}
          color={COLORS.TERTIARY}
          id={id}
        >
          <p>Content</p>
        </Popover>
      );
      userEvent.click(screen.getByRole('button', { name: /click me!/i }));
      const content = await screen.findByText('Content');

      expect(content.parentElement.classList.contains(STYLE.wrapper)).toBe(true);
      expect(content.parentElement.classList.contains(className)).toBe(true);
      expect(content.parentElement.getAttribute('style')).toBe(styleString);
      expect(content.parentElement.getAttribute('data-color')).toBe(COLORS.TERTIARY);
      expect(content.parentElement.id).toBe(id);
    });

    it('should not automatically disappear on focus-change when trigger is manual', async () => {
      expect.assertions(3);

      // Local globals.
      const trigger = 'manual';
      const identifiers = {
        other: 'other-element',
        popover: 'popover-element',
        trigger: 'trigger-element',
      };

      // Set up a test component for local state management via hooks.
      const TestComponent: FC = () => {
        const [instance, setInstance] = useState<PopoverInstance>(undefined);

        const toggle = useCallback(() => {
          if (!instance.state.isVisible) {
            instance.show();
          } else {
            instance.hide();
          }
        }, [instance]);

        return (
          <>
            <div data-testid={identifiers.other}>Other Element</div>
            <button data-testid={identifiers.trigger} onClick={toggle}>
              Trigger Element
            </button>
            <Popover setInstance={setInstance} triggerComponent={<div />} trigger={trigger}>
              <div data-testid={identifiers.popover}>Popover Element</div>
            </Popover>
          </>
        );
      };

      // Test the expected component flow.
      render(<TestComponent />);

      let popover: HTMLElement;

      popover = screen.queryByTestId(identifiers.popover);
      expect(popover).not.toBeInTheDocument();

      userEvent.click(screen.getByTestId(identifiers.trigger));

      popover = await screen.findByTestId(identifiers.popover);
      expect(popover).toBeVisible();

      userEvent.click(screen.getByTestId(identifiers.other));

      popover = await screen.findByTestId(identifiers.popover);
      expect(popover).toBeVisible();
    });
  });

  describe('actions', () => {
    it('should show/hide Popover on click', async () => {
      expect.assertions(2);
      render(
        <Popover triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown
      userEvent.click(screen.getByRole('button', { name: /click me!/i }));
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();

      // after another click, popover should be hidden again
      userEvent.click(screen.getByRole('button', { name: /click me!/i }));
      await waitForElementToBeRemoved(() => screen.queryByText('Content'));
    });

    it('should show Popover on mouseenter', async () => {
      expect.assertions(2);

      render(
        <Popover triggerComponent={<button>Hover Me!</button>} trigger="mouseenter">
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after hover, popover should be shown
      userEvent.hover(screen.getByRole('button', { name: /hover me!/i }));
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();

      // after unhover, popover should be hidden again
      userEvent.unhover(screen.getByRole('button', { name: /hover me!/i }));
      await waitForElementToBeRemoved(() => screen.queryByText('Content'));
    });

    it('should show Popover on focusin', async () => {
      expect.assertions(2);

      render(
        <Popover triggerComponent={<button>Focus Me!</button>} trigger="focusin">
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after tabbing to it, popover should be shown
      userEvent.tab();
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();

      // after tabbing away, popover should be hidden again
      userEvent.tab();
      await waitForElementToBeRemoved(() => screen.queryByText('Content'));
    });

    it('should show/hide Popover when triggered through instance', async () => {
      expect.assertions(2);

      const ParentComponent = () => {
        const [instance, setInstance] = React.useState<PopoverInstance>();

        const handleShow = React.useCallback(() => {
          instance.show();
        }, [instance]);

        const handleHide = React.useCallback(() => {
          instance.hide();
        }, [instance]);

        return (
          <>
            <Popover
              triggerComponent={<button>Focus Me!</button>}
              trigger="focusin"
              setInstance={setInstance}
            >
              <p>Content</p>
            </Popover>
            <button id="show" onClick={handleShow}>
              Show
            </button>
            <button id="hide" onClick={handleHide}>
              Hide
            </button>
          </>
        );
      };

      render(<ParentComponent />);

      // show popover from the parent component
      userEvent.click(screen.getByRole('button', { name: /show/i }));
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();

      // hide popover from the parent component
      userEvent.click(screen.getByRole('button', { name: /hide/i }));
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });
  });
});
