/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement, useContext } from 'react';

import { STYLE } from './MenuItem.constants';
import { Props } from './MenuItem.types';
import './MenuItem.style.scss';
import ListItemBase from '../ListItemBase';
import { useMenuItem } from '@react-aria/menu';
import ListItemBaseSection from '../ListItemBaseSection';
import Icon from '../Icon';
import { MenuContext } from '../Menu';
import { MenuAppearanceContext } from '../Menu/Menu';

const MenuItem = <T extends object>(props: Props<T>): ReactElement => {
  const { item, state, onAction } = props;

  const ref = React.useRef();
  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.selectedKeys.has(item.key);

  const { onClose, closeOnSelect } = useContext(MenuContext);
  const { itemShape, itemSize, isTickOnLeftSide } = useContext(MenuAppearanceContext);

  const { menuItemProps } = useMenuItem(
    {
      isSelected,
      key: item.key,
      isDisabled,
      onClose,
      closeOnSelect,
      onAction,
      'aria-label': item['aria-label'],
    },
    state,
    ref
  );

  // I think there is a bug in aria, where useMenuItem has default behavior to hover items on hover
  // so deleting these event listeners
  delete menuItemProps.onMouseEnter;
  delete menuItemProps.onMouseLeave;
  delete menuItemProps.onPointerEnter;
  delete menuItemProps.onPointerLeave;

  const tickIcon = (
    <Icon className={STYLE.tickIcon} name="check" weight="bold" scale={16} strokeColor="none" />
  );

  const renderSections = () => {
    if (isTickOnLeftSide) {
      return (
        <>
          {isSelected && <ListItemBaseSection position="start">{tickIcon}</ListItemBaseSection>}
          <ListItemBaseSection position="fill">{item.rendered}</ListItemBaseSection>
        </>
      );
    } else {
      return (
        <>
          <ListItemBaseSection position="fill">{item.rendered}</ListItemBaseSection>
          {isSelected && <ListItemBaseSection position="end">{tickIcon}</ListItemBaseSection>}
        </>
      );
    }
  };

  return (
    <ListItemBase
      size={itemSize}
      shape={itemShape}
      className={STYLE.wrapper}
      ref={ref}
      isDisabled={isDisabled}
      isPadded={true}
      {...menuItemProps}
    >
      {renderSections()}
    </ListItemBase>
  );
};

/**
 * Should not be exported as part of the library. Used in implementation of Menu component.
 * @internal
 */

export default MenuItem;
