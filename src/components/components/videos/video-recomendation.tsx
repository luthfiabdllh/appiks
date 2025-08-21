"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  Filter,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { VideoCard } from "@/components/ui/video-card";
import { useRouter } from "next/navigation";

const categories = [
  {
    name: "Mindfulness",
    color: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
    count: 2,
  },
  {
    name: "Stress Relief",
    color:
      "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200",
    count: 1,
  },
  {
    name: "Sleep",
    color: "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200",
    count: 1,
  },
  {
    name: "Anxiety",
    color: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
    count: 1,
  },
  {
    name: "Meditation",
    color:
      "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
    count: 1,
  },
];

// Updated videos with YouTube data
const videos = [
  {
    id: 1,
    title: "Belajar Mindfulness dalam 3 Menit",
    description:
      "Teknik sederhana untuk hadir di momen sekarang agar pikiran lebih tenang dan fokus pada kehidupan sehari-hari.",
    youtubeId: "ZToicYcHIOU", // Example YouTube video ID
    tags: [
      "Belajar",
      "Relax",
      "Mindfulness",
      "Meditasi",
      "Ketenangan",
      "Fokus",
      "Kesehatan Mental",
    ],
    category: "Mindfulness",
    duration: "3:24",
  },
  {
    id: 2,
    title: "Mengatasi Stres Harian",
    description:
      "Cara efektif mengelola stres dalam kehidupan sehari-hari dengan teknik pernapasan yang mudah dipraktikkan.",
    youtubeId: "inpok4MKVLM", // Example YouTube video ID
    tags: ["Stres", "Relax", "Breathing"],
    category: "Stress Relief",
    duration: "5:12",
  },
  {
    id: 3,
    title: "Tidur Nyenyak dengan Meditasi",
    description:
      "Panduan meditasi untuk membantu Anda mendapatkan tidur yang berkualitas dan bangun dengan segar.",
    youtubeId: "aEqlQvczMJQ", // Example YouTube video ID
    tags: ["Tidur", "Meditasi", "Night"],
    category: "Sleep",
    duration: "8:45",
  },
  {
    id: 4,
    title: "Mengelola Kecemasan",
    description:
      "Teknik praktis untuk mengurangi kecemasan dan meningkatkan ketenangan pikiran dalam situasi stres.",
    youtubeId: "1ZYbU82GVz4", // Example YouTube video ID
    tags: ["Kecemasan", "Tenang", "Relief"],
    category: "Anxiety",
    duration: "6:30",
  },
  {
    id: 5,
    title: "Meditasi untuk Pemula",
    description:
      "Langkah mudah memulai praktik meditasi untuk kesehatan mental yang lebih baik dan kehidupan yang seimbang.",
    youtubeId: "inpok4MKVLM", // Example YouTube video ID
    tags: ["Meditasi", "Pemula", "Guide"],
    category: "Meditation",
    duration: "10:15",
  },
  {
    id: 6,
    title: "Mindful Breathing",
    description:
      "Teknik pernapasan sadar untuk meningkatkan fokus dan mengurangi stres dalam aktivitas sehari-hari.",
    youtubeId: "ZToicYcHIOU", // Example YouTube video ID
    tags: ["Pernapasan", "Fokus", "Mindful"],
    category: "Mindfulness",
    duration: "4:18",
  },
];

export function VideoRecommendations() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  // Filtered videos based on category only
  const filteredVideos = useMemo(() => {
    if (selectedCategory) {
      return videos.filter((video) => video.category === selectedCategory);
    }
    return videos;
  }, [selectedCategory]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(
      selectedCategory === categoryName ? null : categoryName
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  const hasActiveFilters = !!selectedCategory;

  const handleVideoPlay = (videoId: number) => {
    const video = videos.find((v) => v.id === videoId);
    if (video?.youtubeId) {
      // Navigate to video player page or open YouTube
      router.push(`/video-player/${video.youtubeId}`);
      // Alternative: Open in new tab
      // window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="p-0 h-auto text-gray-600 hover:text-gray-900 hover:bg-transparent group"
            onClick={handleGoToDashboard}
          >
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
            Ke Halaman Dashboard
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Video Rekomendasi
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Pilihan Video untuk Menemani Perjalananmu
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row mb-2 gap-4 items-start sm:items-center justify-between ">
            {/* Filter Info */}
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Filter Video
              </h3>
            </div>

            {/* Controls */}
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </Button>
          </div>
          <div className="mb-4">
            {hasActiveFilters && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {selectedCategory}
              </Badge>
            )}
          </div>

          {/* Filter Section */}
          {showFilters && (
            <div className="border-t border-gray-100 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Kategori
                  </span>
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-gray-500 hover:text-gray-700 text-xs flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Filter
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant="outline"
                    size="sm"
                    className={`transition-all duration-200 hover:scale-105 ${
                      selectedCategory === category.name
                        ? `${category.color} ring-2 ring-offset-1 ring-current border-current`
                        : `${category.color} border-current`
                    }`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <span>{category.name}</span>
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-white/80 text-current h-5 px-1.5 text-xs"
                    >
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            Menampilkan {filteredVideos.length} dari {videos.length} video
            {hasActiveFilters && (
              <span className="ml-1 text-blue-600 font-medium">
                (kategori: {selectedCategory})
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
          {/* Video Grid */}
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlay={handleVideoPlay}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tidak ada video ditemukan
                </h3>
                <p className="text-gray-600 mb-6">
                  Coba pilih kategori yang berbeda atau reset filter.
                </p>
                <Button variant="outline" onClick={clearAllFilters}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Filter
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
