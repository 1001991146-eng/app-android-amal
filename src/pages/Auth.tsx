import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, MailCheck } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  // login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // signup fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"student" | "teacher">("student");
  const [teacherCode, setTeacherCode] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);
    if (error) {
      toast({
        title: "ההתחברות נכשלה",
        description: "בדקו את הדוא\"ל והסיסמה ונסו שוב",
        variant: "destructive",
      });
      return;
    }
    navigate("/dashboard");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (accountType === "teacher" && !teacherCode.trim()) {
      toast({
        title: "חסר קוד מוסד",
        description: "להרשמה כמורה יש להזין את קוד המוסד שקיבלת מהמורה המרכז",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: fullName,
          role: accountType,
          teacher_code: accountType === "teacher" ? teacherCode.trim() : "",
        },
      },
    });
    setLoading(false);
    if (error) {
      toast({
        title: "ההרשמה נכשלה",
        description: error.message.includes("already")
          ? "כבר קיים חשבון עם הדוא\"ל הזה — נסו להתחבר"
          : /weak|easy to guess|pwned/i.test(error.message)
            ? "הסיסמה פשוטה או נפוצה מדי — בחרו סיסמה מורכבת יותר (שלבו אותיות ומספרים)"
            : /at least|characters/i.test(error.message)
              ? "הסיסמה קצרה מדי — נדרשים לפחות 6 תווים"
              : /email/i.test(error.message)
                ? "כתובת הדוא\"ל אינה תקינה"
                : "אירעה שגיאה, נסו שוב",
        variant: "destructive",
      });
      return;
    }
    setSignupDone(true);
  };

  if (signupDone) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <Card className="max-w-md w-full text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <MailCheck className="h-7 w-7 text-primary" />
              </div>
              <CardTitle>נשלח אליך מייל אימות</CardTitle>
              <CardDescription>
                פתחו את המייל שנשלח אליכם ולחצו על הקישור כדי להפעיל את החשבון. לאחר מכן תוכלו להתחבר.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => setSignupDone(false)}>
                חזרה להתחברות
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">ברוכים הבאים</CardTitle>
            <CardDescription>התחברו או צרו חשבון כדי לעקוב אחר התקדמות הפרויקט</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" dir="rtl">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">התחברות</TabsTrigger>
                <TabsTrigger value="signup">הרשמה</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">דוא"ל</Label>
                    <Input
                      id="login-email"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@example.com"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">סיסמה</Label>
                    <Input
                      id="login-password"
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      dir="ltr"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "מתחבר..." : "התחברות"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">שם מלא</Label>
                    <Input
                      id="full-name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="ישראל ישראלי"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">דוא"ל</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">סיסמה</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      dir="ltr"
                    />
                    <p className="text-xs text-muted-foreground">
                      לפחות 6 תווים. סיסמאות פשוטות או נפוצות (כמו 123456) נחסמות — מומלץ לשלב אותיות ומספרים.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Label>אני נרשם/ת בתור</Label>
                    <RadioGroup
                      value={accountType}
                      onValueChange={(v) => setAccountType(v as "student" | "teacher")}
                      className="flex gap-6"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="student" id="role-student" />
                        <Label htmlFor="role-student" className="font-normal">תלמיד/ה</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="teacher" id="role-teacher" />
                        <Label htmlFor="role-teacher" className="font-normal">מורה</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {accountType === "teacher" && (
                    <div className="space-y-2">
                      <Label htmlFor="teacher-code">קוד מוסד</Label>
                      <Input
                        id="teacher-code"
                        required
                        value={teacherCode}
                        onChange={(e) => setTeacherCode(e.target.value)}
                        placeholder="הזינו את הקוד שקיבלתם"
                        dir="ltr"
                      />
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "נרשם..." : "יצירת חשבון"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;
