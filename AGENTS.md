# Architecture rules
- Keep authentication state in the shared AuthProvider inside BrowserRouter; navigation and dashboard routing must use the same session.
- Keep milestone definitions and progress calculations in the shared milestone data module so student and teacher views agree.
- Teacher dashboard role filtering depends on server-authorized role reads; students may read only their own roles.- Keep rubric compliance rules (database, AI path, section 6/8 conditions) in the shared rubricRules module so student form and teacher table agree.
