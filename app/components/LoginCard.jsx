"use client";
import { Button, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
export default function LoginCard() {
  return (
    <div className="w-full max-w-[420px] animate-fade-in">
      {/* Brand */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-2">
          <div className="h-10 w-10 flex items-center justify-center bg-purple-600 rounded-lg shadow-sm text-white">
            🤖
          </div>
          <h1 className="text-2xl font-bold text-purple-700">لبيب</h1>
        </div>

        <p className="text-gray-500 font-medium">Sales@we</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-xl font-bold">تسجيل الدخول</h2>
          <p className="text-sm text-gray-500">
            أهلاً بك في منصة المبيعات الذكية
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            size="large"
            placeholder="Employee ID"
            prefix={<UserOutlined />}
          />

          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
          />

          <Button
            type="primary"
            size="large"
            className="w-full !h-[48px] !font-bold"
            style={{
              background: "linear-gradient(135deg,#8b5cf6,#ec4899)",
              border: "none",
            }}
          >
            دخول إلى المنصة
          </Button>
        </div>

        {/* Footer inside card */}
        <div className="mt-6 text-center text-sm text-gray-500">
          ليس لديك صلاحية؟{" "}
          <span className="text-purple-600 font-bold cursor-pointer">
            طلب تصريح
          </span>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-purple-100 rounded-lg text-sm text-purple-800">
        ⚠️ هذا النظام محمي ويتم مراقبة جميع العمليات
      </div>
    </div>
  );
}
