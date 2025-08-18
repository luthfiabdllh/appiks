import { LoginForm } from "@/components/components/auth/login-form";
import SplashWrapper from "@/components/components/splashscreen/SplashWrapper";

export default function LoginPage() {
  return (
    <SplashWrapper
      imageSrc="/image/bgSplashScreen.svg"
      duration={2500}
      showOnce={false}
    >
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-5xl">
          <LoginForm />
        </div>
      </div>
    </SplashWrapper>
  );
}
