import { FormEvent, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import HeaderComponent from '../common-components/header-component/header-component';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions/api-actions';
import { getLogin } from '../../store/user-process/user-process';

import { AppRoute } from '../../const';
import { AuthData } from '../../types/auth-data';

function LoginScreenComponent(): JSX.Element {
  const currentCity = useAppSelector(({ OFFERS }) => OFFERS.city);

  const [authData, setAuthData] = useState({ email: '', password: '' });
  const dispatch = useAppDispatch();

  const onSubmit = (authUserData: AuthData) => {
    dispatch(loginAction(authUserData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      login: authData.email,
      password: authData.password,
    });
    dispatch(getLogin(authData.email));
  };

  const handleAuthDataChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setAuthData({ ...authData, [name]: value });
  };

  return (
    <div className="page page--gray page--login">
      <HeaderComponent isLoginPage />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  onChange={handleAuthDataChange}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  onChange={handleAuthDataChange}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{currentCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreenComponent;
