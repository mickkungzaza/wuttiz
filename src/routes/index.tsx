import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import photo1 from "@/assets/photo1.jpg";
import photo2 from "@/assets/photo2.jpg";
import photo3 from "@/assets/photo3.jpg";
import photo4 from "@/assets/photo4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "สุขสันต์วันเกิดพี่มิว" },
      { name: "description", content: "หนังสือพิมพ์ฉบับพิเศษ สุขสันต์วันเกิดพี่มิว" },
    ],
  }),
  component: Index,
});

type Article = {
  id: number;
  img: string;
  headline: string;
  kicker: string;
  message: string;
  special?: boolean;
};

const articles: Article[] = [
  {
    id: 1,
    img: photo1,
    kicker: "ข่าวเด่นประจำวัน",
    headline: "สุขสันต์วันเกิดนะพี่มิว",
    message:
      "วันนี้เป็นวันพิเศษที่สุดของปี ขอให้พี่มิวมีความสุขมากๆ ยิ้มได้ทุกวัน เป็นวันเกิดที่อบอุ่นและน่าจดจำที่สุดเลยนะ ❤️",
  },
  {
    id: 2,
    img: photo2,
    kicker: "เศรษฐกิจ & การงาน",
    headline: "ขอให้การงานเติบโต ได้เงินเยอะๆนะะะ",
    message:
      "ขอให้หน้าที่การงานของพี่มิวรุ่งเรือง ก้าวหน้า ได้รับโอกาสดีๆ เงินทองไหลมาเทมา ทำอะไรก็สำเร็จ ร่ำรวยมั่งมีตลอดปีเลยน้า 💰✨",
  },
  {
    id: 3,
    img: photo3,
    kicker: "สุขภาพ & ครอบครัว",
    headline: "พ่อแม่มิคขอให้เป็นปีที่ดีของพี่มิว",
    message:
      "ขอให้ปีนี้เป็นปีที่ดีที่สุดของพี่มิว สุขภาพแข็งแรง ไม่เจ็บไม่ป่วย ปากไม่อักเสบบ่อยๆ กินอะไรก็อร่อย นอนหลับสบาย มีแรงทำสิ่งที่รักทุกวัน 🌿",
  },
  {
    id: 4,
    img: photo4,
    kicker: "ข่าวจากครอบครัว",
    headline: "ข้อความพิเศษจากครอบครัว",
    message: "ครอบครัวย้อยสนิทรักพี่มิวนะะะะ 💖",
    special: true,
  },
];

function Index() {
  const [active, setActive] = useState<Article | null>(null);
  const [burst, setBurst] = useState(false);

  const open = (a: Article) => {
    setActive(a);
    if (a.special) {
      setBurst(false);
      setTimeout(() => setBurst(true), 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4ecd8] text-[#1a1a1a] font-serif">
      {/* Masthead */}
      <header className="border-b-4 border-double border-black px-6 pt-8 pb-4 max-w-6xl mx-auto">
        <div className="flex justify-between text-xs uppercase tracking-widest mb-2">
          <span>Vol. MMXXVI</span>
          <span>ฉบับพิเศษ · วันเกิดพี่มิว</span>
          <span>ราคา: รอยยิ้มหนึ่งดวง</span>
        </div>
        <h1 className="text-center text-6xl md:text-8xl font-black tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          The Mew Times
        </h1>
        <p className="text-center italic mt-2 text-sm">
          “หนังสือพิมพ์ฉบับเดียวที่รายงานข่าวดีให้พี่มิวเท่านั้น”
        </p>
      </header>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((a) => (
          <motion.article
            key={a.id}
            whileHover={{ y: -4 }}
            className="border border-black/30 bg-[#fbf6e7] p-5 cursor-pointer shadow-[4px_4px_0_rgba(0,0,0,0.15)]"
            onClick={() => open(a)}
          >
            <p className="text-xs uppercase tracking-widest text-red-700 font-bold mb-2">
              {a.kicker}
            </p>
            <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {a.headline}
            </h2>
            <div className="overflow-hidden border border-black/40 mb-3 grayscale hover:grayscale-0 transition duration-500">
              <img src={a.img} alt={a.headline} className="w-full h-64 object-cover" />
            </div>
            <p className="text-sm italic text-black/70">
              คลิกที่ภาพเพื่ออ่านบทความเต็ม →
            </p>
          </motion.article>
        ))}
      </main>

      <footer className="border-t-4 border-double border-black mt-8 py-6 text-center text-xs uppercase tracking-widest max-w-6xl mx-auto">
        จัดพิมพ์ด้วยความรัก · ครอบครัวย้อยสนิท
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-[#fbf6e7] max-w-2xl w-full p-8 border-4 border-double border-black relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-4 text-2xl font-bold hover:text-red-700"
              >
                ×
              </button>
              <p className="text-xs uppercase tracking-widest text-red-700 font-bold">
                {active.kicker}
              </p>
              <h2 className="text-3xl md:text-4xl font-black leading-tight my-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {active.headline}
              </h2>
              <img src={active.img} alt={active.headline} className="w-full max-h-80 object-cover border border-black/40 my-4" />

              {active.special ? (
                <div className="relative text-center py-8">
                  <AnimatePresence>
                    {burst && (
                      <motion.div
                        key="burst"
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: [0, 1.3, 1], rotate: [0, 5, -3, 0] }}
                        transition={{ duration: 0.9 }}
                        className="text-3xl md:text-5xl font-black text-red-700"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        💖 ครอบครัวย้อยสนิทรักพี่มิวนะะะะ 💖
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {burst &&
                    Array.from({ length: 18 }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                        animate={{
                          x: (Math.random() - 0.5) * 500,
                          y: (Math.random() - 0.5) * 400,
                          opacity: 0,
                          scale: 1.4,
                          rotate: Math.random() * 360,
                        }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                        className="absolute left-1/2 top-1/2 text-3xl pointer-events-none"
                      >
                        {["❤️", "💖", "✨", "🎉", "🎂"][i % 5]}
                      </motion.span>
                    ))}
                </div>
              ) : (
                <p className="text-lg leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                  {active.message}
                </p>
              )}

              <div className="mt-6 pt-4 border-t border-black/30 text-xs uppercase tracking-widest text-black/60 text-center">
                — รายงานโดย ทีมข่าวครอบครัวย้อยสนิท —
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
