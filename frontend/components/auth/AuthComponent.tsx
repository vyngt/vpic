import { useSession } from "next-auth/react";
import { UserNavigator } from "./UserNavigator";
import { SignInComponent } from "./SignInComponent";

export function AuthComponent() {
  const { data: session } = useSession();
  return session ? <UserNavigator session={session} /> : <SignInComponent />;
}
