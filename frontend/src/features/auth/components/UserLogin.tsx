import { inputStyle } from "@/components/shared/styles/inputStyle";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import UserSignUpForm from "./UserSigninForm";
import UserLoginForm from "./UserLoginForm";

function UserLogin({ open, onOpenChange }) {
  const [signInOpen, setSignInOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col  p-10 max-h-[80vh] !max-w-[30vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
        <DialogTitle>{signInOpen ? "SIGN IN" : "LOG IN"}</DialogTitle>
        {signInOpen ? (
          <div className=" flex flex-col h-full w-full items-center justify-center gap-3">
            <UserSignUpForm setSignInOpen={setSignInOpen}/>
            <p>
              Already have an account?
              <span
                className="text-[var(--color-primary)] cursor-pointer hover:underline transtion-all duration-600 pl-3"
                onClick={() => setSignInOpen(!signInOpen)}
              >
                Log In
              </span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full w-full items-center justify-center gap-3">
            <UserLoginForm onOpenChange={onOpenChange}/>
            <p>
              Don't have an account?
              <span
                className="text-[var(--color-primary)] cursor-pointer hover:underline transtion-all duration-600 pl-3"
                onClick={() => setSignInOpen(!signInOpen)}
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
