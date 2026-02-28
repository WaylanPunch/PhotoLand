import { motion } from "framer-motion";
import { useState } from "react";
import type { Route } from "./+types/upload";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "上传作品 - PhotoLand" },
    { name: "description", content: "上传你的摄影作品到PhotoLand" },
  ];
}

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("1"); // 默认选择城市夜景
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const categories = [
    { id: "1", name: "城市夜景" },
    { id: "2", name: "自然风景" },
    { id: "3", name: "人像摄影" },
    { id: "4", name: "街拍瞬间" },
    { id: "5", name: "美食摄影" },
    { id: "6", name: "建筑摄影" },
    { id: "7", name: "旅行记录" },
    { id: "8", name: "静物摄影" }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    // 模拟上传过程
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);
      // 重置表单
      setTimeout(() => {
        setUploadSuccess(false);
        setSelectedFile(null);
        setTitle("");
        setDescription("");
        setCategory("1");
      }, 2000);
    }, 2000);
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
          <h1 className="text-4xl font-bold text-white mb-4">上传作品</h1>
          <p className="text-gray-400">分享你的摄影作品，与全球摄影师交流</p>
        </motion.div>

        {/* 上传表单 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-8"
        >
          {uploadSuccess ? (
            <div className="text-center py-12">
              <div className="text-green-500 text-4xl mb-4">
                <i className="fas fa-check-circle"></i>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">上传成功！</h2>
              <p className="text-gray-400">你的作品已经成功上传到PhotoLand</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* 文件上传 */}
              <div className="mb-8">
                <label className="block text-gray-300 font-medium mb-2">选择文件</label>
                <div className={`border-2 border-dashed rounded-lg p-8 text-center ${selectedFile ? 'border-blue-500' : 'border-gray-700'}`}>
                  <input 
                    type="file" 
                    accept="image/*,video/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-gray-400 mb-2">
                      <i className="fas fa-cloud-upload-alt text-4xl mb-4"></i>
                      <p>{selectedFile ? selectedFile.name : '点击或拖拽文件到此处上传'}</p>
                      <p className="text-sm mt-2">支持图片和视频文件</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* 作品标题 */}
              <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-2">作品标题</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入作品标题"
                  required
                />
              </div>

              {/* 作品描述 */}
              <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-2">作品描述</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入作品描述"
                  rows={4}
                />
              </div>

              {/* 作品分类 */}
              <div className="mb-8">
                <label className="block text-gray-300 font-medium mb-2">作品分类</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* 提交按钮 */}
              <div className="flex justify-center">
                <button 
                  type="submit" 
                  disabled={uploading || !selectedFile}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      上传中...
                    </>
                  ) : (
                    "上传作品"
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
