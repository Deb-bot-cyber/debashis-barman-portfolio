import { readDb } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Debashis Barman - Design & Automation Insights",
  description:
    "Read articles on SaaS product design, AI automation, n8n workflows, and building scalable design systems by Debashis Barman.",
};

export const dynamic = "force-dynamic";

export default function BlogListingPage() {
  const db = readDb();
  const blogs = db.blogs || [];

  return (
    <main className="min-h-screen bg-[#f8fcf3] font-sans">
      {/* Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 pb-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif italic text-2xl sm:text-3xl font-normal tracking-tight text-[#111111] hover:opacity-80 transition-opacity select-none"
        >
          Debashis Barman
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors tracking-wide uppercase"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Hero Header */}
      <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 pt-16 pb-12 text-center">
        <span className="font-serif italic text-lg sm:text-xl text-slate-500 font-medium tracking-tight">
          / Editorial Insights
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] mt-2 select-none">
          Blog & Articles
        </h1>
        <p className="text-base text-slate-600 mt-4 max-w-xl mx-auto leading-relaxed">
          Thoughts on product design, AI automation workflows, and building
          digital experiences that scale.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 pb-24">
        {blogs.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-sm">
            No articles published yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group bg-white border border-black/5 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                {/* Cover Image */}
                <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                  <Image
                    src={blog.image || "/project_fintech.png"}
                    alt={blog.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {blog.date}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-2 group-hover:text-lime-700 transition-colors leading-snug">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="mt-4 text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors flex items-center gap-1.5">
                    <span>Read Article</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
