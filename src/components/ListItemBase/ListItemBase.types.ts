import { CSSProperties, ReactNode } from 'react';
import { PressEvents } from '@react-types/shared';

export type ListItemBaseSize = 32 | 40 | 50 | 70;

export interface Props extends PressEvents {
  /**
   * className prop description
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Determines if this item is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Determines if this item is selected
   * @default false
   */
  isSelected?: boolean;

  /**
   * Determines if this item is padded
   * @default false
   */
  isPadded?: boolean;

  /**
   * Size of the list item
   * @default 40
   */
  size?: ListItemBaseSize;

  /**
   * The shape of the list item container
   * @default "rectangle"
   */
  shape?: 'rectangle' | 'isPilled';

  /**
   * Aria role
   * @default "listitem"
   */
  role?: string;

  /**
   * Determines wether the focus for this item should be inset or outset
   * @default false
   */
  shouldItemFocusBeInset?: boolean;
}
