import './App.css';
import { Page } from './Page/Page.tsx';
import { AppStateProvider } from './state/AppStateContext.tsx';
import { createPage } from './utils/createPage.ts';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './auth/Auth.tsx';

const initialState = createPage();

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />}></Route>
      <Route
        path="/:id"
        element={
          <AppStateProvider initialState={initialState}>
            <Page />
          </AppStateProvider>
        }></Route>
      <Route
        path="/"
        element={
          <AppStateProvider initialState={initialState}>
            <Page />
          </AppStateProvider>
        }></Route>
    </Routes>
  );
}

export default App;
