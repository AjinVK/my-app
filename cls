warning: in the working copy of 'src/App.tsx', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/src/App.tsx b/src/App.tsx[m
[1mindex 217e3ad..f9020a9 100644[m
[1m--- a/src/App.tsx[m
[1m+++ b/src/App.tsx[m
[36m@@ -6,7 +6,7 @@[m [mimport ForgotPassword from './LoginForm/ForgotPassword';[m
 [m
 const App: React.FC = () => {[m
   return ([m
[31m-    <BrowserRouter>[m
[32m+[m[32m    <BrowserRouter basename="/my-app">[m
       <Routes>[m
         <Route path="/" element={<Login />} />[m
         <Route path="/usermanagement/*" element={<UserManagement />} />[m
[36m@@ -14,6 +14,7 @@[m [mconst App: React.FC = () => {[m
         <Route path="*" element={<Login />} />[m
       </Routes>[m
     </BrowserRouter>[m
[32m+[m
   );[m
 };[m
 [m
