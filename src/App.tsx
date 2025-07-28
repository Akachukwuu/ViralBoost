import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { AuthForm } from "./components/AuthForm";
import { GenerateContent } from "./components/GenerateContent";
import { PricingPage } from "./components/PricingPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/generate" element={<GenerateContent />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10B981",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#EF4444",
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
