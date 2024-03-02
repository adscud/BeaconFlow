import { Redirect, Slot } from "expo-router";
import { useEffect, useState } from "react";

import { db } from "../../lib/database";
import { Settings } from "../../types";

export default function Layout() {
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM settings LIMIT 1", [], (tx, results) => {
        const settings = results.rows.item(0);
        setSettings(settings ?? null);
        setLoading(false);
      });
    });
  }, []);

  if (loading) {
    return null;
  }

  if (!loading && !settings) {
    return <Redirect href="/onboarding" />;
  }

  return <Slot />;
}
