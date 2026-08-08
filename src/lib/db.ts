import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/data/db.json");

export interface BrandLogo {
  id: string;
  name: string;
  icon: string;
}

export interface WorkImage {
  id: string;
  src: string;
  alt: string;
}

export interface WorksImages {
  column1: WorkImage[];
  column2: WorkImage[];
  column3: WorkImage[];
}

export interface SelectedWork {
  id: string;
  title: string;
  category1: string;
  category2: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  slug: string;
}

export interface DatabaseSchema {
  brandLogos: BrandLogo[];
  worksImages: WorksImages;
  selectedWorks: SelectedWork[];
  testimonials: Testimonial[];
  blogs: Blog[];
}

// Fallback/Default data in case file read fails
const DEFAULT_DATA: DatabaseSchema = {
  brandLogos: [],
  worksImages: { column1: [], column2: [], column3: [] },
  selectedWorks: [],
  testimonials: [],
  blogs: []
};

export function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      // Ensure folder exists
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DATA, null, 2), "utf8");
      return DEFAULT_DATA;
    }
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to read database file:", error);
    return DEFAULT_DATA;
  }
}

export function writeDb(data: DatabaseSchema): boolean {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Failed to write to database file:", error);
    return false;
  }
}
