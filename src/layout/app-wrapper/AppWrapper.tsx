import React, { ReactNode } from 'react';
import './styles.scss';
import { Header} from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';


interface AppWrapperProps {
  children: ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  );
};
