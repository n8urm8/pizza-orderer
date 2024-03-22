import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  profile: any;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  profile: null,
  isAdmin: false,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // check if user is logged in
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error && data) {
        setSession(data.session);

        if (data.session) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.session.user?.id)
            .single();

          setProfile(profileData);
        }

        setIsLoading(false);

        return;
      }
    };
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        profile,
        isAdmin: profile?.group === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  //   if (context === undefined) {
  //     throw new Error("useAuth must be used within a AuthProvider");
  //   }
  return context;
};
