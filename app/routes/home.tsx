import type { Route } from "./+types/home";
import { motion } from "framer-motion";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PhotoLand - 摄影作品分享平台" },
    { name: "description", content: "发现优质摄影作品，分享你的创作" },
  ];
}

// 模拟数据
const works = [
  {
    id: 1,
    title: "城市夜景",
    author: "摄影师A",
    type: "image",
    url: "https://picsum.photos/800/1200",
    likes: 1234,
    views: 12345,
    aspectRatio: "portrait",
    editorPick: true
  },
  {
    id: 2,
    title: "自然风景",
    author: "摄影师B",
    type: "image",
    url: "https://picsum.photos/1200/800",
    likes: 987,
    views: 9876,
    aspectRatio: "landscape",
    editorPick: true
  },
  {
    id: 3,
    title: "人像摄影",
    author: "摄影师C",
    type: "image",
    url: "https://picsum.photos/800/800",
    likes: 2345,
    views: 23456,
    aspectRatio: "square",
    editorPick: false
  },
  {
    id: 4,
    title: "街拍瞬间",
    author: "摄影师D",
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 1567,
    views: 15678,
    aspectRatio: "landscape",
    editorPick: true
  },
  {
    id: 5,
    title: "美食摄影",
    author: "摄影师E",
    type: "image",
    url: "https://picsum.photos/600/900",
    likes: 876,
    views: 8765,
    aspectRatio: "portrait",
    editorPick: false
  },
  {
    id: 6,
    title: "建筑摄影",
    author: "摄影师F",
    type: "image",
    url: "https://picsum.photos/1000/600",
    likes: 1123,
    views: 11234,
    aspectRatio: "landscape",
    editorPick: true
  },
  {
    id: 7,
    title: "旅行记录",
    author: "摄影师G",
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 1890,
    views: 18901,
    aspectRatio: "portrait",
    editorPick: false
  },
  {
    id: 8,
    title: "静物摄影",
    author: "摄影师H",
    type: "image",
    url: "https://picsum.photos/700/700",
    likes: 765,
    views: 7654,
    aspectRatio: "square",
    editorPick: false
  },
];

// 过滤出编辑精选的作品
const editorPicks = works.filter(work => work.editorPick);

function WorkCard({ work }: { work: typeof works[0] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-lg bg-gray-800"
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
        {work.editorPick && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
            编辑精选
          </div>
        )}
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* 顶部横幅 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-96 mb-12 rounded-xl overflow-hidden"
        >
          <img 
            src="https://picsum.photos/1920/1080" 
            alt="摄影作品展示" 
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">发现精彩摄影作品</h1>
            <p className="text-xl text-gray-200 mb-8">分享你的创作，连接全球摄影师</p>
            <Link to="/discover" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors w-fit inline-block">
              开始探索
            </Link>
          </div>
        </motion.div>

        {/* 编辑精选 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">编辑精选</h2>
            <Link to="/editor-picks" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
              查看全部 <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {editorPicks.map(work => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </div>

        {/* 作品网格 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">推荐作品</h2>
            <a href="/discover" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
              查看全部 <i className="fas fa-arrow-right text-xs"></i>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {works.map(work => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </div>

        {/* 热门摄影师 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">热门摄影师</h2>
            <Link to="/editor-picks" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
              查看全部 <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {['摄影师A', '摄影师B', '摄影师C', '摄影师D', '摄影师E', '摄影师F'].map((photographer, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                  <img 
                    src={`https://picsum.photos/200/200?random=${index}`} 
                    alt={photographer} 
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white text-sm font-medium">{photographer}</p>
                <p className="text-gray-400 text-xs mt-1">作品 {Math.floor(Math.random() * 100) + 10}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
