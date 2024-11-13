import React from "react";
import './styles.scss'
import { Logo } from '../../components/logo/Logo'

interface AuthPageViewProps {
  username: string;
  setUsername: (value: string) => void;
  handleLogin: () => void;
  error: string | null;
}

export const AuthPageView: React.FC<AuthPageViewProps> = ({
  username,
  setUsername,
  handleLogin,
  error,
}) => {
  return (
    <div className="auth-page">
      <Logo />
      <div className="auth-page__card">
        <h2>Менеджер процесса</h2>
        <p>Пожалуйста, авторизируйтесь (user) </p>
        <input
          className="editable-input editable-input--auth"
          type="text"
          placeholder="User"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className={`auth-page__error ${error ? "visible" : ""}`}>{error || '\u00A0'}</p>
        <button onClick={handleLogin} className="button button--auth">Войти</button>
      </div>
    </div>
  );
};
