import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useFetchAppts() {
  const [appointments, setAppointments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAppts() {
      const { data, error } = await supabase.from("appointments").select("*");

      if (data) setAppointments(data);
      if (error) setError(error);

      setLoading(false);
    }

    getAppts();
  }, []);

  return { appointments, error, loading };
}
