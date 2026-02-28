import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-900 text-white min-h-screen">
        <Navbar />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-white">PhotoLand</div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white hover:text-blue-400 transition-colors">首页</Link>
          <Link to="/discover" className="text-gray-400 hover:text-blue-400 transition-colors">发现</Link>
          <Link to="/upload" className="text-gray-400 hover:text-blue-400 transition-colors">上传</Link>
          <Link to="/profile" className="text-gray-400 hover:text-blue-400 transition-colors">我的</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索作品" 
              className="bg-gray-800 border border-gray-700 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm transition-colors inline-block">
            登录
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">PhotoLand</h3>
            <p className="text-gray-400 text-sm">摄影作品分享平台</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">关于我们</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-blue-400">平台介绍</a></li>
              <li><a href="#" className="hover:text-blue-400">联系我们</a></li>
              <li><a href="#" className="hover:text-blue-400">加入我们</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">帮助中心</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-blue-400">使用指南</a></li>
              <li><a href="#" className="hover:text-blue-400">常见问题</a></li>
              <li><a href="#" className="hover:text-blue-400">隐私政策</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">关注我们</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400"><i className="fab fa-weixin text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-blue-400"><i className="fab fa-weibo text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-blue-400"><i className="fab fa-instagram text-xl"></i></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© 2026 PhotoLand. All rights reserved.</p>
          <p className="mt-2">创作者: @WaylanPunch</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
