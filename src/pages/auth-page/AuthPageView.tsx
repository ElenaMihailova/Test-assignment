import React from "react";
import './styles.scss'
import { Logo } from '../../components/logo/Logo'

interface AuthPageViewProps {
  username: string;
  setUsername: (value: string) => void;
  handleLogin: () => void;
}

export const AuthPageView: React.FC<AuthPageViewProps> = ({
  username,
  setUsername,
  handleLogin,
}) => {
  return (
    <div className="auth-page">
      <Logo />
      <div className="auth-page__card">
        <h2>Менеджер процесса</h2>
        <p>Пожалуйста, авторизируйтесь (user) </p>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin} className="button button--auth">Войти</button>
      </div>
    </div>
  );
};
