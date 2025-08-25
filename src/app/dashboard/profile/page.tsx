import { ProfilePage } from "@/components/components/profile/profileCard";

export default function profilePage() {
  return (
    <>
      <div className="text-center mb-18">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">Profil Saya</h1>
        <p className="text-muted-foreground">Kelola informasi pribadi mu</p>
      </div>
      <ProfilePage />
    </>
  );
}
