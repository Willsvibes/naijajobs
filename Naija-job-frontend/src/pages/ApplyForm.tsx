import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Check, ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import api from "../api/axiosInstance";
import { MAX_IMAGE_UPLOADS, uploadImageToCloudinary } from "../api/cloudinaryUpload";

const inputClass =
  "w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition placeholder-slate-600 text-sm";

const ApplicationForm = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState("");
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    if (portfolioImages.length + files.length > MAX_IMAGE_UPLOADS) {
      toast.error(`You can upload up to ${MAX_IMAGE_UPLOADS} images.`);
      event.target.value = "";
      return;
    }

    try {
      setUploadingImages(true);
      const uploadedUrls = await Promise.all(files.map(uploadImageToCloudinary));
      setPortfolioImages((prev) => [...prev, ...uploadedUrls].filter(Boolean));
      setErrors((prev) => ({ ...prev, portfolioImages: "" }));
      toast.success("Images uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload images");
    } finally {
      setUploadingImages(false);
      event.target.value = "";
    }
  };

  const removeImageField = (index: number) => {
    setPortfolioImages((prev) => prev.filter((_, imageIndex) => imageIndex !== index));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    const cleanImages = portfolioImages.map((image) => image.trim()).filter(Boolean);

    if (!proposal.trim()) {
      nextErrors.proposal = "Tell the employer how you will handle this service.";
    }

    if (cleanImages.length === 0) {
      nextErrors.portfolioImages = "Upload at least one image from your previous work.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    if (!jobId) {
      toast.error("Invalid job. Please try again.");
      return;
    }

    try {
      setLoading(true);
      await api.post(`/applications/${jobId}`, {
        proposal,
        portfolioImages: portfolioImages.map((image) => image.trim()).filter(Boolean),
      });

      toast.success("Offer sent successfully!");
      navigate("/dashboard");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to send offer";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="bg-amber-500 p-8">
            <h1 className="text-3xl font-black text-black">Send Service Offer</h1>
            <p className="text-black/70 text-sm font-medium mt-1">
              Share how you will solve the job and show proof from previous work.
            </p>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Service Proposal *
              </label>
              <textarea
                value={proposal}
                onChange={(event) => {
                  setProposal(event.target.value);
                  setErrors((prev) => ({ ...prev, proposal: "" }));
                }}
                rows={7}
                className={`${inputClass} resize-none`}
                placeholder="Explain your approach, timeline, tools, and anything the employer should know."
              />
              {errors.proposal && <p className="text-red-400 text-sm mt-2">{errors.proposal}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <label className="block text-sm font-semibold text-slate-300">
                  Previous Work Images *
                </label>
                <label
                  className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  {uploadingImages ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
                  {uploadingImages ? "Uploading..." : "Upload images"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploadingImages || loading}
                    className="hidden"
                  />
                </label>
              </div>

              {errors.portfolioImages && (
                <p className="text-red-400 text-sm mt-2">{errors.portfolioImages}</p>
              )}

              <p className="text-slate-500 text-xs mt-2">
                Up to {MAX_IMAGE_UPLOADS} images. Each image must be 5MB or less.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {portfolioImages
                  .map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800"
                    >
                      <img
                        src={image}
                        alt={`Previous work ${index + 1}`}
                        className="h-28 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-slate-950/80 text-slate-200 hover:text-red-300 flex items-center justify-center"
                        aria-label="Remove image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-xl transition active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : "Send Offer"}
              {!loading && <Check size={20} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
