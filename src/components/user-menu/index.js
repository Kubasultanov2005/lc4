import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import SideLayout from "../side-layout";
import {Link, useNavigate} from "react-router-dom";

function UserMenu(props) {

  const navigate = useNavigate()
  const cn = bem('UserMenu')

  const logOut = () => {
    props.logOut()
  }

  return (
    <div className={cn('')}>
      <SideLayout side='end'>
        <div className={cn('content')}>
          {
            props.isAuth ?
              <>
                <Link to={props.links.profile}>{props.name}</Link>
                <button onClick={logOut}>Выйти</button>
              </> :
              <button onClick={() => navigate(props.links.login)}>Вход</button>
          }
        </div>
      </SideLayout>
    </div>
  )
}

UserMenu.PropTypes = {}

UserMenu.defaultProps = {
  links: PropTypes.shape({
    login: '/login',
    profile: '/profile'
  })
}

export default React.memo(UserMenu);