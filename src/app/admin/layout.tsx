import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Debashis Barman Portfolio",
  description: "Manage portfolio content, testimonials, brand logos, and blog posts.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
