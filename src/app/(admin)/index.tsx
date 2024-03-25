import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { Link, Redirect } from "expo-router";
import { View } from "react-native";

export default function TabIndex() {
  const { session, isAdmin } = useAuth();
  if (!session) {
    return <Redirect href="/sign-in" />;
  }
  if (!isAdmin) {
    return <Redirect href="/(user)" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)/menu"} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
}
