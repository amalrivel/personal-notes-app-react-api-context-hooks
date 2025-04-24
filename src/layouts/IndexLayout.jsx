import { Outlet } from 'react-router';
import Header from '../components/header';

function IndexLayout() {
  return (
    <div className="bg-background flex min-h-screen flex-col transition-colors duration-200">
      <Header />
      <main className="container mx-auto flex max-w-5xl flex-1 flex-col px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default IndexLayout;
