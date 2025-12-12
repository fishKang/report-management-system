import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

import { authClient } from "~/server/better-auth/client";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setMessage(null);
    try {
      // emailAndPassword is enabled in server config; use username as email
      // @ts-ignore - client typings may vary depending on package version
      await authClient.signUp.emailAndPassword({ email: username, password, name: username });
      setMessage("注册成功，请尝试登录。");
    } catch (err: any) {
      setMessage(err?.message ?? "注册失败");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage(null);
    try {
      // @ts-ignore
      await authClient.signIn.emailAndPassword({ email: username, password });
      setMessage("登录成功，正在跳转...");
      router.push("/dashboard");
    } catch (err: any) {
      setMessage(err?.message ?? "登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>登录</title>
      </Head>

      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-md bg-white p-8 shadow">
          <div className="mb-6 text-center">
            <div className="text-4xl font-black">LOGO</div>
            <div className="mt-2 text-sm text-gray-500">请使用用户名和密码登录或注册</div>
          </div>

          <label className="mb-2 block text-sm font-medium text-gray-700">用户名</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="用户名（也可使用邮箱）"
            className="mb-4 w-full rounded border px-3 py-2"
          />

          <label className="mb-2 block text-sm font-medium text-gray-700">密码</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="密码"
            className="mb-6 w-full rounded border px-3 py-2"
          />

          {message && <div className="mb-4 text-center text-sm text-red-600">{message}</div>}

          <div className="flex gap-3">
            <button
              onClick={handleRegister}
              disabled={loading}
              className="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:opacity-95 disabled:opacity-60"
            >
              注册
            </button>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="flex-1 rounded border px-4 py-2 hover:bg-gray-100 disabled:opacity-60"
            >
              登录
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
