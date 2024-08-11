import { useAppSelector } from "./app/hooks";
import { Routes, Route, Navigate } from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar";
import BottomNav from "./components/BottomNav/BottomNav";
import SignIn from "./containers/SignIn/SignIn";
import './App.css';
import MyApplications from "./containers/MyApplications/MyApplications";
import Neactivka from "./containers/Neactivka/Neactivka";
import Zhaloba from "./containers/Zhaloba/Zhaloba";
import NewApplication from "./containers/NewApplication/NewApplication";

const App = () => {
  const { user } = useAppSelector((state) => state.userState);
  
  const publicRoutes = (
    <>
      <Route
        path='sign-in'
        element={<SignIn/>}
      />
    </>
  );
  
  const privateRoutes = (
    <>
      <Route
        path='my-applications'
        element={<MyApplications/>}
      />
      <Route
        path='neactivka-list'
        element={<Neactivka/>}
      />
      <Route
        path='zhaloba-list'
        element={<Zhaloba/>}
      />
      <Route
        path='new-application'
        element={<NewApplication/>}
      />
    </>
  );
  
  return (
    <div className='App'>
      <Toolbar/>
      <Routes>
        <Route
          path='*'
          element={user ? <Navigate
            to='/my-applications'
            replace
          /> : <Navigate
            to='/sign-in'
            replace
          />}
        />
        {user ? privateRoutes : publicRoutes}
      </Routes>
      {user && <BottomNav/>}
    </div>
  );
}

export default App;
