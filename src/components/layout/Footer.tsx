import { GraduationCap, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">מנטור אנדרואיד</span>
          </div>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            נוצר עם <Heart className="h-4 w-4 text-destructive fill-destructive" /> למען תלמידי הנדסת תכנה
          </p>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  );
}
