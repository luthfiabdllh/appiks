"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
  StepperTitle,
} from "@/components/ui/stepper";
import { Check, CircleCheck, XCircle } from "lucide-react";
import Image from "next/image";

const STEPS = [
  {
    step: 1,
    title: "mood check-in",
    description: "bagaimana perasaanmu hari ini?",
  },
  { step: 2, title: "hasil", description: "ringkasan check-in" },
] as const;

const RECOMMENDATIONS = [
  {
    id: 1,
    title: "Mainkan Game",
    subtitle: "Bermain untuk meredakan stress",
    color: "from-pink-200 to-violet-200",
    icon: "🎮",
  },
  {
    id: 2,
    title: "Akses Video",
    subtitle: "Tonton video inspiratif",
    color: "from-green-100 to-green-50",
    icon: "📺",
  },
  {
    id: 3,
    title: "Isi Angket",
    subtitle: "Jawab pertanyaan berikut",
    color: "from-violet-100 to-violet-50",
    icon: "📝",
  },
  {
    id: 4,
    title: "Quote of The Day",
    subtitle: "Jawab pertanyaan berikut",
    color: "from-violet-100 to-violet-50",
    icon: "⍘",
  },
] as const;

const REC_ROUTES: Record<number, string> = {
  1: "/game",
  2: "/videos",
  3: "/survey",
  4: "/quote",
} as const;

const MOOD_OPTIONS = [
  {
    key: "gembira",
    label: "Gembira",
    emoji: "😄",
    icon: "/icon/ico-happy.svg",
  },
  {
    key: "netral",
    label: "Netral",
    emoji: "🙂",
    icon: "/icon/ico-neutral.svg",
  },
  { key: "sedih", label: "Sedih", emoji: "😢", icon: "/icon/ico-sad.svg" },
  { key: "marah", label: "Marah", emoji: "😡", icon: "/icon/ico-angry.svg" },
] as const;

// Types
type MoodKey = (typeof MOOD_OPTIONS)[number]["key"];

interface MoodData {
  iconPath: string;
  title: string;
  status: string;
  color: string;
  statusIcon: React.ComponentType<{ className?: string }>;
}

const MOOD_MAP: Record<MoodKey, MoodData> = {
  gembira: {
    iconPath: "/icon/ico-happy.svg",
    title: "Pertahankan Energi Positifmu!",
    status: "Aman",
    color: "text-green-600",
    statusIcon: CircleCheck,
  },
  netral: {
    iconPath: "/icon/ico-neutral.svg",
    title: "Tetap Jaga Keseharianmu",
    status: "Aman",
    color: "text-green-600",
    statusIcon: CircleCheck,
  },
  sedih: {
    iconPath: "/icon/ico-sad.svg",
    title: "Terima Perasaanmu",
    status: "Tidak Aman",
    color: "text-red-600",
    statusIcon: XCircle,
  },
  marah: {
    iconPath: "/icon/ico-angry.svg",
    title: "Tenangkan Diri Terlebih Dahulu",
    status: "Tidak Aman",
    color: "text-red-600",
    statusIcon: XCircle,
  },
} as const;

export default function CheckIn() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [mood, setMood] = useState<MoodKey | null>(null);
  const [selectedRec, setSelectedRec] = useState<number | null>(null);

  // Memoized values
  const selectedMoodData = useMemo(
    () => (mood ? MOOD_MAP[mood] : null),
    [mood]
  );

  const headerTitle = useMemo(
    () => (currentStep === 1 ? "Mood Check-In" : "Hasil"),
    [currentStep]
  );

  const headerDescription = useMemo(
    () =>
      currentStep === 1
        ? "Luangkan waktu sejenak untuk merefleksikan perasaanmu. Informasi ini akan membantu kami memberikan dukungan yang tepat untukmu."
        : "Luangkan waktu sejenak untuk memahami perasaanmu. Hasil ini membantu mengenali diri lebih baik dan menemukan dukungan yang tepat.",
    [currentStep]
  );

  const buttonText = useMemo(
    () => (currentStep === STEPS.length ? "Selesai" : "Lanjutkan"),
    [currentStep]
  );

  const isNextDisabled = useMemo(() => {
    if (currentStep === 1) return !mood;
    if (currentStep === 2) return !selectedRec;
    return false;
  }, [currentStep, mood, selectedRec]);

  // Event handlers
  const handleMoodSelect = useCallback((moodKey: MoodKey) => {
    setMood(moodKey);
  }, []);

  const handleRecSelect = useCallback((recId: number) => {
    setSelectedRec(recId);
  }, []);

  const handleRefreshQuote = useCallback(() => {
    alert("refresh");
  }, []);

  const handleFinish = useCallback(() => {
    if (!selectedRec) return;

    const route = REC_ROUTES[selectedRec];
    if (!route) return;

    // Reset state
    setMood(null);
    setSelectedRec(null);
    setCurrentStep(1);
    router.push(route);
  }, [selectedRec, router]);

  const goNext = useCallback(() => {
    if (currentStep === 1 && !mood) return;
    if (currentStep === 2 && !selectedRec) return;

    if (currentStep >= STEPS.length) {
      handleFinish();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setCurrentStep((s) => Math.min(s + 1, STEPS.length));
      setIsLoading(false);
    }, 500);
  }, [currentStep, mood, selectedRec, handleFinish]);

  // Render components
  const renderMoodSelection = () => (
    <div className="text-center">
      <h3 className="text-lg sm:text-xl font-semibold mb-2">
        Bagaimana perasaanmu hari ini?
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-4">
        Pilih ikon yang paling menggambarkan suasana hatimu saat ini
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mx-auto">
        {MOOD_OPTIONS.map((item) => {
          const selected = mood === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleMoodSelect(item.key)}
              className={`relative flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-lg border p-3 sm:p-4 transition-all duration-200 min-h-[80px] sm:min-h-[100px]
                ${
                  selected
                    ? "border-primary bg-primary/10 scale-105"
                    : "border-border bg-background hover:border-primary/50"
                }
                hover:shadow-sm active:scale-95`}
              aria-pressed={selected}
              aria-label={`Pilih mood ${item.label}`}
            >
              {selected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-sm flex items-center justify-center shadow-sm">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
              <Image
                width="32"
                height="32"
                src={item.icon}
                alt={item.label}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="text-xs sm:text-sm font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderQuoteCard = () => (
    <div className="mt-6 sm:mt-8">
      <div className="mx-auto rounded-xl border p-4 sm:p-6 bg-gradient-to-br from-yellow-50/70 to-orange-100/60 dark:from-yellow-950/30 dark:to-orange-950/30 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
          <div className="size-25 rounded-lg bg-yellow-100 dark:bg-yellow-900/60 flex items-center justify-center flex-shrink-0 shadow">
            <span className="text-3xl">⭐</span>
          </div>
          <div className="flex-1 md:text-left">
            <div className="text-lg font-semibold">Quote of the Day</div>
            <blockquote className="text-sm text-muted-foreground leading-relaxed">
              <q>
                The only way to do great work is to love what you do. If you
                haven&apos;t found it yet, keep looking. Don&apos;t settle.
              </q>
            </blockquote>
            <cite className="text-xs text-muted-foreground italic">
              — Steve Jobs
            </cite>
          </div>
          <button
            className="ml-auto sm:ml-4 p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-background/60"
            aria-label="Refresh quote"
            title="Refresh quote"
            onClick={handleRefreshQuote}
          >
            <span className="text-xl">↻</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="mt-6 sm:mt-8 text-left">
      <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-center sm:text-left">
        Rekomendasi Konten Untukmu
      </h4>

      <div className="space-y-3 sm:space-y-4">
        {RECOMMENDATIONS.map((rec) => {
          const active = selectedRec === rec.id;
          return (
            <button
              key={rec.id}
              type="button"
              onClick={() => handleRecSelect(rec.id)}
              className={`w-full rounded-lg border p-4 sm:p-5 flex items-center justify-between transition-all duration-200
                ${
                  active
                    ? "border-primary ring-2 ring-primary/40 bg-primary/5 scale-[1.02]"
                    : "border-border bg-background hover:border-primary/50 hover:shadow-md"
                }`}
              aria-pressed={active}
              aria-label={`Pilih ${rec.title}`}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center bg-gradient-to-br ${rec.color} flex-shrink-0`}
                  aria-hidden="true"
                >
                  <span className="text-xl sm:text-2xl">{rec.icon}</span>
                </div>
                <div className="text-left min-w-0">
                  <div className="font-medium text-sm sm:text-base truncate">
                    {rec.title}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {rec.subtitle}
                  </div>
                </div>
              </div>
              <div
                className={`text-xs sm:text-sm font-medium flex-shrink-0 ml-2 ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {active ? "✓ Dipilih" : "Pilih"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderResults = () => {
    const StatusIcon = selectedMoodData?.statusIcon;

    return (
      <div className="text-center">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <Image
            width="64"
            height="64"
            src={selectedMoodData?.iconPath || "/icon/ico-happy.svg"}
            alt={selectedMoodData?.title || "Mood icon"}
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
          <h3 className="text-lg sm:text-xl font-semibold px-4">
            {selectedMoodData?.title || "Terima kasih"}
          </h3>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span className="text-muted-foreground">Status mu :</span>
            <div className="flex items-center gap-1">
              <span
                className={`font-medium ${
                  selectedMoodData?.color || "text-muted-foreground"
                }`}
              >
                {selectedMoodData?.status || "—"}
              </span>
              {StatusIcon && (
                <StatusIcon className={`w-4 h-4 ${selectedMoodData?.color}`} />
              )}
            </div>
          </div>
        </div>

        {renderQuoteCard()}
        {renderRecommendations()}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8 lg:space-y-10">
          <Stepper value={currentStep}>
            {STEPS.map(({ step, title }) => (
              <StepperItem
                key={step}
                step={step}
                loading={isLoading}
                className="relative flex-1 flex-col!"
              >
                <StepperTrigger className="flex-col gap-3 rounded z-1">
                  <StepperIndicator />
                  <div className="space-y-0.5 px-2">
                    <StepperTitle>{title}</StepperTitle>
                  </div>
                </StepperTrigger>
                {step < STEPS.length && (
                  <StepperSeparator className="absolute inset-x-0 top-5 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                )}
              </StepperItem>
            ))}
          </Stepper>

          {/* Header */}
          <header className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              {headerTitle}
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground px-4">
              {headerDescription}
            </p>
          </header>

          {/* Step content card */}
          <div className="mx-auto w-full max-w-4xl">
            <div className="rounded-lg border bg-card p-4 sm:p-6 lg:p-8 shadow-sm">
              {currentStep === 1 && renderMoodSelection()}
              {currentStep === 2 && renderResults()}
            </div>
          </div>
          {/* Controls */}
          <div className="flex items-center justify-end">
            <Button
              onClick={goNext}
              disabled={isNextDisabled}
              className="min-w-[100px]"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}