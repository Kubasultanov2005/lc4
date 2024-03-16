import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function FormInput(props) {

  const cn = bem('FormInput')

  const onChange = (e) => {
    props.onChange(e.target.value)
  }


  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <label>{props.label}</label>
        <div>
          <input type={props.type} name={props.name} value={props.value} onChange={onChange}/>
        </div>
      </div>
    </div>
  )
}

FormInput.PropTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

FormInput.defaultProps = {
  onChange: () => {}
}

export default React.memo(FormInput);