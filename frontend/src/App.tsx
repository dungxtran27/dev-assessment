import { Header } from "./components/Header";
import { useHealthCheck } from "./hooks/useHealthCheck";
import { HomePage } from "./pages/HomePage";

export default function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;
  const healthStatus = useHealthCheck(apiBaseUrl);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#cffafe_0,_#f8fafc_42%,_#e2e8f0_100%)] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <Header healthStatus={healthStatus} />
        <HomePage />
      </div>
    </main>
  );
}
