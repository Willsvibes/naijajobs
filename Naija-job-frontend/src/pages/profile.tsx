import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import useToastMessage from "../Hooks/useToastMesage";
import { PageLoader } from "../Ui/pageLoader";
import { useAuthStore } from "../store/useAuthStore";
import { ProfileForm } from "./profile/ProfileForm";
import { ProfileHero } from "./profile/ProfileHero";
import type { ProfileData, ProfileFormState } from "./profile/types";

const emptyForm: ProfileFormState = {
  name: "",
  skills: [],
  companyName: "",
  bio: "",
};

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const { toastSuccess, toastError } = useToastMessage();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [form, setForm] = useState<ProfileFormState>(emptyForm);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get<ProfileData>("/profile");
        const data = res.data;
        setProfileData(data);
        setForm({
          name: data.name || "",
          skills: data.skills || [],
          companyName: data.companyName || "",
          bio: data.bio || "",
        });
      } catch {
        toastError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [toastError]);

  const handleSubmit = async () => {
    try {
      setSaving(true);
      const res = await api.put<ProfileData>("/profile", form);
      setProfileData(res.data);
      if (res.data.name !== user?.name) {
        updateUser({ name: res.data.name });
      }
      setSaved(true);
      toastSuccess("Profile updated!");
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      toastError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <PageLoader label="Loading profile" fullScreen={false} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {profileData && <ProfileHero profileData={profileData} />}
        {profileData && (
          <ProfileForm
            profileData={profileData}
            form={form}
            skillInput={skillInput}
            saving={saving}
            saved={saved}
            onFormChange={setForm}
            onSkillInputChange={setSkillInput}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
