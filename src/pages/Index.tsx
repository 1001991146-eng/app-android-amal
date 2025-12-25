import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  CheckSquare, 
  GraduationCap, 
  FileText, 
  Code2, 
  Rocket,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Target,
  Layers,
  Clock,
  Calculator
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "מדריך הרחבות",
    description: "כל ההרחבות הנדרשות עם הסברים תאורטיים ודוגמאות קוד מפורטות",
    href: "/extensions",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: FileText,
    title: "כותב ספר",
    description: "מדריך מפורט לכתיבת ספר הפרויקט לפי התבנית הנדרשת",
    href: "/book",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: CheckSquare,
    title: "בודק פרויקט",
    description: "בדוק אם הפרויקט שלך עומד בכל הקריטריונים הנדרשים ל-5 יחידות",
    href: "/checker",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: FileText,
    title: "בודק ספר",
    description: "בדוק אם ספר הפרויקט שלך מכיל את כל הפרקים הנדרשים",
    href: "/book-checker",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: GraduationCap,
    title: "תרגול לבחינה",
    description: "שאלות תרגול עם משוב מיידי להכנה לבחינה בעל פה",
    href: "/practice",
    color: "from-amber-500 to-amber-600"
  },
  {
    icon: Calculator,
    title: "מחשבון בגרות",
    description: "חשב את ציון הבגרות הצפוי שלך לפי הרכב הציון הרשמי",
    href: "/grade-calculator",
    color: "from-rose-500 to-rose-600"
  }
];

const projectInfo = [
  {
    icon: Target,
    title: "מהו פרויקט הבגרות?",
    description: "פרויקט הגמר במדעי המחשב הוא פרויקט פיתוח אפליקציית אנדרואיד מקיפה, המהווה חלק מרכזי מבחינת הבגרות ב-5 יחידות לימוד. הפרויקט נועד להוכיח שליטה בתכנות מונחה עצמים, שימוש במסדי נתונים, ויכולת פיתוח מערכת שלמה."
  },
  {
    icon: Layers,
    title: "מבנה הפרויקט",
    description: "הפרויקט מורכב ממספר חלקים: אפליקציית אנדרואיד עובדת עם לפחות 4 מסכים, מסד נתונים SQLite, מימוש הרחבות מסעיפים 6, 9 ו-10, ספר פרויקט מפורט, ובחינה בעל פה. ציון ההגשה מהווה 50% מהציון הסופי."
  },
  {
    icon: Clock,
    title: "תהליך ההערכה",
    description: "ציון הבגרות הסופי מורכב מ-50% ציון הגשה ו-50% בחינת בגרות. ציון ההגשה מורכב מ-80% בחינת מגן (30% ספר פרויקט + 70% בחינת מגן בע\"פ) ו-20% טריוויה (30% מסמך סיכום + 70% בחינת טריוויה)."
  }
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-16 md:py-24">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">מנטור מומחה לפרויקט בגרות</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              הכנה לפרויקט בגרות
              <br />
              <span className="text-gradient">באנדרואיד</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
              כל מה שצריך להצלחה בפרויקט הגמר: הסברים מעמיקים על הרחבות, 
              בודק קריטריונים, תרגול לבחינה ומדריך לכתיבת ספר הפרויקט
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild variant="hero" size="xl">
                <Link to="/extensions" className="gap-3">
                  <Code2 className="h-5 w-5" />
                  התחל ללמוד הרחבות
                </Link>
              </Button>
              <Button asChild variant="secondary" size="xl">
                <Link to="/checker" className="gap-3">
                  <CheckSquare className="h-5 w-5" />
                  בדוק את הפרויקט שלך
                </Link>
              </Button>
            </div>

            {/* Official Link */}
            <div className="mt-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <a 
                href="https://meyda.education.gov.il/files/CSIT/smartphonesProject-5.pdf"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                מחוון משרד החינוך הרשמי
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Project Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              על פרויקט הבגרות
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              מידע חשוב שכל תלמיד צריך לדעת לפני שמתחילים
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projectInfo.map((info, index) => (
              <div
                key={info.title}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/50 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <info.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {info.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              כלים להצלחה
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              שישה כלים מרכזיים שילוו אותך לאורך כל הדרך לפרויקט מוצלח
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Link
                key={feature.title}
                to={feature.href}
                className="group relative bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50 hover:border-primary/20 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} shadow-soft mb-4`}>
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                
                {/* Arrow */}
                <div className="flex items-center text-primary font-medium">
                  <span>למידע נוסף</span>
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-card mb-6">
              <Rocket className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              מוכן להתחיל?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              התחל עם לימוד ההרחבות או בדוק מה עוד חסר בפרויקט שלך
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/extensions">
                  צפה בהרחבות
                </Link>
              </Button>
              <Button asChild variant="accent" size="lg">
                <Link to="/practice">
                  התחל תרגול
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
