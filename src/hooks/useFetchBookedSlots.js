import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useFetchBookedSlots() {
  const [bookedSlots, setBookedSlots] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAppts() {
      const { data, error } = await supabase.from("BookedSlots").select("*");

      if (data) setBookedSlots(data);
      if (error) setError(error);

      setLoading(false);
    }

    getAppts();
  }, []);

  return { bookedSlots, error, loading };
}
