import { Route, Switch } from "wouter";
import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Head from "./components/Head";
import QuoteCart from "./components/QuoteCart";
import { QuoteCartProvider } from "./contexts/QuoteCartContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LabCategory from "./pages/LabCategory";
import Laboratory from "./pages/Laboratory";
import NotFound from "./pages/NotFound";
import ProductCategory from "./pages/ProductCategory";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import ServiceCategory from "./pages/ServiceCategory";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/laboratory"} component={Laboratory} />
      <Route path={"/laboratory/:category"} component={LabCategory} />
      <Route path={"/products"} component={Products} />
      <Route path={"/products/:category/:product"} component={ProductDetail} />
      <Route path={"/products/:category"} component={ProductCategory} />
      <Route path={"/services/:service"} component={ServiceCategory} />
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
      <QuoteCartProvider>
        <Head />
        <Suspense fallback={<div className="route-loading" role="status">Loading Bridge Wax…</div>}><Router /></Suspense>
        <QuoteCart />
      </QuoteCartProvider>
    </ErrorBoundary>
  );
}

export default App;
