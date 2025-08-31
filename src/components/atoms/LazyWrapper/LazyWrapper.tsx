import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const LazyWrapper = () => (
  <Suspense 
    fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--brand-terracotta)] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="text-lg text-[var(--muted-fg)]">Loading...</p>
        </div>
      </div>
    }
  >
    <Outlet />
  </Suspense>
);