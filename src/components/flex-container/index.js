import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function FlexContainer({children}) {

  const cn = bem('FlexContainer')

  return (
    <div className={`${cn()}`}>
      {children}
    </div>
  )
}

FlexContainer.PropTypes = {}

export default React.memo(FlexContainer);