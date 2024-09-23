import { useAppSelector } from './app/hooks';
import { Routes, Route, Navigate } from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import BottomNav from './components/BottomNav/BottomNav';
import SignIn from './containers/SignIn/SignIn';
import { lazy, Suspense, useEffect } from 'react';
import NewZhaloba from './containers/NewZhaloba/NewZhaloba';
import SignUp from './containers/SignUp/SignUp';
import { checkVersionAndClearCache } from './utility';
import './App.css';

const NewApplication = lazy(
  () => import('./containers/NewApplication/NewApplication')
);
const NewNeactivka = lazy(
  () => import('./containers/NewNeactivka/NewNeactivka')
);
const MyNeactivka = lazy(() => import('./containers/MyNeactivka/MyNeactivka'));
const MyApplications = lazy(
  () => import('./containers/MyApplications/MyApplications')
);
const MyZhaloba = lazy(() => import('./containers/MyZhaloba/MyZhaloba'));

const App = () => {
  const { user } = useAppSelector((state) => state.userState);

  useEffect(() => {
    checkVersionAndClearCache();
  }, []);

  const publicRoutes = (
    <>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
    </>
  );

  const privateRoutes = (
    <>
      <Route
        path="my-applications"
        element={
          <Suspense fallback={<></>}>
            <MyApplications />
          </Suspense>
        }
      />
      <Route
        path="neactivka-list"
        element={
          <Suspense fallback={<></>}>
            <MyNeactivka />
          </Suspense>
        }
      />
      <Route
        path="zhaloba-list"
        element={
          <Suspense fallback={<></>}>
            <MyZhaloba />
          </Suspense>
        }
      />
      <Route
        path="new-application"
        element={
          <Suspense fallback={<></>}>
            <NewApplication />
          </Suspense>
        }
      />
      <Route
        path="new-neactivka"
        element={
          <Suspense fallback={<></>}>
            <NewNeactivka />
          </Suspense>
        }
      />
      <Route
        path="new-zhaloba"
        element={
          <Suspense fallback={<></>}>
            <NewZhaloba />
          </Suspense>
        }
      />
    </>
  );

  return (
    <div className="App">
      <Toolbar />
      <Routes>
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/my-applications" replace />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        {user ? privateRoutes : publicRoutes}
      </Routes>
      {user && <BottomNav />}
    </div>
  );
};

export default App;
