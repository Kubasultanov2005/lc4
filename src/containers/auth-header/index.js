import React, {useCallback} from "react";
import UserMenu from "../../components/user-menu";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function AuthHeader () {

  const store = useStore()

  const select = useSelector(state => ({
    profile: state.auth.profile,
    isAuth: state.auth.isAuth
  }))

  const callbacks = {
    // Сортировка
    onLogout: useCallback(logOut => store.actions.auth.logOut(), [store]),

  }

  const links = {
    profile: '/profile',
    login: '/login'
  }

  console.log(select.profile)
  return (
    <UserMenu logOut={callbacks.onLogout} links={links} name={select?.profile?.name} isAuth={select.isAuth}/>
  )
}


export default React.memo(AuthHeader);