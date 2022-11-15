import React from 'react';
import cn from 'classnames';
import {CircularProgress} from "@mui/material";

import s  from './styles.module.scss';

export const Loading = ({
  classes,
  margin = 'none',
  size = 40,
                          modal,
  height,
  className,
  ...otherProps
}) => {
  return (
    <div
      style={{ height }}
      className={cn(s.root, className, { [s.rootAbsolute]: modal })}
    >
      <CircularProgress size={size} classes={{ svg: s.svg }} {...otherProps} />
    </div>
  );
};
