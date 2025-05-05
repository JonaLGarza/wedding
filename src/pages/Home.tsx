import { Helmet } from 'react-helmet-async';

export default function HomePage() {
    return <>
      <Helmet>
        <title>Boda de Jonathan y Genesis</title>
        <meta
          name="description"
          content="Boda de Jonathan y Genesis"
        />
      </Helmet>
      <main>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">Boda de Jonathan y Genesis</h1>
        </div>
      </main>
      <footer className="text-center py-10 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Jonathan Lopez. All rights reserved.
      </footer>
    </>
}
