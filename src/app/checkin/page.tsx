import CheckIn from "@/components/components/checkin/checkin";
import SplashWrapper from "@/components/components/splashscreen/SplashWrapper";

export default function CheckInPage() {
  return (
    <SplashWrapper
      imageSrc="/image/bgSplashScreen.svg"
      duration={2500}
      showOnce={false}
    >
      <CheckIn />
    </SplashWrapper>
  );
}
