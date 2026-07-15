import photo1 from "../assets/photo-1.jpg";
import photo2 from "../assets/photo-2.jpg";
import photo3 from "../assets/photo-3.jpg";
import photo4 from "../assets/photo-4.jpg";
import photo5 from "../assets/photo-5.jpg";
import photo6 from "../assets/photo-6.jpg";

export type PhotoEntry = {
  id: string;
  src: string;
  title: string;
  location: string;
  year: string;
};

export type StoryEntry = PhotoEntry & {
  story: string;
};

export const singles: PhotoEntry[] = [
  {
    id: "single-1",
    src: photo3,
    title: "Quiet Portrait",
    location: "Campus, CUET",
    year: "2025",
  },
  {
    id: "single-2",
    src: photo4,
    title: "Night Signals",
    location: "GEC Circle",
    year: "2025",
  },
  {
    id: "single-3",
    src: photo5,
    title: "Texture Study",
    location: "Lab Bench",
    year: "2024",
  },
];

export const stories: StoryEntry[] = [
  {
    id: "story-1",
    src: photo1,
    title: "Golden Hour",
    location: "Chattogram",
    year: "2026",
    story: "Late light around campus edges and still roads.",
  },
  {
    id: "story-2",
    src: photo2,
    title: "City Lines",
    location: "Agrabad",
    year: "2025",
    story: "Street layers, motion, and geometry in traffic corridors.",
  },
  {
    id: "story-3",
    src: photo6,
    title: "Morning Mist",
    location: "Foy's Lake",
    year: "2024",
    story: "Soft contrast and quiet air before the city wakes.",
  },
];
