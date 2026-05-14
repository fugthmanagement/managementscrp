"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { DashboardClient } from "@/components/dashboard-client";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardClient />
    </ProtectedRoute>
  );
}
