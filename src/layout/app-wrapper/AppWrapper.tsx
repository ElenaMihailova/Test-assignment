import React, { ReactNode } from 'react';
import './styles.scss';
import { Aside } from '../../components/aside/Aside';
import { Footer } from '../../components/footer/Footer';


interface AppWrapperProps {
  children: ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <div className="app-wrapper">
      <Aside />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  );
};
