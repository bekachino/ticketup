import { useAppSelector } from "./app/hooks";
import { Routes, Route, Navigate } from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar";
import BottomNav from "./components/BottomNav/BottomNav";
import SignIn from "./containers/SignIn/SignIn";
import './App.css';

const App = () => {
  const userToken = useAppSelector((state) => state.userState.user);
  
  const publicRoutes = (
    <>
      <Route path='sign-in' element={<SignIn/>}></Route>
    </>
  );
  
  const privateRoutes = (
    <>
    </>
  );
  
  return (
    <div className='App'>
      <Toolbar/>
      <Routes>
        <Route path='*'
          element={userToken ? <Navigate to='/my-applications'
            replace/> : <Navigate to='/sign-in'
            replace/>}/>
        {userToken ? privateRoutes : publicRoutes}
      </Routes>
      {userToken && <BottomNav/>}
    </div>
  );
}

export default App;
