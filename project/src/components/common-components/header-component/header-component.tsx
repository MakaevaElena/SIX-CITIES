import LogoComponent from '../logo-component/logo-component';
import LoginComponent from '../login-component/login-component';

type HeaderProps = {
  isLoginPage?: boolean;
}

function HeaderComponent({ isLoginPage }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <LogoComponent />
          {!isLoginPage ? <LoginComponent /> : ''}
        </div>
      </div>
    </header>

  );
}

export default HeaderComponent;
