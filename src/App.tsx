import './App.css';
import { Page } from './Page/Page.tsx';
import { AppStateProvider } from './state/AppStateContext.tsx';
import { createPage } from './utils/createPage.ts';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './auth/Auth.tsx';
import { Private } from './auth/Private.tsx';

const initialState = createPage();

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />}></Route>
      <Route
        path="/:id"
        element={
          <Private
            component={
              <AppStateProvider>
                <Page />
              </AppStateProvider>
            }
          />
        }></Route>
      <Route
        path="/"
        element={
          <Private
            component={
              <AppStateProvider>
                <Page />
              </AppStateProvider>
            }
          />
        }></Route>
    </Routes>
  );
}

export default App;
