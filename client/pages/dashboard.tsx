import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../services/api";
import Navbar from "../components/Navbar";
import {
  Job,
  LoginResponse,
  JobResponse,
  FeedbackResponse,
  RecommendationResponse,
} from "../types";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Job[]>([]);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [resume, setResumeText] = useState<string>("");
  const [resumeError, setResumeError] = useState<string>("");
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Job>>({
    title: "",
    company: "",
    status: "Applied",
    appliedDate: "",
    notes: "",
  });

  useEffect(() => {
    const checkTokenAndFetchJobs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        await router.push("/login");
        return;
      }
      fetchJobs();
    };
    checkTokenAndFetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get<JobResponse>("/jobs");
      setJobs(res.data.data as Job[]);
    } catch (error) {}
  };
  const fetchRecommendations = async () => {
    try {
      const res = await api.get<RecommendationResponse>(
        "/jobs/recommendations"
      );
      setRecommendations(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchJobs();
    fetchRecommendations();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingJobId) {
        await api.put(`/jobs/${editingJobId}`, form);
        toast.success("Job updated successfully");
      } else {
        await api.post("/jobs", form);
        toast.success("Job added successfully");
      }
      setEditingJobId(null);
      setForm({
        title: "",
        company: "",
        status: "Applied",
        appliedDate: "",
        notes: "",
      });
      fetchJobs();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleEdit = async (job: Job) => {
    setForm(job);
    setEditingJobId(job.id);
  };
  const handleDelete = async (id: number) => {
    await api.delete(`/jobs/${id}`);
    fetchJobs();
  };
  const handleFeedback = async () => {
    if (!resume.trim()) {
      setResumeError("Resume text is required");
      return;
    }

    try {
      const res = await api.post<FeedbackResponse>("/resume/feedback", {
        resume,
      });
      setFeedback(res.data.data);
      setResumeError("");
    } catch (err) {
      setResumeError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 flex-col sm:flex-row">
        <h2 className="text-2xl font-bold mb-4">Your Job Applications</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2"
          >
            <option>Applied</option>
            <option>Interview Scheduled</option>
            <option>Offer Received</option>
            <option>Rejected</option>
          </select>
          <input
            type="date"
            name="appliedDate"
            value={form.appliedDate}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="border p-2"
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white p-2"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : editingJobId
              ? "Update Job"
              : "Add Job"}
          </button>
        </form>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{job.title}</h3>
                <p>{job.company}</p>
                <p>Status: {job.status}</p>
              </div>
              <button
                onClick={() => handleDelete(job.id)}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(job)}
                className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h3 className="font-bold mb-2">AI Resume Feedback</h3>

          <textarea
            value={resume}
            onChange={(e) => setResumeText(e.target.value)}
            className="border p-2 w-full"
            placeholder="Paste your resume text here..."
          ></textarea>

          {resumeError && <p className="text-red-600 mt-1">{resumeError}</p>}

          <button
            onClick={handleFeedback}
            className="bg-blue-600 text-white p-2 mt-2"
          >
            Get Feedback
          </button>

          <ul className="list-disc ml-5 mt-3">
            {feedback.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-10">
          <h3 className="font-bold mb-2">Job Recommendations</h3>
          <div className="space-y-2">
            {recommendations.map((job, index) => (
              <div key={index} className="border p-2">
                <p className="font-bold">{job.title}</p>
                <p>{job.company}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
