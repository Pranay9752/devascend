// import { login, signup } from './actions'

// export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button>
//       <button formAction={signup}>Sign up</button>
//     </form>
//   )
// }

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "./components/AuthForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/30 p-6">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-3 pb-8">
          <CardTitle className="text-3xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center text-base">
            Enter your email to sign in or create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <AuthForm />
        </CardContent>
      </Card>
    </div>
  );
}
