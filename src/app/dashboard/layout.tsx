// import { Navbar } from "@/components/components/navbar";

import NavbarUserDashboard from "@/components/components/navbar/userDashboardNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {/* <Navbar /> */}
      <NavbarUserDashboard/>
      <div className="min-h-screen container max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-10 sm:py-16 lg:py-20">
        {children}
      </div>
    </main>
  );
}
