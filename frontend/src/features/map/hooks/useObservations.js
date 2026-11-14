
import { useEffect, useState } from "react";
import { mockObservations } from "../data/mockObservations.js";

const API_URL = import.meta.env.VITE_OBSERVATIONS_API_URL;

function validateObservation(item, index) {
  const required = ["id", "name", "region", "date", "product"];

  for (const field of required) {
    if (typeof item?.[field] !== "string" || !item[field].trim()) {
      throw new Error(
        `Observation ${index + 1} has an invalid ${field} field.`
      );
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
    throw new Error(
      `Observation ${index + 1} must use YYYY-MM-DD for its date.`
    );
  }

  if (
    item.polarization != null &&
    typeof item.polarization !== "string"
  ) {
    throw new Error(
      `Observation ${index + 1} has an invalid polarization.`
    );
  }

  return {
    id: item.id,
    name: item.name,
    region: item.region,
    date: item.date,
    product: item.product,
    polarization: item.polarization ?? null,
  };
}

export default function useObservations() {
  const [observations, setObservations] = useState(
    API_URL ? [] : mockObservations
  );

  const [loading, setLoading] = useState(Boolean(API_URL));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!API_URL) return;

    const controller = new AbortController();

    async function loadObservations() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const payload = await response.json();

        const records = Array.isArray(payload)
          ? payload
          : payload?.observations;

        if (!Array.isArray(records)) {
          throw new Error("API must return an observations array.");
        }

        const validated = records.map(validateObservation);

        if (!controller.signal.aborted) {
          setObservations(validated);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setObservations([]);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadObservations();

    return () => controller.abort();
  }, []);

  return {
    observations,
    loading,
    error,
    source: API_URL ? "api" : "demo",
  };
}
