import { readDb } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const db = readDb();
  const blog = db.blogs.find((b) => b.slug === slug);

  if (!blog) {
    return { title: "Post Not Found | Debashis Barman" };
  }

  return {
    title: `${blog.title} | Debashis Barman Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
      type: "article",
      publishedTime: blog.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const db = readDb();
  const blog = db.blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Simple markdown-like rendering: convert ### headers and \n\n to paragraphs
  const renderContent = (raw: string) => {
    const blocks = raw.split("\n\n");
    return blocks.map((block, i) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={i}
            className="text-xl font-bold text-slate-900 mt-8 mb-3 tracking-tight"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="text-2xl font-bold text-slate-900 mt-10 mb-4 tracking-tight"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      // Handle numbered lists
      if (/^\d+\./.test(trimmed)) {
        const items = trimmed.split("\n").filter(Boolean);
        return (
          <ol key={i} className="list-decimal list-inside space-y-2 my-4">
            {items.map((item, j) => (
              <li
                key={j}
                className="text-base text-slate-700 leading-relaxed"
              >
                {item.replace(/^\d+\.\s*/, "")}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <p
          key={i}
          className="text-base text-slate-700 leading-relaxed mb-4"
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-[#f8fcf3] font-sans">
      {/* Navigation */}
      <header className="w-full max-w-5xl mx-auto px-6 sm:px-10 pt-6 pb-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif italic text-2xl sm:text-3xl font-normal tracking-tight text-[#111111] hover:opacity-80 transition-opacity select-none"
        >
          Debashis Barman
        </Link>
        <Link
          href="/blog"
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors tracking-wide uppercase"
        >
          ← All Articles
        </Link>
      </header>

      {/* Article Header */}
      <section className="w-full max-w-3xl mx-auto px-6 sm:px-10 pt-12 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {blog.date}
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] mt-3 leading-tight">
          {blog.title}
        </h1>
        <p className="text-base text-slate-600 mt-4 leading-relaxed max-w-2xl">
          {blog.excerpt}
        </p>

        {/* Author attribution */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-black/5">
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-lime-200 border border-black/5">
            <Image
              src="/debashis_barman_heroimage.png"
              alt="Debashis Barman"
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Debashis Barman
            </p>
            <p className="text-[11px] text-slate-500">
              Product Designer & AI Automation Consultant
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="w-full max-w-4xl mx-auto px-6 sm:px-10 py-8">
        <div className="relative w-full aspect-[16/9] rounded-[24px] overflow-hidden bg-slate-100 border border-black/5 shadow-md">
          <Image
            src={blog.image || "/project_fintech.png"}
            alt={blog.title}
            fill
            className="object-cover object-top"
          />
        </div>
      </section>

      {/* Article Body */}
      <article className="w-full max-w-3xl mx-auto px-6 sm:px-10 pb-24">
        <div className="prose prose-slate max-w-none">
          {renderContent(blog.content)}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-sm text-slate-600">
            Enjoyed this article? Let&apos;s work together.
          </p>
          <a
            href="https://cal.com/debashis-barman-182"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg transition-all"
          >
            <span>Book a Call</span>
            <span>→</span>
          </a>
        </div>
      </article>
    </main>
  );
}
