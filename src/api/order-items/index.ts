import { supabase } from "@/src/lib/supabase";
import { InsertTables } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (orderItems: InsertTables<'order_items'>[]) => {
        const { data, error } = await supabase
          .from("order_items")
          .insert(orderItems)
          .select()
        if (error) throw new Error(error.message);
        return data;
      },
    });
  };