import React, { forwardRef, useRef, FC, RefObject } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './ReactionBadge.constants';
import { Props } from './ReactionBadge.types';
import './ReactionBadge.style.scss';
import ButtonPill from '../ButtonPill';
import Reaction from '../Reaction';

const ReactionBadge: FC<Props> = forwardRef(
  (props: Props, providedRef: RefObject<HTMLButtonElement>) => {
    // for now children is the native emoji until i make the emoji/reaction component we discussed during
    // meeting today about mapping string -> SVG
    const { children, className, count, id, reacted, style, ...otherProps } = props;
    const internalRef = useRef();
    const ref = providedRef || internalRef;

    return (
      <ButtonPill
        className={classnames(className, STYLE.wrapper)}
        data-count={count || DEFAULTS.COUNT}
        data-reacted={reacted || DEFAULTS.REACTED}
        forwardedRef={ref}
        id={id}
        size={20}
        style={style}
        {...otherProps}
      >
        <Reaction name={name} />
        <span className="reaction-badge-count">{count}</span>
      </ButtonPill>
    );
  }
);

ReactionBadge.displayName = 'ReactionBadge';

export default ReactionBadge;
