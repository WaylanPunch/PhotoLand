import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "个人中心 - PhotoLand" },
    { name: "description", content: "查看你的个人信息和上传的作品" },
  ];
}

// 模拟用户数据
const userData = {
  id: 1,
  name: "摄影师张三",
  avatar: "https://picsum.photos/200/200?random=1",
  bio: "热爱摄影，专注于城市夜景和街拍瞬间",
  followers: 1234,
  following: 567,
  joined: "2024-01-01",
  location: "北京"
};

// 模拟用户作品数据
const userWorks = [
  {
    id: 1,
    title: "城市夜景 1",
    type: "image",
    url: "https://picsum.photos/800/1200?random=10",
    likes: 123,
    views: 4567,
    createdAt: "2024-02-20"
  },
  {
    id: 2,
    title: "街拍瞬间 1",
    type: "image",
    url: "https://picsum.photos/800/1200?random=11",
    likes: 98,
    views: 2345,
    createdAt: "2024-02-18"
  },
  {
    id: 3,
    title: "城市夜景 2",
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 234,
    views: 5678,
    createdAt: "2024-02-15"
  },
  {
    id: 4,
    title: "街拍瞬间 2",
    type: "image",
    url: "https://picsum.photos/800/1200?random=12",
    likes: 156,
    views: 3456,
    createdAt: "2024-02-10"
  },
  {
    id: 5,
    title: "城市夜景 3",
    type: "image",
    url: "https://picsum.photos/800/1200?random=13",
    likes: 89,
    views: 1234,
    createdAt: "2024-02-05"
  },
  {
    id: 6,
    title: "街拍瞬间 3",
    type: "image",
    url: "https://picsum.photos/800/1200?random=14",
    likes: 178,
    views: 2890,
    createdAt: "2024-01-28"
  }
];

function WorkCard({ work }: { work: typeof userWorks[0] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-lg bg-gray-800"
    >
      <div className="aspect-square relative">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-semibold text-lg">{work.title}</h3>
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

export default function Profile() {
  const [activeTab, setActiveTab] = useState('works'); // works, collections, likes

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* 用户信息 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600">
              <img 
                src={userData.avatar} 
                alt={userData.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{userData.name}</h1>
            <p className="text-gray-400 mb-4">{userData.bio}</p>
            <div className="flex gap-6 mb-4">
              <div>
                <span className="text-white font-semibold">{userData.followers}</span>
                <span className="text-gray-400 ml-1">粉丝</span>
              </div>
              <div>
                <span className="text-white font-semibold">{userData.following}</span>
                <span className="text-gray-400 ml-1">关注</span>
              </div>
              <div>
                <span className="text-white font-semibold">{userWorks.length}</span>
                <span className="text-gray-400 ml-1">作品</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-gray-400">
                <i className="fas fa-map-marker-alt"></i>
                <span>{userData.location}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <i className="fas fa-calendar-alt"></i>
                <span>加入于 {userData.joined}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 标签页 */}
        <div className="border-b border-gray-700 mb-8">
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab('works')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === 'works' ? 'border-blue-600 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              作品
            </button>
            <button 
              onClick={() => setActiveTab('collections')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === 'collections' ? 'border-blue-600 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              收藏
            </button>
            <button 
              onClick={() => setActiveTab('likes')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === 'likes' ? 'border-blue-600 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              喜欢
            </button>
          </div>
        </div>

        {/* 标签页内容 */}
        <AnimatePresence mode="wait">
          {activeTab === 'works' && (
            <motion.div 
              key="works"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userWorks.map(work => (
                  <WorkCard key={work.id} work={work} />
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'collections' && (
            <motion.div 
              key="collections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <i className="fas fa-bookmark text-4xl text-gray-600 mb-4"></i>
              <h3 className="text-xl font-semibold text-white mb-2">暂无收藏</h3>
              <p className="text-gray-400">浏览作品时点击收藏按钮添加到收藏夹</p>
            </motion.div>
          )}
          
          {activeTab === 'likes' && (
            <motion.div 
              key="likes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <i className="fas fa-heart text-4xl text-gray-600 mb-4"></i>
              <h3 className="text-xl font-semibold text-white mb-2">暂无喜欢</h3>
              <p className="text-gray-400">浏览作品时点击喜欢按钮添加到喜欢列表</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
