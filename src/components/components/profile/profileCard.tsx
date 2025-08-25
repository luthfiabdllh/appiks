"use client";

import { useState } from "react";
import { Edit2, GraduationCap, Building, CalendarIcon, Eye, EyeOff, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  avatar?: string;
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

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
      const formattedDate = date.toISOString().split("T")[0];
      handleInputChange("tanggalLahir", formattedDate);
      setDatePickerOpen(false);
    }
  };

  const validatePassword = () => {
    if (newPassword.length < 8) {
      setPasswordError("Kata sandi harus terdiri dari minimal 8 karakter.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi kata sandi tidak cocok.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordChange = () => {
    if (validatePassword()) {
      // Handle password change logic here
      console.log("Password changed successfully");
      setPasswordDialogOpen(false);
      resetPasswordForm();
    }
  };

  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handlePasswordDialogClose = () => {
    setPasswordDialogOpen(false);
    resetPasswordForm();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
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

            <div className="flex-1 justify-center sm:justify-start text-center sm:text-left">
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
                        ? new Date(editData.tanggalLahir).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "Pilih tanggal lahir"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={
                        editData.tanggalLahir
                          ? new Date(editData.tanggalLahir)
                          : undefined
                      }
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
                  value={new Date(profileData.tanggalLahir).toLocaleDateString(
                    "id-ID",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
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

          {/* Change Password Section */}
          <div className="flex mt-8">
            <div className="flex flex-col space-y-3">
              <span className="text-xl font-semibold">Kata Sandi</span>
              <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Ubah</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader className="text-center pb-4">
                    <DialogTitle className="text-2xl font-bold text-gray-800">
                      Ubah Password
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Current Password */}
                    <div className="space-y-2">
                      <Label className="text-base font-medium text-gray-700">
                        Kata Sandi Saat Ini
                      </Label>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Masukkan kata sandi Anda sekarang"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                      <Label className="text-base font-medium text-gray-700">
                        Kata Sandi Baru
                      </Label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            if (passwordError) validatePassword();
                          }}
                          placeholder="123"
                          className={`pr-10 ${
                            passwordError && newPassword.length < 8
                              ? "border-red-300 bg-red-50"
                              : ""
                          }`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      {passwordError && newPassword.length < 8 && (
                        <p className="text-sm text-red-500 flex items-center">
                          <span className="mr-1">⚠</span>
                          {passwordError}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label className="text-base font-medium text-gray-700">
                        Konfirmasi Kata Sandi Baru
                      </Label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (passwordError) validatePassword();
                          }}
                          placeholder="Konfirmasi kata sandi baru"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePasswordDialogClose}
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Batal
                    </Button>
                    <Button
                      type="button"
                      onClick={handlePasswordChange}
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                      disabled={!currentPassword || !newPassword || !confirmPassword}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Simpan
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export { ProfilePage };