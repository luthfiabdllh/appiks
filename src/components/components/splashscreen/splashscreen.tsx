"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type SplashProps = {
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  quote?: string;
  author?: string;
  duration?: number;
  showOnce?: boolean;
  onFinish?: () => void;
};

export default function SplashScreen({
  imageSrc = "/image/bgSplashScreen.svg",
  title = "Hai, Selamat Datang di Appiks!",
  subtitle = "Platform untuk Mencegah Intoleransi dan Kekerasan di Sekolah melalui Pemantauan Emosi & Edukasi Positif.",
  quote = '"Percayalah pada dirimu sendiri dan semua yang ada dalam dirimu. Ketahuilah bahwa ada sesuatu di dalam dirimu yang lebih besar daripada rintangan apa pun."',
  author = "Christian D. Larson",
  duration = 3000,
  showOnce = true,
  onFinish,
}: SplashProps) {
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (showOnce) {
      try {
        const seen = sessionStorage.getItem("appiks_splash_seen");
        if (seen === "1") {
          setVisible(false);
          onFinish?.();
          return;
        }
      } catch {
        // ignore storage errors (e.g. disabled)
      }
    }

    const enterDelay = shouldReduceMotion ? 0 : 100;
    const start = window.setTimeout(() => {
      setVisible(false); // mulai exit
    }, enterDelay + duration);

    return () => clearTimeout(start);
  }, [duration, onFinish, showOnce, shouldReduceMotion]);

  // ketika exit complete, simpan flag jika showOnce
  function handleExitComplete() {
    if (showOnce) {
      try {
        sessionStorage.setItem("appiks_splash_seen", "1");
      } catch {}
    }
    onFinish?.();
  }

  // jika pengguna mengurangi motion, hilangkan transisi panjang
  const transition = shouldReduceMotion
    ? { duration: 0.12 }
    : { duration: 0.7 };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          aria-hidden={!visible}
          role="dialog"
          aria-label="Splash screen"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={imageSrc}
              alt="splash background"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div className="max-w-5xl w-full px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-semibold text-white drop-shadow-md leading-tight">
              {title}
            </h1>
            <p className="mt-4 text-sm md:text-lg text-white/90 max-w-3xl mx-auto">
              {subtitle}
            </p>

            <div className="mt-12 mx-auto max-w-3xl rounded-xl border border-white/ bg-white/10 p-6 md:p-8 backdrop-blur-md shadow-lg">
              <h3 className="text-lg md:text-2xl font-semibold text-white">
                Quote of the Day
              </h3>
              <p className="mt-4 text-sm md:text-base text-white/90">{quote}</p>
              <div className="mt-4 text-sm italic text-white/80">
                - {author} -
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
