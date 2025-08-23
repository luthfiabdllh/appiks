"use client";

import { useState } from "react";
import { Edit2, GraduationCap, Building, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileData {
  fullName: string;
  email: string;
  nisn: string;
  kelas: string;
  alamat: string;
  namaSekolah: string;
  noTelp: string;
  tanggalLahir: string;
  jenisKelamin: string;
  agama: string;
  namaWali: string;
  noTelpWali: string;
  avatar?: string;
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Marsha Bilqis Nasywaa",
    email: "marsha.bilqis@student.sch.id",
    nisn: "123456",
    kelas: "Kelas XI IPA 6",
    alamat: "Jl. Pandega Bhakti No 28",
    namaSekolah: "SMA Negeri 01 Yogyakarta",
    noTelp: "088123456",
    tanggalLahir: "2006-05-15",
    jenisKelamin: "Perempuan",
    agama: "Islam",
    namaWali: "Ahmad Nasywaa",
    noTelpWali: "081234567890",
    avatar: "/avatar-placeholder.jpg",
  });

  const [editData, setEditData] = useState<ProfileData>(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      handleInputChange("tanggalLahir", formattedDate);
      setDatePickerOpen(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Profil Saya</h1>
        <p className="text-muted-foreground">Kelola informasi pribadi mu</p>
      </div>

      {/* Profile Card */}
      <Card className="relative p-0">
        <CardHeader className="pb-4 p-0">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={profileData.avatar}
                alt={profileData.fullName}
              />
              <AvatarFallback className="text-lg bg-blue-500 text-white">
                {getInitials(profileData.fullName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {profileData.fullName}
              </h2>
              <p className="text-gray-600 mb-1">{profileData.email}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  <span>{profileData.kelas}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>{profileData.namaSekolah}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Nama Lengkap - Non-editable */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Nama Lengkap
              </Label>
              <Input
                value={profileData.fullName}
                disabled
                className="bg-gray-50 text-gray-600"
              />
            </div>

            {/* Kelas - Editable */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Kelas</Label>
              {isEditing ? (
                <Select
                  value={editData.kelas}
                  onValueChange={(value) => handleInputChange("kelas", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Kelasmu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kelas X IPA 1">Kelas X IPA 1</SelectItem>
                    <SelectItem value="Kelas X IPA 2">Kelas X IPA 2</SelectItem>
                    <SelectItem value="Kelas XI IPA 1">
                      Kelas XI IPA 1
                    </SelectItem>
                    <SelectItem value="Kelas XI IPA 2">
                      Kelas XI IPA 2
                    </SelectItem>
                    <SelectItem value="Kelas XI IPA 6">
                      Kelas XI IPA 6
                    </SelectItem>
                    <SelectItem value="Kelas XII IPA 1">
                      Kelas XII IPA 1
                    </SelectItem>
                    <SelectItem value="Kelas XII IPA 2">
                      Kelas XII IPA 2
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={profileData.kelas}
                  disabled
                  className="bg-gray-50 text-gray-600"
                />
              )}
            </div>

            {/* Alamat - Editable */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Alamat
              </Label>
              {isEditing ? (
                <Input
                  value={editData.alamat}
                  onChange={(e) => handleInputChange("alamat", e.target.value)}
                  placeholder="Masukkan alamat lengkap"
                />
              ) : (
                <Input
                  value={profileData.alamat}
                  disabled
                  className="bg-gray-50 text-gray-600"
                />
              )}
            </div>

            {/* Email - Non-editable */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                value={profileData.email}
                disabled
                className="bg-gray-50 text-gray-600"
              />
            </div>

            {/* Nama Sekolah - Editable */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Nama Sekolah
              </Label>
              {isEditing ? (
                <Input
                  value={editData.namaSekolah}
                  onChange={(e) =>
                    handleInputChange("namaSekolah", e.target.value)
                  }
                  placeholder="Masukkan nama sekolah"
                />
              ) : (
                <Input
                  value={profileData.namaSekolah}
                  disabled
                  className="bg-gray-50 text-gray-600"
                />
              )}
            </div>

            {/* No Telp - Editable */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                No Telp
              </Label>
              {isEditing ? (
                <Input
                  value={editData.noTelp}
                  onChange={(e) => handleInputChange("noTelp", e.target.value)}
                  placeholder="Masukkan nomor telepon"
                  type="tel"
                />
              ) : (
                <Input
                  value={profileData.noTelp}
                  disabled
                  className="bg-gray-50 text-gray-600"
                />
              )}
            </div>

            {/* NISN - Non-editable */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">NISN</Label>
              <Input
                value={profileData.nisn}
                disabled
                className="bg-gray-50 text-gray-600"
              />
            </div>

            {/* Tanggal Lahir - Editable with Calendar Popover */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Tanggal Lahir
              </Label>
              {isEditing ? (
                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between font-normal pl-3 text-left"
                    >
                      {editData.tanggalLahir 
                        ? new Date(editData.tanggalLahir).toLocaleDateString("id-ID", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : "Pilih tanggal lahir"
                      }
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={editData.tanggalLahir ? new Date(editData.tanggalLahir) : undefined}
                      onSelect={handleDateSelect}
                      captionLayout="dropdown"
                      fromYear={1990}
                      toYear={2010}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1990-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <Input
                  value={new Date(profileData.tanggalLahir).toLocaleDateString("id-ID", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  disabled
                  className="bg-gray-50 text-gray-600"
                />
              )}
            </div>

            {/* Jenis Kelamin - Editable */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Jenis Kelamin
              </Label>
              {isEditing ? (
                <Select
                  value={editData.jenisKelamin}
                  onValueChange={(value) =>
                    handleInputChange("jenisKelamin", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={profileData.jenisKelamin}
                  disabled
                  className="bg-gray-50 text-gray-600"
                />
              )}
            </div>

            {/* Agama - Editable */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Agama</Label>
              {isEditing ? (
                <Select
                  value={editData.agama}
                  onValueChange={(value) => handleInputChange("agama", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih agama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Kristen">Kristen</SelectItem>
                    <SelectItem value="Katolik">Katolik</SelectItem>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Buddha">Buddha</SelectItem>
                    <SelectItem value="Konghucu">Konghucu</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={profileData.agama}
                  disabled
                  className="bg-gray-50 text-gray-600"
                />
              )}
            </div>

            {/* Nama Wali - Editable */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Nama Wali
              </Label>
              {isEditing ? (
                <Input
                  value={editData.namaWali}
                  onChange={(e) =>
                    handleInputChange("namaWali", e.target.value)
                  }
                  placeholder="Masukkan nama wali"
                />
              ) : (
                <Input
                  value={profileData.namaWali}
                  disabled
                  className="bg-gray-50 text-gray-600"
                />
              )}
            </div>

            {/* No Telp Wali - Editable */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                No Telp Wali
              </Label>
              {isEditing ? (
                <Input
                  value={editData.noTelpWali}
                  onChange={(e) =>
                    handleInputChange("noTelpWali", e.target.value)
                  }
                  placeholder="Masukkan nomor telepon wali"
                  type="tel"
                />
              ) : (
                <Input
                  value={profileData.noTelpWali}
                  disabled
                  className="bg-gray-50 text-gray-600"
                />
              )}
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end mt-8">
            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profil
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button onClick={handleCancel} variant="outline">
                  Batal
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Simpan
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ProfilePage };