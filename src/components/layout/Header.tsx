import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, CheckSquare, GraduationCap, FileText, Calculator, Brain, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import schoolLogo from "@/assets/school-logo.png";
import { useAuth } from "@/hooks/useAuth";

const navigation = [
  { name: "הרחבות", href: "/extensions", icon: GraduationCap },
  { name: "כותב ספר", href: "/book", icon: FileText },
  { name: "בודק פרויקט", href: "/checker", icon: CheckSquare },
  { name: "בודק ספר", href: "/book-checker", icon: FileText },
  { name: "תרגול לבחינה", href: "/practice", icon: BookOpen },
  { name: "מחשבון בגרות", href: "/grade-calculator", icon: Calculator },
  { name: "בינה מלאכותית", href: "/ai", icon: Brain },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { session, loading, signOut } = useAuth();
  const accountLink = session
    ? { name: "לוח הבקרה שלי", href: "/dashboard", icon: LayoutDashboard }
    : { name: "התחברות/הרשמה", href: "/auth", icon: LogIn };
  const links = [...navigation, accountLink];

  return (
    <>
      {/* School Logo Banner */}
      <div className="w-full bg-background border-b border-border/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <img 
              src={schoolLogo} 
              alt="בית הספר הרב תחומי עמל חדרה למדעים ולאמנויות" 
              className="h-10 md:h-12 object-contain"
            />
            <span className="text-xs md:text-sm text-muted-foreground">
              נערך על ידי מריאלה שטיין ואופיר ונדר
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-soft group-hover:shadow-card transition-shadow duration-300">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground whitespace-nowrap">מנטור אנדרואיד</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {links.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
            {session && (
              <Button variant="ghost" size="icon" onClick={() => void signOut()} aria-label="התנתקות" title="התנתקות" disabled={loading}>
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            aria-label={mobileMenuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-border bg-background animate-slide-up">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {links.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
              {session && (
                <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => { setMobileMenuOpen(false); void signOut(); }} disabled={loading}>
                  <LogOut className="h-5 w-5" />
                  התנתקות
                </Button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
