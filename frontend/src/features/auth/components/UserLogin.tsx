import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import UserSignUpForm from "./UserSigninForm";
import UserLoginForm from "./UserLoginForm";

function UserLogin({ open, onOpenChange }) {
  const [signInOpen, setSignInOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] !max-w-[25vw] flex-col overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
        <DialogHeader className="relative -mx-4 -mt-4 w-[calc(100%+2rem)] bg-[var(--color-primary)]  px-4 py-2">
  <DialogTitle className="text-center text-2xl font-bold text-white">
    {signInOpen ? 
    <div>
      <p>Create New Account</p>
    <p className="font-normal text-sm">Join now to access premium features</p>
    </div> : <div><p>Welcome Back</p>
    <p className="font-normal text-sm">Log in to your account to continue.</p></div>} 
  </DialogTitle>
</DialogHeader>

        {signInOpen ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <UserSignUpForm setSignInOpen={setSignInOpen} />

            <p>
              Already have an account?
              <span
                className="cursor-pointer pl-3 text-[var(--color-primary)] transition-all duration-600 hover:underline"
                onClick={() => setSignInOpen(false)}
              >
                Log In
              </span>
            </p>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <UserLoginForm onOpenChange={onOpenChange} />

            <p>
              Don't have an account?
              <span
                className="cursor-pointer pl-3 text-[var(--color-primary)] transition-all duration-600 hover:underline"
                onClick={() => setSignInOpen(true)}
              >
                Sign In
              </span>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
export default UserLogin;
