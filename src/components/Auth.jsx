import React from "react";
import { SignIn, SignUp, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Auth({ isMobile }) {
  return (
    <div className={`${isMobile ? 'w-full' : ''}`}>
      <SignedOut>
        <button
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2 rounded-xl font-semibold shadow-md hover:scale-105 transition"
          onClick={() => window.Clerk.openSignIn({})}
        >
          Login
        </button>
      </SignedOut>

      <SignedIn>
        <div className={`flex items-center ${isMobile ? 'flex-col space-y-4' : 'space-x-4'}`}>
          <UserButton />
          <button
            className="bg-red-600 px-6 py-2 rounded-xl font-semibold shadow-md hover:scale-105 transition"
            onClick={() => window.Clerk.signOut()}
          >
            Logout
          </button>
        </div>
      </SignedIn>
    </div>
  );
}

export default Auth;