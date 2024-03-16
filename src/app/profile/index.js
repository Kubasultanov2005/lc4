import React from "react";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import PageLayout from "../../components/page-layout";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import AuthHeader from "../../containers/auth-header";
import ProfileInfo from "../../components/profile-info";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {Navigate} from "react-router-dom";
import Spinner from "../../components/spinner";

function Profile() {

  const store = useStore()

  const select = useSelector(state => ({
    profile: state.auth.profile,
    isAuth: state.auth.isAuth,
    waiting: state.auth.waiting,
  }))

  if (!select.isAuth) {
    return <Navigate to={'/login'}/>
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthHeader/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileInfo profile={select.profile}/>
      </Spinner>
    </PageLayout>
  )
}


export default React.memo(Profile);