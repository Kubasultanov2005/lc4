import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Input from "../input";

function FormLayout({title, children, labelBtn, onSubmit, error}) {

  const cn = bem('FormLayout')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {children}
      <div className={cn('error')}>
        {error}
      </div>
      <div>
        <button type='submit'>{labelBtn}</button>
      </div>
    </form>
  )
}

FormLayout.PropTypes = {

}

FormLayout.defaultProps = {
  onSubmit: () => {}
}
export default React.memo(FormLayout);