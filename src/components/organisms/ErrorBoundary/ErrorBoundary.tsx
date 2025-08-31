import { ReactNode, useEffect, useState, lazy, Suspense } from "react";

const FallbackMessage = lazy(() => import("../../molecules/FallBackMessage/FallBackMessage"));

export function ErrorBoundary({ children }: { children: ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      event.preventDefault();
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return (
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--brand-terracotta)] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="text-lg text-[var(--muted-fg)]">Loading...</p>
          </div>
        </div>
      }>
        <FallbackMessage title="Oops!" message="Something went wrong." />
      </Suspense>
    );
  }

  return <>{children}</>;
}


// Fix for the story error: export a real component that throws an error
export function ErrorThrowingComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Simulated error for testing ErrorBoundary");
  }

  return (
    <button
      onClick={() => setShouldThrow(true)}
      className="px-4 py-2 bg-[var(--brand-terracotta)] text-[var(--brand-ivory)] rounded-xl hover:bg-[var(--brand-terracotta-700)] transition-colors"
    >
      Trigger Error
    </button>
  );
}