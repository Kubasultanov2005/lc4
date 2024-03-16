import React, {useCallback, useEffect, useState} from "react";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import PageLayout from "../../components/page-layout";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import AuthHeader from "../../containers/auth-header";
import useStore from "../../hooks/use-store";
import FormLayout from "../../components/form-layout";
import FormInput from "../../components/form-input";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/spinner";

function Login() {

  const navigate = useNavigate()
  const store = useStore();

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const {t} = useTranslate();

  const select = useSelector(state => ({
    error: state.auth.error,
    isAuth: state.auth.isAuth,
    waiting: state.auth.waiting,
  }));

  const callbacks = {
    logIn: useCallback(() => store.actions.auth.logIn(login, password), [login, password]),
    logOut: useCallback(() => store.actions.auth.logOut(), [store]),
    getProfile: useCallback(() => store.actions.auth.getProfile(), [store])
  }

  // console.log(login)
  // console.log(password)

  const options = {
    values: [
      {
        label: 'Логин',
        name: 'login',
        onChange: setLogin,
        type: 'text',
        value: login
      },
      {
        label: 'Пароль',
        name: 'password',
        onChange: setPassword,
        type: 'password',
        value: password
      }
    ]
  }

  const renders = {
    values: options.values.map((item) => (
      <FormInput label={item.label} key={item.name} value={item.value} name={item.name}
                 type={item.type} onChange={item.onChange}/>
    ))
  }

  useEffect(() => {
    if (select.isAuth) {
      navigate('/profile')
    }
  }, [select.isAuth]);

  return (
    <PageLayout>
      <AuthHeader/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner>
        <FormLayout title='Вход' labelBtn='Войти' onSubmit={callbacks.logIn} error={select.error}>
          {renders.values}
        </FormLayout>
      </Spinner>
    </PageLayout>
  )
}


export default React.memo(Login);