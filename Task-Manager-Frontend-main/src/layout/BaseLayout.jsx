import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components';
import { DarkModeProvider } from '../contexts/DarkModeContext';
import '../App.scss';

const BaseLayout = () => {
  return (
    <DarkModeProvider>
      <main className="page-wrapper">
        {/* left of page */}
        <Sidebar />

        {/* right side/content of the page */}
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </DarkModeProvider>
  );
};

export default BaseLayout;
