import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { extensions, Extension } from "@/data/extensions";
import { 
  BookOpen, 
  Code2, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp,
  Star,
  Zap,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "required", name: "הרחבות בסיסיות (סעיף 6)", icon: Star, color: "from-blue-500 to-blue-600" },
  { id: "advanced", name: "נושאים מתקדמים (סעיף 9)", icon: Zap, color: "from-purple-500 to-purple-600" },
  { id: "combined", name: "נושאים משולבים (סעיף 10)", icon: Layers, color: "from-amber-500 to-amber-600" },
];

function ExtensionCard({ extension }: { extension: Extension }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden animate-fade-in">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
            <Code2 className="h-5 w-5" />
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold text-foreground">{extension.name}</h3>
            <p className="text-sm text-muted-foreground">{extension.nameEn}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {extension.points === 1 ? "נקודה אחת" : "חצי נקודה"}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-5 pt-0 border-t border-border/50 space-y-6 animate-slide-up">
          {/* Description */}
          <div>
            <p className="text-muted-foreground">{extension.description}</p>
          </div>

          {/* Theory */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <h4 className="font-bold text-foreground">הסבר תאורטי</h4>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-foreground whitespace-pre-line leading-relaxed">
                {extension.theory}
              </p>
            </div>
          </div>

          {/* Principles */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-accent" />
              <h4 className="font-bold text-foreground">עקרונות חשובים</h4>
            </div>
            <ul className="space-y-2">
              {extension.principles.map((principle, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{principle}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Example */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="h-5 w-5 text-success" />
              <h4 className="font-bold text-foreground">דוגמת קוד</h4>
            </div>
            <div className="code-block rounded-lg overflow-hidden">
              <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                <code>{extension.codeExample}</code>
              </pre>
            </div>
          </div>

          {/* Tips */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-warning" />
              <h4 className="font-bold text-foreground">טיפים</h4>
            </div>
            <ul className="space-y-2">
              {extension.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-warning">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Extensions() {
  const [activeCategory, setActiveCategory] = useState<string>("required");

  const filteredExtensions = extensions.filter(ext => ext.category === activeCategory);

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              מדריך ההרחבות
            </h1>
            <p className="text-lg text-muted-foreground">
              כל ההרחבות הנדרשות לפרויקט בגרות עם הסברים תאורטיים, 
              עקרונות חשובים ודוגמאות קוד מפורטות
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "secondary"}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "gap-2",
                  activeCategory === category.id && "shadow-card"
                )}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Extensions List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Category Info */}
            <div className="bg-muted/50 rounded-xl p-6 mb-8">
              {activeCategory === "required" && (
                <p className="text-foreground">
                  <strong>סעיף 6:</strong> יש לבחור <strong>נושא אחד</strong> מהרשימה הבאה. 
                  כל נושא שווה נקודה אחת לציון ההרחבות.
                </p>
              )}
              {activeCategory === "advanced" && (
                <p className="text-foreground">
                  <strong>סעיף 9:</strong> נושאים מתקדמים. יש לבחור <strong>נושא אחד</strong> מהרשימה. 
                  כל נושא שווה נקודה אחת לציון ההרחבות.
                </p>
              )}
              {activeCategory === "combined" && (
                <p className="text-foreground">
                  <strong>סעיף 10:</strong> נושאים משולבים. <strong>שילוב של 2 נושאים</strong> מרשימה זו 
                  שווה ערך לנושא מתקדם אחד מסעיף 9.
                </p>
              )}
            </div>

            {/* Extensions */}
            {filteredExtensions.map((extension) => (
              <ExtensionCard key={extension.id} extension={extension} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
