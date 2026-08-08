"use client";

import { useState, useEffect } from "react";
import { 
  Lock, LayoutDashboard, Plus, Trash2, Edit3, Upload, 
  LogOut, Globe, FileText, CheckCircle2, MessageSquare, 
  Layers, Settings, ExternalLink, Image as ImageIcon, ArrowRight
} from "lucide-react";
import Image from "next/image";

// Types matching db schema
interface BrandLogo {
  id: string;
  name: string;
  icon?: string;
  image?: string;
}

interface WorkImage {
  id: string;
  src: string;
  alt: string;
}

interface WorksImages {
  column1: WorkImage[];
  column2: WorkImage[];
  column3: WorkImage[];
}

interface SelectedWork {
  id: string;
  title: string;
  category1: string;
  category2: string;
  image: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  slug: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "works" | "logos" | "testimonials" | "blogs" | "bento">("overview");
  
  // Data States
  const [brandLogos, setBrandLogos] = useState<BrandLogo[]>([]);
  const [worksImages, setWorksImages] = useState<WorksImages>({ column1: [], column2: [], column3: [] });
  const [selectedWorks, setSelectedWorks] = useState<SelectedWork[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  
  // UI states
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  
  // Form modal states
  const [showModal, setShowModal] = useState<string | null>(null); // "works" | "logos" | "testimonials" | "blogs" | "bento"
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form inputs
  const [workForm, setWorkForm] = useState({ title: "", category1: "", category2: "", image: "" });
  const [logoForm, setLogoForm] = useState({ name: "", icon: "▲", image: "" });
  const [testimonialForm, setTestimonialForm] = useState({ quote: "", author: "", role: "", avatar: "" });
  const [blogForm, setBlogForm] = useState({ title: "", excerpt: "", content: "", image: "", date: "", slug: "" });
  const [bentoForm, setBentoForm] = useState({ column: "column1" as keyof WorksImages, src: "", alt: "" });
  
  // Upload state
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const triggerToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (res.ok) {
        setIsAuthenticated(true);
        fetchDbData();
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const fetchDbData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/db");
      if (res.ok) {
        const data = await res.json();
        setBrandLogos(data.brandLogos || []);
        setWorksImages(data.worksImages || { column1: [], column2: [], column3: [] });
        setSelectedWorks(data.selectedWorks || []);
        setTestimonials(data.testimonials || []);
        setBlogs(data.blogs || []);
      } else {
        triggerToast("Failed to fetch database content", "error");
      }
    } catch (err) {
      triggerToast("Error fetching database", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchDbData();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Invalid password");
      }
    } catch (err) {
      setLoginError("Failed to connect to authentication API");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      triggerToast("Logged out successfully");
    } catch (err) {
      triggerToast("Logout failed", "error");
    }
  };

  // Helper for uploading files
  const handleFileUpload = async (file: File, type: "work" | "testimonial" | "blog" | "bento" | "logo") => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const url = data.url;
        if (type === "work") setWorkForm(prev => ({ ...prev, image: url }));
        else if (type === "testimonial") setTestimonialForm(prev => ({ ...prev, avatar: url }));
        else if (type === "blog") setBlogForm(prev => ({ ...prev, image: url }));
        else if (type === "bento") setBentoForm(prev => ({ ...prev, src: url }));
        else if (type === "logo") setLogoForm(prev => ({ ...prev, image: url }));
        triggerToast("Image uploaded successfully!");
      } else {
        triggerToast("Upload failed", "error");
      }
    } catch (err) {
      triggerToast("Upload failed due to connection error", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // Save DB Changes
  const saveSection = async (action: string, data: any) => {
    setIsActionLoading(true);
    try {
      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, data }),
      });

      if (res.ok) {
        triggerToast("Changes saved successfully!");
        setShowModal(null);
        setEditingId(null);
        // Refresh local data from response
        const resData = await res.json();
        setBrandLogos(resData.db.brandLogos || []);
        setWorksImages(resData.db.worksImages || { column1: [], column2: [], column3: [] });
        setSelectedWorks(resData.db.selectedWorks || []);
        setTestimonials(resData.db.testimonials || []);
        setBlogs(resData.db.blogs || []);
      } else {
        const errData = await res.json();
        triggerToast(errData.error || "Failed to save changes", "error");
      }
    } catch (err) {
      triggerToast("Failed to connect to API", "error");
    } finally {
      setIsActionLoading(false);
    }
  };

  // CRUD handlers
  // -- SELECTED WORKS --
  const handleAddEditWork = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: SelectedWork[];
    if (editingId) {
      updated = selectedWorks.map(w => w.id === editingId ? { ...workForm, id: editingId } : w);
    } else {
      updated = [...selectedWorks, { ...workForm, id: Date.now().toString() }];
    }
    saveSection("updateSelectedWorks", updated);
  };

  const handleDeleteWork = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updated = selectedWorks.filter(w => w.id !== id);
      saveSection("updateSelectedWorks", updated);
    }
  };

  // -- BRAND LOGOS --
  const handleAddEditLogo = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: BrandLogo[];
    if (editingId) {
      updated = brandLogos.map(l => l.id === editingId ? { ...logoForm, id: editingId } : l);
    } else {
      updated = [...brandLogos, { ...logoForm, id: Date.now().toString() }];
    }
    saveSection("updateBrandLogos", updated);
  };

  const handleDeleteLogo = (id: string) => {
    if (confirm("Delete this brand logo?")) {
      const updated = brandLogos.filter(l => l.id !== id);
      saveSection("updateBrandLogos", updated);
    }
  };

  // -- TESTIMONIALS --
  const handleAddEditTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Testimonial[];
    if (editingId) {
      updated = testimonials.map(t => t.id === editingId ? { ...testimonialForm, id: editingId } : t);
    } else {
      updated = [...testimonials, { ...testimonialForm, id: Date.now().toString() }];
    }
    saveSection("updateTestimonials", updated);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm("Delete this testimonial?")) {
      const updated = testimonials.filter(t => t.id !== id);
      saveSection("updateTestimonials", updated);
    }
  };

  // -- BLOGS --
  const handleAddEditBlog = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Blog[];
    // Generate auto slug if empty
    const cleanForm = {
      ...blogForm,
      slug: blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-"),
      date: blogForm.date || new Date().toISOString().split('T')[0]
    };
    if (editingId) {
      updated = blogs.map(b => b.id === editingId ? { ...cleanForm, id: editingId } : b);
    } else {
      updated = [...blogs, { ...cleanForm, id: Date.now().toString() }];
    }
    saveSection("updateBlogs", updated);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Delete this blog post?")) {
      const updated = blogs.filter(b => b.id !== id);
      saveSection("updateBlogs", updated);
    }
  };

  // -- BENTO GRID --
  const handleAddBento = (e: React.FormEvent) => {
    e.preventDefault();
    const targetColumn = bentoForm.column;
    const newItem = { id: Date.now().toString(), src: bentoForm.src, alt: bentoForm.alt || "Bento Showcase" };
    
    const updated = {
      ...worksImages,
      [targetColumn]: [...worksImages[targetColumn], newItem]
    };
    saveSection("updateWorksImages", updated);
  };

  const handleDeleteBento = (column: keyof WorksImages, id: string) => {
    if (confirm("Delete this image from the sliding gallery?")) {
      const updated = {
        ...worksImages,
        [column]: worksImages[column].filter(item => item.id !== id)
      };
      saveSection("updateWorksImages", updated);
    }
  };

  // Render Login state or main dashboard
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#f8fcf3] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4 text-slate-800">
          <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#f8fcf3] flex items-center justify-center font-sans relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] aspect-square rounded-full bg-[#9ef829]/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] aspect-square rounded-full bg-[#9ef829]/10 blur-[120px]" />
        
        <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl border border-black/5 rounded-[32px] p-8 shadow-2xl z-10 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="font-serif italic text-3xl font-normal text-slate-900 tracking-tight">Debashis Barman</h1>
            <p className="text-xs text-gray-500 mt-2 font-sans tracking-wide uppercase">Admin Portal Control</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Access Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-white border border-slate-200 focus:border-[#9ef829] focus:ring-4 focus:ring-[#9ef829]/10 rounded-2xl px-5 py-4 pl-12 text-sm text-slate-900 outline-none transition-all"
                  required
                />
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              {loginError && <p className="text-red-500 text-xs font-medium mt-2 flex items-center gap-1.5">⚠️ {loginError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#111111] hover:bg-black text-white font-medium py-4 px-6 rounded-2xl border border-white/10 shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Authenticate Session</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>
          
          <div className="text-center mt-6">
            <a href="/" className="text-xs text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1">
              ← Return to Portfolio Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fcf3] text-[#111111] font-sans flex flex-col md:flex-row">
      
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md animate-slide-up transition-all ${
          toast.type === "success" 
            ? "bg-slate-900/95 border-emerald-500/20 text-white" 
            : "bg-red-950/95 border-red-500/20 text-red-200"
        }`}>
          <CheckCircle2 className={`w-5 h-5 ${toast.type === "success" ? "text-lime-400" : "text-red-400"}`} />
          <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Sidebar Control Panel */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div>
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="font-serif italic text-2xl tracking-tight leading-none text-lime-400">Debashis</h2>
              <span className="text-[10px] tracking-wider font-semibold text-slate-400 uppercase mt-1 block">Dashboard</span>
            </div>
            <a href="/" target="_blank" className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors" title="Visit Live Site">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "works", label: "Selected Works", icon: Layers },
              { id: "logos", label: "Brand Logos", icon: Globe },
              { id: "testimonials", label: "Testimonials", icon: MessageSquare },
              { id: "blogs", label: "Blog Posts", icon: FileText },
              { id: "bento", label: "Sliding Bento Grid", icon: ImageIcon },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id 
                      ? "bg-lime-400 text-slate-950 font-bold shadow-md" 
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar / Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-red-950 hover:text-red-300 rounded-xl text-xs font-semibold tracking-wide text-slate-300 transition-all border border-slate-700/50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Panel */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-black/5 pb-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{activeTab} management</span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {activeTab === "overview" && "Console Overview"}
              {activeTab === "works" && "Manage Portfolio Works"}
              {activeTab === "logos" && "Client Brand Logos"}
              {activeTab === "testimonials" && "Testimonials & Reviews"}
              {activeTab === "blogs" && "Editorial Blog Posts"}
              {activeTab === "bento" && "Infinite Sliding Bento Grid"}
            </h1>
          </div>

          {activeTab !== "overview" && activeTab !== "bento" && (
            <button
              onClick={() => {
                setEditingId(null);
                setWorkForm({ title: "", category1: "", category2: "", image: "" });
                setLogoForm({ name: "", icon: "▲", image: "" });
                setTestimonialForm({ quote: "", author: "", role: "", avatar: "" });
                setBlogForm({ title: "", excerpt: "", content: "", image: "", date: new Date().toISOString().split('T')[0], slug: "" });
                setShowModal(activeTab);
              }}
              className="bg-[#111111] hover:bg-black text-white hover:scale-[1.02] active:scale-95 text-sm font-semibold px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Item</span>
            </button>
          )}
        </div>

        {/* Content Tabs */}
        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-[#111111] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-gray-500 font-medium">Fetching portfolio assets...</p>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Selected Works", count: selectedWorks.length, desc: "Bespoke projects featured in bento cards", icon: Layers, tab: "works" },
                    { label: "Client Logos", count: brandLogos.length, desc: "Dynamic ticker header brands", icon: Globe, tab: "logos" },
                    { label: "Testimonials", count: testimonials.length, desc: "Verified partner testimonials", icon: MessageSquare, tab: "testimonials" },
                    { label: "Blog Articles", count: blogs.length, desc: "Articles and case studies shared", icon: FileText, tab: "blogs" },
                  ].map(stat => {
                    const Icon = stat.icon;
                    return (
                      <div 
                        key={stat.label} 
                        onClick={() => setActiveTab(stat.tab as any)}
                        className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-3 bg-slate-50 group-hover:bg-lime-100 rounded-2xl transition-colors">
                            <Icon className="w-6 h-6 text-slate-700 group-hover:text-slate-900" />
                          </div>
                          <span className="text-3xl font-bold tracking-tight text-slate-900">{stat.count}</span>
                        </div>
                        <h4 className="font-semibold text-slate-800 text-base">{stat.label}</h4>
                        <p className="text-xs text-gray-500 mt-1">{stat.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Quicklinks */}
                <div className="bg-lime-400/25 border border-[#9ef829]/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">Your site is up and running!</h3>
                    <p className="text-sm text-slate-700 max-w-xl">
                      Upload case studies, brand ticker badges, or draft a new article in real-time. Changes are stored locally in the filesystem database.
                    </p>
                  </div>
                  <a
                    href="/"
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-sm font-semibold px-6 py-3.5 rounded-full shadow-lg transition-all"
                  >
                    <span>View Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {/* SELECTED WORKS TAB */}
            {activeTab === "works" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedWorks.map(work => (
                  <div key={work.id} className="bg-white border border-black/5 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group">
                    <div className="relative w-full aspect-[16/10] bg-slate-100 border-b border-black/5 overflow-hidden">
                      <Image 
                        src={work.image || "/project_fintech.png"} 
                        alt={work.title} 
                        fill 
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 rounded-full text-slate-600 tracking-wide uppercase">{work.category1}</span>
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 rounded-full text-slate-600 tracking-wide uppercase">{work.category2}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">{work.title}</h3>
                      <div className="flex gap-2 justify-end border-t border-slate-50 pt-4">
                        <button
                          onClick={() => {
                            setEditingId(work.id);
                            setWorkForm({ 
                              title: work.title, 
                              category1: work.category1, 
                              category2: work.category2, 
                              image: work.image 
                            });
                            setShowModal("works");
                          }}
                          className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors hover:scale-105 active:scale-95"
                          title="Edit"
                        >
                          <Edit3 className="w-4.5 h-4.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteWork(work.id)}
                          className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors hover:scale-105 active:scale-95"
                          title="Delete"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {selectedWorks.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-gray-500 text-sm">No selected works found. Add one above!</div>
                )}
              </div>
            )}

            {/* BRAND LOGOS TAB */}
            {activeTab === "logos" && (
              <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                        <th className="pb-4 font-semibold">Logo Preview</th>
                        <th className="pb-4 font-semibold">Brand Name</th>
                        <th className="pb-4 font-semibold">Icon Symbol</th>
                        <th className="pb-4 text-right font-semibold">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {brandLogos.map(logo => (
                        <tr key={logo.id} className="hover:bg-slate-50/55 transition-colors">
                          <td className="py-4">
                            {logo.image ? (
                              <div className="relative h-9 w-24 bg-slate-50 border border-slate-200 rounded-lg p-1 flex items-center justify-center">
                                <img src={logo.image} alt={logo.name} className="h-full w-auto object-contain mix-blend-multiply" />
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400 italic">No image file</span>
                            )}
                          </td>
                          <td className="py-4 font-semibold text-slate-800">{logo.name}</td>
                          <td className="py-4 text-slate-700 font-mono text-lg">{logo.icon || "✦"}</td>
                          <td className="py-4 text-right">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => {
                                  setEditingId(logo.id);
                                  setLogoForm({ name: logo.name, icon: logo.icon || "▲", image: logo.image || "" });
                                  setShowModal("logos");
                                }}
                                className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteLogo(logo.id)}
                                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {brandLogos.length === 0 && (
                    <div className="text-center py-12 text-gray-500 text-sm">No client logos found.</div>
                  )}
                </div>
              </div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === "testimonials" && (
              <div className="space-y-6">
                {testimonials.map(testimonial => (
                  <div key={testimonial.id} className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-start gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-100 border border-black/5">
                        <Image src={testimonial.avatar || "/who_am_i_portrait.png"} alt={testimonial.author} fill className="object-cover" unoptimized />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <h4 className="font-semibold text-slate-900">{testimonial.author}</h4>
                          <span className="text-xs text-gray-500">{testimonial.role}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-2 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end md:self-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0">
                      <button
                        onClick={() => {
                          setEditingId(testimonial.id);
                          setTestimonialForm({
                            quote: testimonial.quote,
                            author: testimonial.author,
                            role: testimonial.role,
                            avatar: testimonial.avatar
                          });
                          setShowModal("testimonials");
                        }}
                        className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4.5 h-4.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {testimonials.length === 0 && (
                  <div className="text-center py-12 text-gray-500 text-sm">No testimonials added.</div>
                )}
              </div>
            )}

            {/* BLOGS TAB */}
            {activeTab === "blogs" && (
              <div className="grid grid-cols-1 gap-6">
                {blogs.map(blog => (
                  <div key={blog.id} className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow group">
                    <div className="relative w-full sm:w-48 aspect-video sm:aspect-square bg-slate-100 rounded-2xl overflow-hidden shrink-0 border border-black/5">
                      <Image src={blog.image || "/project_fintech.png"} alt={blog.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{blog.date}</span>
                          <span className="text-[10px] font-semibold text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-md">/{blog.slug}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-lime-700 transition-colors mb-2">{blog.title}</h3>
                        <p className="text-sm text-slate-600 line-clamp-2">{blog.excerpt}</p>
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-4">
                        <a 
                          href={`/blog/${blog.slug}`} 
                          target="_blank" 
                          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
                        >
                          <span>Preview Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingId(blog.id);
                              setBlogForm({
                                title: blog.title,
                                excerpt: blog.excerpt,
                                content: blog.content,
                                image: blog.image,
                                date: blog.date,
                                slug: blog.slug
                              });
                              setShowModal("blogs");
                            }}
                            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {blogs.length === 0 && (
                  <div className="text-center py-12 text-gray-500 text-sm">No blog posts found. Write your first post!</div>
                )}
              </div>
            )}

            {/* SLIDING BENTO GRID TAB */}
            {activeTab === "bento" && (
              <div className="space-y-8">
                {/* Add to sliding grid form */}
                <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-4">Add Card Image to Slider</h3>
                  <form onSubmit={handleAddBento} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Target Column</label>
                      <select
                        value={bentoForm.column}
                        onChange={(e) => setBentoForm(prev => ({ ...prev, column: e.target.value as any }))}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                      >
                        <option value="column1">Column 1 (Scrolls UP)</option>
                        <option value="column2">Column 2 (Scrolls DOWN)</option>
                        <option value="column3">Column 3 (Scrolls UP)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Card Cover Image</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={bentoForm.src}
                          onChange={(e) => setBentoForm(prev => ({ ...prev, src: e.target.value }))}
                          placeholder="Image URL or Upload below"
                          className="flex-1 bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                          required
                        />
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], "bento");
                              }
                            }}
                            className="hidden"
                            id="bento-file-upload"
                            disabled={isUploading}
                          />
                          <label
                            htmlFor="bento-file-upload"
                            className={`p-3 bg-slate-900 text-white rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
                              isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-black"
                            }`}
                          >
                            <Upload className="w-4.5 h-4.5" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isActionLoading}
                        className="w-full bg-[#111111] hover:bg-black text-white text-sm font-semibold py-3 px-5 rounded-xl transition-all shadow-md cursor-pointer"
                      >
                        {isActionLoading ? "Adding..." : "Add to Grid"}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Column Lists */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* COLUMN 1 */}
                  <div className="bg-slate-50/80 border border-black/5 rounded-3xl p-5">
                    <h3 className="font-bold text-slate-800 text-sm mb-4 pb-2 border-b border-slate-200 flex justify-between items-center">
                      <span>Column 1 (Scrolls UP)</span>
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-mono">{worksImages.column1.length} cards</span>
                    </h3>
                    <div className="space-y-4">
                      {worksImages.column1.map(item => (
                        <div key={item.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-slate-200 group">
                          <Image src={item.src} alt={item.alt} fill className="object-cover" unoptimized />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => handleDeleteBento("column1", item.id)}
                              className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors hover:scale-105 active:scale-95 shadow-lg"
                              title="Remove card"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* COLUMN 2 */}
                  <div className="bg-slate-50/80 border border-black/5 rounded-3xl p-5">
                    <h3 className="font-bold text-slate-800 text-sm mb-4 pb-2 border-b border-slate-200 flex justify-between items-center">
                      <span>Column 2 (Scrolls DOWN)</span>
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-mono">{worksImages.column2.length} cards</span>
                    </h3>
                    <div className="space-y-4">
                      {worksImages.column2.map(item => (
                        <div key={item.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-slate-200 group">
                          <Image src={item.src} alt={item.alt} fill className="object-cover" unoptimized />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => handleDeleteBento("column2", item.id)}
                              className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors hover:scale-105 active:scale-95 shadow-lg"
                              title="Remove card"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* COLUMN 3 */}
                  <div className="bg-slate-50/80 border border-black/5 rounded-3xl p-5">
                    <h3 className="font-bold text-slate-800 text-sm mb-4 pb-2 border-b border-slate-200 flex justify-between items-center">
                      <span>Column 3 (Scrolls UP)</span>
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-mono">{worksImages.column3.length} cards</span>
                    </h3>
                    <div className="space-y-4">
                      {worksImages.column3.map(item => (
                        <div key={item.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-slate-200 group">
                          <Image src={item.src} alt={item.alt} fill className="object-cover" unoptimized />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => handleDeleteBento("column3", item.id)}
                              className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors hover:scale-105 active:scale-95 shadow-lg"
                              title="Remove card"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* EDIT/ADD MODAL OVERLAYS */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-black/5 rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-scale-up">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                {editingId ? "Edit" : "Create"} {showModal === "works" ? "Selected Work" : showModal === "logos" ? "Brand Logo" : showModal === "testimonials" ? "Testimonial" : "Blog Post"}
              </h3>
              <button 
                onClick={() => {
                  setShowModal(null);
                  setEditingId(null);
                }} 
                className="text-slate-400 hover:text-slate-800 text-sm font-semibold font-sans transition-colors"
              >
                ✕ Close
              </button>
            </div>

            {/* WORKS FORM */}
            {showModal === "works" && (
              <form onSubmit={handleAddEditWork} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Title</label>
                    <input
                      type="text"
                      value={workForm.title}
                      onChange={(e) => setWorkForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. Havenly Real Estate"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Category 1</label>
                    <input
                      type="text"
                      value={workForm.category1}
                      onChange={(e) => setWorkForm(prev => ({ ...prev, category1: e.target.value }))}
                      placeholder="e.g. Fintech or Web App"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Category 2</label>
                  <input
                    type="text"
                    value={workForm.category2}
                    onChange={(e) => setWorkForm(prev => ({ ...prev, category2: e.target.value }))}
                    placeholder="e.g. UX/UI Design or Product Design"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase font-sans">Project Image Preview</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      value={workForm.image}
                      onChange={(e) => setWorkForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="/project_fintech.png or uploads link"
                      className="flex-1 bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                      required
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], "work");
                          }
                        }}
                        className="hidden"
                        id="work-file-upload"
                        disabled={isUploading}
                      />
                      <label
                        htmlFor="work-file-upload"
                        className={`px-5 py-3.5 bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-2 ${
                          isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-black"
                        }`}
                      >
                        <Upload className="w-4 h-4" />
                        <span>{isUploading ? "Uploading..." : "Upload File"}</span>
                      </label>
                    </div>
                  </div>
                </div>

                {workForm.image && (
                  <div className="relative aspect-[16/10] w-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 mt-2">
                    <Image src={workForm.image} alt="Preview" fill className="object-cover" unoptimized />
                  </div>
                )}

                <div className="border-t border-slate-100 pt-5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(null);
                      setEditingId(null);
                    }}
                    className="px-5 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold tracking-wide text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isActionLoading}
                    className="px-6 py-3 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {isActionLoading ? "Saving Changes..." : "Save Project"}
                  </button>
                </div>
              </form>
            )}

            {/* BRAND LOGO FORM */}
            {showModal === "logos" && (
              <form onSubmit={handleAddEditLogo} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Brand Name</label>
                  <input
                    type="text"
                    value={logoForm.name}
                    onChange={(e) => setLogoForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. messyprogrammer"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Upload Brand Logo Image (PNG / SVG / WEBP)</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      value={logoForm.image}
                      onChange={(e) => setLogoForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="/uploads/logo.png or image URL"
                      className="flex-1 bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], "logo");
                          }
                        }}
                        className="hidden"
                        id="logo-file-upload"
                        disabled={isUploading}
                      />
                      <label
                        htmlFor="logo-file-upload"
                        className={`px-5 py-3.5 bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-2 ${
                          isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-black"
                        }`}
                      >
                        <Upload className="w-4 h-4" />
                        <span>{isUploading ? "Uploading..." : "Upload Logo"}</span>
                      </label>
                    </div>
                  </div>
                  {logoForm.image && (
                    <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                      <img src={logoForm.image} alt="Logo preview" className="h-8 w-auto max-w-[150px] object-contain" />
                      <span className="text-xs text-slate-500 font-mono">Preview</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Fallback Icon Symbol</label>
                  <input
                    type="text"
                    value={logoForm.icon}
                    onChange={(e) => setLogoForm(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="e.g. ▲ or ● or ✦ or ❖"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm font-mono text-lg outline-none"
                  />
                </div>
                <div className="border-t border-slate-100 pt-5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(null);
                      setEditingId(null);
                    }}
                    className="px-5 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold tracking-wide text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isActionLoading}
                    className="px-6 py-3 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {isActionLoading ? "Saving Changes..." : "Save Brand Logo"}
                  </button>
                </div>
              </form>
            )}

            {/* TESTIMONIAL FORM */}
            {showModal === "testimonials" && (
              <form onSubmit={handleAddEditTestimonial} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Author Name</label>
                    <input
                      type="text"
                      value={testimonialForm.author}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="Daniel Reed"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Role Company</label>
                    <input
                      type="text"
                      value={testimonialForm.role}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="Founder of NovaLabs"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Quote Content</label>
                  <textarea
                    value={testimonialForm.quote}
                    onChange={(e) => setTestimonialForm(prev => ({ ...prev, quote: e.target.value }))}
                    placeholder="Describe their experience working with you..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none h-28"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Profile Avatar</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      value={testimonialForm.avatar}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, avatar: e.target.value }))}
                      placeholder="/testimonial_avatar_1.png or uploads link"
                      className="flex-1 bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                      required
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], "testimonial");
                          }
                        }}
                        className="hidden"
                        id="testimonial-file-upload"
                        disabled={isUploading}
                      />
                      <label
                        htmlFor="testimonial-file-upload"
                        className={`px-5 py-3.5 bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-2 ${
                          isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-black"
                        }`}
                      >
                        <Upload className="w-4 h-4" />
                        <span>{isUploading ? "Uploading..." : "Upload File"}</span>
                      </label>
                    </div>
                  </div>
                </div>

                {testimonialForm.avatar && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-slate-200 bg-slate-50 mt-2">
                    <Image src={testimonialForm.avatar} alt="Preview" fill className="object-cover" unoptimized />
                  </div>
                )}

                <div className="border-t border-slate-100 pt-5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(null);
                      setEditingId(null);
                    }}
                    className="px-5 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold tracking-wide text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isActionLoading}
                    className="px-6 py-3 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {isActionLoading ? "Saving Changes..." : "Save Testimonial"}
                  </button>
                </div>
              </form>
            )}

            {/* BLOGS FORM */}
            {showModal === "blogs" && (
              <form onSubmit={handleAddEditBlog} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Title</label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        const newSlug = newTitle.toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-");
                        setBlogForm(prev => ({ ...prev, title: newTitle, slug: editingId ? prev.slug : newSlug }));
                      }}
                      placeholder="e.g. How to scale design systems"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Custom Slug Route</label>
                    <input
                      type="text"
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                      placeholder="how-to-scale-design-systems"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm font-mono outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Date</label>
                    <input
                      type="date"
                      value={blogForm.date}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase font-sans">Featured Image</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={blogForm.image}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="/project_ai_dashboard.png or upload"
                        className="flex-1 bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-3 py-3 text-sm outline-none"
                        required
                      />
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0], "blog");
                            }
                          }}
                          className="hidden"
                          id="blog-file-upload"
                          disabled={isUploading}
                        />
                        <label
                          htmlFor="blog-file-upload"
                          className={`p-3 bg-slate-900 text-white rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
                            isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-black"
                          }`}
                        >
                          <Upload className="w-4 h-4" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {blogForm.image && (
                  <div className="relative aspect-video w-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={blogForm.image} alt="Preview" fill className="object-cover" unoptimized />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase font-sans">Excerpt Description</label>
                  <input
                    type="text"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Short description displayed on card"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase font-sans">Article Body (Supports Markdown)</label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write article details here..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-sm font-sans outline-none h-60"
                    required
                  ></textarea>
                </div>

                <div className="border-t border-slate-100 pt-5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(null);
                      setEditingId(null);
                    }}
                    className="px-5 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold tracking-wide text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isActionLoading}
                    className="px-6 py-3 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {isActionLoading ? "Publishing..." : "Publish Post"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
