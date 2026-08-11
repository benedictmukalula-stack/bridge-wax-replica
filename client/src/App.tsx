import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Laboratory = lazy(() => import("./pages/Laboratory"));
const Products = lazy(() => import("./pages/Products"));
const ProductCategory = lazy(() => import("./pages/ProductCategory"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/laboratory"} component={Laboratory} />
      <Route path={"/products"} component={Products} />
      <Route path={"/products/:category"} component={ProductCategory} />
      <Route path={"/services"} component={Products} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="route-loading" role="status">Loading Bridge Wax…</div>}>
        <Router />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
