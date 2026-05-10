"use client";

import { Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");
    if (employeeId === "4939" && password === "4939") {
      setLoading(true);
      setTimeout(() => {
        router.push("./chat?id=we-sales-#2752tg36-ei#&7PdI9");
      }, 600);
    } else {
      setError("كود الموظف أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col bg-[#ffffff] text-[#191c1f] relative overflow-hidden font-[Cairo]"
    >
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#f8f9fd]">
        <h1 className="text-lg font-bold text-[#49225b]">WE AI Assistant</h1>
        <div className="flex items-center gap-6 text-[#655a70]">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <GlobalOutlined />
            <span>العربية</span>
          </div>
          <QuestionCircleOutlined className="cursor-pointer hover:opacity-80" />
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-[440px] animate-fade-in">
          {/* BRAND */}
          <div className="text-center mb-8">
            <div className="flex justify-center flex-col items-center gap-0 mb-2">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="overflow-hidden relative"
              >
                <div className="relative flex items-center justify-center mb-5">
                  <div className="relative z-10 w-[110px] h-[110px] bg-transparent rounded-2xl overflow-hidden animate-pulse">
                    <img
                      src="/Gen-4TurboSlowsubtlerotationpulsingglow2216139408-ezgif.com-video-to-webp-converter.webp"
                      alt="We Logo"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>
              <h1 className="text-3xl font-bold text-[#7f3aa1]">سيلزاوي</h1>
            </div>
            <p className="text-[#655a70] font-medium">Sales@we</p>
          </div>

          {/* CARD */}
          <div className="bg-white rounded-lg shadow-[0px_8px_24px_rgba(25,28,31,0.06)] p-8 border border-gray-200">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">تسجيل الدخول</h2>
              <p className="text-[#655a70] text-sm">
                أهلاً بك في منصة المبيعات الذكية التابعة لشركة WE.
              </p>
            </div>

            <div className="space-y-6">
              {/* EMPLOYEE ID */}
              <div>
                <label className="block text-xs font-bold text-[#655a70] mb-2">
                  كود الموظف / Employee ID
                </label>
                <Input
                  size="large"
                  placeholder="مثال: 102345"
                  prefix={<UserOutlined />}
                  className="!rounded-lg !py-2"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  onPressEnter={handleLogin}
                  autoComplete="off"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-[#655a70]">
                    كلمة المرور / Password
                  </label>
                  <span className="text-[11px] font-bold text-[#7f3aa1] cursor-pointer hover:underline">
                    نسيت كلمة المرور؟
                  </span>
                </div>
                <Input.Password
                  size="large"
                  placeholder="أدخل كلمة المرور الخاصة بك"
                  prefix={<LockOutlined />}
                  className="!rounded-lg !py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onPressEnter={handleLogin}
                  autoComplete="off"
                />
              </div>

              {/* ERROR */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    color: "#c0392b",
                    fontSize: 13,
                    fontWeight: 600,
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  ❌ {error}
                </motion.p>
              )}

              {/* BUTTON */}
              <Button
                type="primary"
                size="large"
                icon={<FaArrowRightToBracket />}
                loading={loading}
                onClick={handleLogin}
                className="w-full ant-btn !h-[52px] !rounded-lg !font-bold flex flex-row-reverse justify-center items-center gap-2"
                style={{
                  background: "linear-gradient(to left, #7f3aa1, #b7001d)",
                  border: "none",
                }}
              >
                دخول إلى المنصة
              </Button>
            </div>

            {/* DIVIDER */}
            <div className="mt-8 pt-6 border-t flex flex-col items-center gap-4">
              <p className="text-sm text-[#655a70]">ليس لديك صلاحية وصول؟</p>
              <button className="text-sm font-bold text-[#7f3aa1] border border-[#7f3aa1]/20 px-6 py-2 rounded-full hover:bg-[#7f3aa1]/5 transition">
                طلب تصريح دخول
              </button>
            </div>
          </div>

          {/* INFO BOX */}
          <div className="mt-8 flex gap-4 items-start p-4 bg-purple-100 rounded-lg border border-purple-200">
            <InfoCircleOutlined className="text-[#7f3aa1] mt-1" />
            <p className="text-xs text-[#4d4358] leading-relaxed">
              هذا النظام محمي بواسطة{" "}
              <strong>Ethereal Intelligence Division</strong>. يتم مراقبة جميع
              عمليات الدخول لضمان أمن البيانات والخصوصية.
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-xs text-[#655a70] flex justify-center gap-6 py-6">
        <span className="cursor-pointer hover:text-[#7f3aa1]">
          Privacy Policy
        </span>
        <span className="cursor-pointer hover:text-[#7f3aa1]">
          Terms of Service
        </span>
        <span className="cursor-pointer hover:text-[#7f3aa1]">Security</span>
      </footer>

      {/* BACKGROUND */}
      <div className="fixed top-1/4 -left-20 w-64 h-64 bg-purple-300/10 rounded-full blur-[100px]" />
      <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-pink-300/10 rounded-full blur-[120px]" />
    </div>
  );
}
