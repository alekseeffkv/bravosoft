import { userType } from '../types';
import { FC, useCallback, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AuthContext } from './AuthContext';
import RequireAuth from '../hoc/RequireAuth';
import { checkUser } from '../utils/api';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

const App: FC = () => {
  const [user, setUser] = useState<userType | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const signin = useCallback((newUser: userType, cb: () => void) => {
    checkUser(newUser).then((res) => {
      if (res.length !== 0) {
        setUser(res[0]);
        cb();
      } else {
        setOpenAlert(true);
      }
    });
  }, []);

  const handleCloseAlert = () => setOpenAlert(false);

  const value = useMemo(() => ({ user, signin }), [signin, user]);

  return (
    <>
      <CssBaseline />
      <AuthContext.Provider value={value}>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                openAlert={openAlert}
                handleCloseAlert={handleCloseAlert}
              />
            }
          />
        </Routes>
      </AuthContext.Provider>
    </>
  );
};

export default App;
