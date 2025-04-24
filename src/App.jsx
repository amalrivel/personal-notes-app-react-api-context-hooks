import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { LocaleProvider } from './contexts/LocaleContext';
import ProtectedRoute from './components/ProtectedRoute';
import Index from './pages/Index';
import IndexLayout from './layouts/IndexLayout';
import New from './pages/New';
import NotFound from './pages/NotFound';
import NoteDetail from './pages/notes/NoteDetail';
import { NoteProvider } from './contexts/NoteContext';
import Archived from './pages/Archived';
import RouteChangeHandler from './components/RouteChangeHandler';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LocaleProvider>
          <NoteProvider>
            <BrowserRouter basename="/personal-notes-app-react-api-context-hooks">
              <RouteChangeHandler />
              <Routes>
                <Route path="/" element={<IndexLayout />}>
                  <Route index element={<Index />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/new"
                    element={
                      <ProtectedRoute>
                        <New />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/archived"
                    element={
                      <ProtectedRoute>
                        <Archived />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notes/:id"
                    element={
                      <ProtectedRoute>
                        <NoteDetail />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </NoteProvider>
        </LocaleProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
