import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw, Bug } from "lucide-react";

function FallbackMessage({
  title = "Oops!",
  message = "Something went wrong."
}: { title?: string; message?: string }) {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/porfolio");
  };

  const handleReportIssue = () => {
    window.open("https://github.com/JonaLGarza/porfolio/issues", "_blank");
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-20 px-6 text-center text-[var(--muted-fg)] overflow-hidden">
      {/* Animated background shape */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-[var(--brand-terracotta)]/10 rounded-full -z-10 blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <motion.div
        className="p-10 bg-[var(--brand-ivory)]/70 backdrop-blur border border-[color:var(--brand-beige)] rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <AlertTriangle className="w-14 h-14 text-[var(--brand-terracotta)] mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold mb-3 text-[var(--brand-olive)]">{title}</h2>
        <p className="max-w-md mx-auto mb-6 text-[var(--muted-fg)] text-base">{message}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleReload}
            className="px-5 py-2 text-sm font-medium text-[var(--brand-ivory)] bg-[var(--brand-terracotta)] rounded-xl hover:bg-[var(--brand-terracotta-700)] transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw size={16} /> Reload Page
          </button>
          <button
            onClick={handleGoHome}
            className="px-5 py-2 text-sm font-medium text-[var(--brand-olive)] bg-[var(--brand-beige)]/30 rounded-xl hover:bg-[var(--brand-beige)]/50 transition-colors inline-flex items-center gap-2 cursor-pointer border border-[color:var(--brand-beige)]"
          >
            <Home size={16} /> Go to Homepage
          </button>
          <button
            onClick={handleReportIssue}
            className="px-5 py-2 text-sm font-medium text-[var(--brand-ivory)] bg-[var(--brand-olive)] rounded-xl hover:bg-[var(--brand-olive-700)] transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Bug size={16} /> Report Issue
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default FallbackMessage;