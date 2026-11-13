import { Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import { Loader2 } from "lucide-react";

/** מנתב את המשתמש ללוח הבקרה המתאים לפי סוג החשבון */
const Dashboard = () => {
  const { session, role, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!session) return <Navigate to="/auth" replace />;

  return <Layout>{role === "teacher" ? <TeacherDashboard /> : <StudentDashboard />}</Layout>;
};

export default Dashboard;
