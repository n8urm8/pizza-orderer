import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { InsertTables, Tables, UpdateTables } from "@/src/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminOrderList = ({ archived = false }) => {
  const status = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];
  return useQuery({
    queryKey: ["orders", { archived: archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", status)
        .order('created_at', {ascending: false})
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useUserOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  return useQuery({
    queryKey: ["orders", { userId: id }],
    queryFn: async () => {
      if (!id) throw new Error("User ID not found");
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id)
        .order('created_at', {ascending: false})
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useOrderWithId = (id: number) =>
  useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });


  export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const {session} = useAuth()
    const userId = session?.user.id;

    return useMutation({
      mutationFn: async (order: InsertTables<'orders'>) => {
        const { data, error } = await supabase
          .from("orders")
          .insert({...order, user_id: userId!})
          .select()
          .single();
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
    });
  };
  
  export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({id, updatedOrder}: {id: number, updatedOrder: UpdateTables<'orders'>}) => {
        const { data, error } = await supabase
          .from("orders")
          .update(updatedOrder)
          .eq("id", id)
          .select()
          .single();
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: async (_, order) => {
        await queryClient.invalidateQueries({ queryKey: ["orders"] });
        await queryClient.invalidateQueries({
          queryKey: ["orders", order.id],
        });
      },
    });
  };