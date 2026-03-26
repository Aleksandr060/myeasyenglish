import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { meApi } from "./api/client";
import { AppShell } from "./components/AppShell";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore } from "./store/auth";
import { useThemeStore } from "./store/theme";
import { DashboardPage } from "./pages/DashboardPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { LessonPage } from "./pages/LessonPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

export default function App() {
  const { token, initialized, setInitialized, setUser, logout } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setInitialized(true);
        return;
      }

      try {
        const user = await meApi();
        setUser(user);
      } catch {
        logout();
      } finally {
        setInitialized(true);
      }
    };

    bootstrap();
  }, [token, logout, setInitialized, setUser]);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] text-[var(--text)]">
        <div className="rounded-3xl border border-white/10 bg-white/80 px-6 py-4 text-lg font-bold shadow-card dark:bg-slate-900/80">
          Loading your lesson trail...
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="lesson/:lessonId" element={<LessonPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
    </Routes>
  );
}
