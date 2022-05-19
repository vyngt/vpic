import { signIn } from "next-auth/react";

export const SignInComponent = () => {
  return (
    <>
      <button
        className="btn btn-outline-light me-2"
        onClick={() => signIn("vyapp", { callbackUrl: window.location.href })}
      >
        Sign in
      </button>
      <button type="button" className="btn btn-primary">
        Sign-up
      </button>
    </>
  );
};
