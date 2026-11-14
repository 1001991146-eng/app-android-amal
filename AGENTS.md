# Architecture rules
- Keep authentication state in the shared AuthProvider inside BrowserRouter; navigation and dashboard routing must use the same session.
- Keep milestone definitions and progress calculations in the shared milestone data module so student and teacher views agree.
- Teacher dashboard role filtering depends on server-authorized role reads; students may read only their own roles.