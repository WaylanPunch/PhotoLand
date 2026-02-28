import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("discover", "routes/discover.tsx"),
  route("editor-picks", "routes/editor-picks.tsx"),
  route("upload", "routes/upload.tsx"),
  route("profile", "routes/profile.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx")
] satisfies RouteConfig;
