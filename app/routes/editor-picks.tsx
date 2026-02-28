import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Route } from "./+types/editor-picks";
import Modal from "../components/Modal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "编辑精选 - PhotoLand" },
    { name: "description", content: "查看PhotoLand编辑精选的摄影作品" },
  ];
}

// 模拟编辑精选数据
const generateEditorPicks = (count: number) => {
  const works = [];
  for (let i = 1; i <= count; i++) {
    works.push({
      id: i,
      title: `编辑精选 ${i}`,
      author: `摄影师${String.fromCharCode(64 + (i % 26) + 1)}`,
      type: Math.random() > 0.7 ? "video" : "image",
      url: Math.random() > 0.7 
        ? "https://www.w3schools.com/html/mov_bbb.mp4"
        : `https://picsum.photos/800/1200?random=${i}`,
      likes: Math.floor(Math.random() * 5000) + 100,
      views: Math.floor(Math.random() * 50000) + 1000,
      aspectRatio: Math.random() > 0.6 ? "portrait" : Math.random() > 0.5 ? "landscape" : "square",
      editorPick: true,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  // 按时间倒序排序
  return works.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

function WorkCard({ work }: { work: ReturnType<typeof generateEditorPicks>[0] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-lg bg-gray-800 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className={`relative ${work.aspectRatio === 'portrait' ? 'aspect-[3/4]' : work.aspectRatio === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'}`}>
          {work.type === 'image' ? (
            <img 
              src={work.url} 
              alt={work.title} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="relative w-full h-full">
              <video 
                src={work.url} 
                poster={work.url.replace('.mp4', '.jpg')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <i className="fas fa-play-circle text-4xl text-white"></i>
              </div>
            </div>
          )}
          {/* 编辑精选标签 */}
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
            编辑精选
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white font-semibold text-lg">{work.title}</h3>
            <p className="text-gray-300 text-sm mt-1">{work.author}</p>
            <div className="flex items-center gap-4 mt-2 text-gray-300 text-sm">
              <span className="flex items-center gap-1">
                <i className="fas fa-heart"></i>
                {work.likes}
              </span>
              <span className="flex items-center gap-1">
                <i className="fas fa-eye"></i>
                {work.views}
              </span>
              <span className="flex items-center gap-1">
                <i className="fas fa-clock"></i>
                {new Date(work.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 预览模态框 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={
          <div className="max-w-4xl max-h-[90vh] overflow-hidden">
            {work.type === 'image' ? (
              <img 
                src={work.url} 
                alt={work.title} 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            ) : (
              <video 
                src={work.url} 
                className="w-full h-auto max-h-[80vh] object-contain"
                controls
                autoPlay
              />
            )}
            <div className="mt-4 text-white">
              <h3 className="text-2xl font-bold">{work.title}</h3>
              <p className="text-gray-300 mt-1">{work.author}</p>
              <div className="flex items-center gap-4 mt-2 text-gray-300">
                <span className="flex items-center gap-1">
                  <i className="fas fa-heart"></i>
                  {work.likes}
                </span>
                <span className="flex items-center gap-1">
                  <i className="fas fa-eye"></i>
                  {work.views}
                </span>
                <span className="flex items-center gap-1">
                  <i className="fas fa-clock"></i>
                  {new Date(work.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}

export default function EditorPicks() {
  const [works, setWorks] = useState<ReturnType<typeof generateEditorPicks>>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 初始加载数据
  useEffect(() => {
    loadInitialData();
  }, []);

  // 监听滚动，实现无限加载
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading, works]);

  const loadInitialData = () => {
    setLoading(true);
    // 模拟网络请求延迟
    setTimeout(() => {
      setWorks(generateEditorPicks(12));
      setLoading(false);
    }, 500);
  };

  const loadMore = () => {
    setLoading(true);
    // 模拟网络请求延迟
    setTimeout(() => {
      const newWorks = generateEditorPicks(12);
      setWorks(prevWorks => [...prevWorks, ...newWorks]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    }, 500);
  };

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* 页面标题 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">编辑精选</h1>
          <p className="text-gray-400">发现由PhotoLand编辑精心挑选的优质摄影作品</p>
        </motion.div>

        {/* 作品网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          <AnimatePresence>
            {works.map(work => (
              <WorkCard key={work.id} work={work} />
            ))}
          </AnimatePresence>
        </div>

        {/* 加载更多 */}
        <div ref={loadMoreRef} className="flex justify-center mb-12">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                加载中...
              </>
            ) : (
              "查看更多"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
