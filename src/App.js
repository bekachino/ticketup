import { useAppSelector } from "./app/hooks";
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Toolbar from "./components/Toolbar/Toolbar";

const App = () => {
  const userToken = useAppSelector((state) => state.userState.user);
  
  const publicRoutes = (
    <>
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
    </div>
  );
}

export default App;
