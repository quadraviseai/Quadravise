import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PageLayout from "./components/layout/PageLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import CookieBanner from "./components/common/CookieBanner";

/* Public Pages */
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUsPage";
import BlogPage from "./pages/Blog";
import CaseStudiesPage from "./pages/CaseStudies";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";
import TermsOfService from "./pages/TermsOfService";

/* Individual Services */
import AiSolutionsPage from "./pages/Services/AiSolutionsPage";
import WebMobilePage from "./pages/Services/WebMobilePage";
import DataSolutionsPage from "./pages/Services/DataSolutionsPage";
import BpoKpoPage from "./pages/Services/BpoKpoPage";

/* Auth */
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/ForgotPassword";

/* CRM */
import CRMLayout from "./CRM/CRMLayout";

/* Creative Login Pages */
import {
  LoginPageOne,
  LoginPageTwo,
  LoginPageThree,
  LoginPageFour,
  LoginPageFive,
} from "./templates/Login/LoginPages";

import ScrollToTop from "./components/utils/ScrollToTop";

export default function App() {
  const location = useLocation();

  /** Routes WITHOUT global layout */
  const noLayoutRoutes = [
    "/secure-login",
    "/forgot-password",
    "/login-1",
    "/login-2",
    "/login-3",
    "/login-4",
    "/login-5",
  ];

  const hideLayout =
    noLayoutRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/crm");

  return (
    <>
      <ScrollToTop />
      <CookieBanner />

      <AnimatePresence mode="wait">
        {hideLayout ? (
          <Routes location={location} key={location.pathname}>
            {/* Auth */}
            <Route path="/secure-login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Creative Login Pages */}
            <Route path="/login-1" element={<LoginPageOne />} />
            <Route path="/login-2" element={<LoginPageTwo />} />
            <Route path="/login-3" element={<LoginPageThree />} />
            <Route path="/login-4" element={<LoginPageFour />} />
            <Route path="/login-5" element={<LoginPageFive />} />

            {/* CRM (Protected) */}
            <Route
              path="/crm/*"
              element={
                <ProtectedRoute>
                  <CRMLayout />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        ) : (
          <PageLayout>
            <Header />

            <main className="flex-1 bg-transparent">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/ai" element={<AiSolutionsPage />} />
                <Route
                  path="/services/web-mobile"
                  element={<WebMobilePage />}
                />
                <Route path="/services/data" element={<DataSolutionsPage />} />
                <Route path="/services/bpo-kpo" element={<BpoKpoPage />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
          </PageLayout>
        )}
      </AnimatePresence>
    </>
  );
}
