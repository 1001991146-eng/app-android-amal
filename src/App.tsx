import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Extensions from "./pages/Extensions";
import Checker from "./pages/Checker";
import Practice from "./pages/Practice";
import Book from "./pages/Book";
import BookChecker from "./pages/BookChecker";
import GradeCalculator from "./pages/GradeCalculator";
import AI from "./pages/AI";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/extensions" element={<Extensions />} />
          <Route path="/checker" element={<Checker />} />
          <Route path="/book-checker" element={<BookChecker />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/book" element={<Book />} />
          <Route path="/grade-calculator" element={<GradeCalculator />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
