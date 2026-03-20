"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Tag, Tooltip, Avatar, Badge, Drawer } from "antd";
import {
  PlusOutlined,
  SendOutlined,
  AudioOutlined,
  PaperClipOutlined,
  SettingOutlined,
  ShareAltOutlined,
  MoreOutlined,
  WifiOutlined,
  PhoneOutlined,
  HomeOutlined,
  SafetyCertificateOutlined,
  InfoCircleOutlined,
  TableOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  MenuOutlined,
  CloseOutlined,
  CopyOutlined,
  CheckOutlined,
  StarOutlined,
  MessageOutlined,
} from "@ant-design/icons";

/* ─── Design tokens ────────────────────────────────────────────────────────── */
const C = {
  primary: "#49225B",
  primaryDark: "#321540",
  primaryGlow: "#49225B40",
  accent: "#C084FC",
  surface: "#faf8fc",
  surfaceLow: "#F3EBF9",
  surfaceLowest: "#ffffff",
  surfaceHigh: "#e8dff0",
  surfaceHighest: "#ddd0ea",
  onSurface: "#1a1020",
  onSurfaceVar: "#5c4d6a",
  outlineVar: "#c9b8d8",
  error: "#c0392b",
  secFixed: "#ecddf8",
  onSecFixed: "#20182b",
  amber50: "#fffbeb",
  amber200: "#fde68a",
  amber700: "#b45309",
  amber900: "#78350f",
  msgUser: "#2d1b45",
  msgBot: "#ffffff",
};

/* ─── Breakpoints ──────────────────────────────────────────────────────────── */
function useBreakpoint() {
  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return {
    isMobile: w < 640,
    isTablet: w >= 640 && w < 1024,
    isDesktop: w >= 1024,
  };
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const DUMMY_RESPONSES = [
  {
    trigger: ["gold", "جولد", "775"],
    type: "package",
    text: "باقة WE Gold 775 هي من أقوى باقاتنا! إليك تفاصيلها الكاملة:",
    package: {
      name: "WE Gold 775",
      price: "775",
      tax: "968",
      features: [
        { icon: "wifi", label: "موبايل إنترنت", value: "30 جيجا" },
        { icon: "phone", label: "دقائق لكل الشبكات", value: "6,000 دقيقة" },
        { icon: "home", label: "إنترنت منزلي", value: "سوبر 250 مجاناً" },
      ],
    },
    tip: "ركز على ميزة الإنترنت المنزلي المجاني — العميل يوفر ~300 جنيه شهرياً.",
  },
  {
    trigger: ["500", "gold 500"],
    type: "package",
    text: "باقة WE Gold 500 مناسبة للعملاء ذوي الاستخدام المتوسط:",
    package: {
      name: "WE Gold 500",
      price: "500",
      tax: "625",
      features: [
        { icon: "wifi", label: "موبايل إنترنت", value: "15 جيجا" },
        { icon: "phone", label: "دقائق لكل الشبكات", value: "3,000 دقيقة" },
        { icon: "home", label: "إنترنت منزلي", value: "سوبر 150 مجاناً" },
      ],
    },
    tip: "مناسب للعملاء الذين يبحثون عن سعر أقل مع مميزات معقولة.",
  },
  {
    trigger: ["1000", "gold 1000", "الف", "ألف"],
    type: "package",
    text: "باقة WE Gold 1000 — الخيار الأمثل للعملاء المميزين:",
    package: {
      name: "WE Gold 1000",
      price: "1,000",
      tax: "1,250",
      features: [
        { icon: "wifi", label: "موبايل إنترنت", value: "60 جيجا" },
        { icon: "phone", label: "دقائق لكل الشبكات", value: "12,000 دقيقة" },
        { icon: "home", label: "إنترنت منزلي", value: "سوبر 500 مجاناً" },
      ],
    },
    tip: "هذه الباقة مثالية للعملاء الذين يستخدمون الإنترنت بكثافة أو يديرون أعمالاً.",
  },
  {
    trigger: ["adsl", "ادسل", "منزلي", "home"],
    type: "text",
    text: "خدمة ADSL المنزلي متاحة بسرعات متعددة:\n\n• سوبر 20 ميجا — 199 جنيه/شهر\n• سوبر 40 ميجا — 299 جنيه/شهر\n• سوبر 100 ميجا — 449 جنيه/شهر\n• سوبر 250 ميجا — 599 جنيه/شهر\n\nجميع الباقات تشمل استخدام غير محدود خلال الليل من 12 ص حتى 8 ص.",
    tip: "اسأل العميل عن عدد أفراد الأسرة واستخدام الستريمينج لتحديد الباقة المناسبة.",
  },
  {
    trigger: ["mnp", "نقل", "شبكة", "تحويل"],
    type: "text",
    text: "خطوات نقل الرقم (MNP) إلى WE:\n\n1️⃣ التحقق من إمكانية النقل عبر *101#\n2️⃣ تقديم الهوية الوطنية والشريحة الحالية\n3️⃣ اختيار الباقة المناسبة\n4️⃣ الانتظار من 24 إلى 72 ساعة لإتمام النقل\n5️⃣ تفعيل الشريحة الجديدة\n\n⚠️ يجب أن يكون الرقم مفعلاً منذ أكثر من 90 يوم.",
    tip: "قدم للعميل عرض ترحيب حصري عند نقل رقمه — شهر مجاني أو جيجا إضافية.",
  },
  {
    trigger: ["شكوى", "مشكلة", "سيئة", "complaint", "بطيء", "انقطع"],
    type: "text",
    text: "فهمت مشكلة العميل. إليك خطوات التعامل مع الشكوى:\n\n✅ استمع جيداً وأظهر التعاطف\n✅ سجّل الشكوى في نظام CRM برقم الحادثة\n✅ أخبر العميل بالوقت المتوقع للحل (24–48 ساعة)\n✅ تابع مع الفريق التقني إن لزم\n✅ اتصل بالعميل بعد الحل للتأكد من رضاه",
    tip: "العميل الغاضب الذي يتم التعامل معه بشكل صحيح يصبح أكثر ولاءً من العميل الراضي أصلاً.",
  },
  {
    trigger: ["مقارنة", "compare", "الفرق", "احسن", "أحسن", "أفضل", "الأفضل"],
    type: "compare",
    text: "إليك مقارنة سريعة بين باقات WE Gold:",
    compare: [
      {
        name: "Gold 500",
        price: "500 EGP",
        internet: "15 جيجا",
        minutes: "3,000 د",
        home: "سوبر 150",
      },
      {
        name: "Gold 775",
        price: "775 EGP",
        internet: "30 جيجا",
        minutes: "6,000 د",
        home: "سوبر 250",
        highlight: true,
      },
      {
        name: "Gold 1000",
        price: "1,000 EGP",
        internet: "60 جيجا",
        minutes: "12,000 د",
        home: "سوبر 500",
      },
    ],
    tip: "Gold 775 هي الأكثر مبيعاً لأنها تقدم أفضل قيمة مقابل السعر.",
  },
];

const FALLBACK = [
  "سؤال ممتاز! يمكنني مساعدتك في الاستفسار عن باقات WE Gold أو ADSL أو إجراءات MNP أو الشكاوى. ما الذي تحتاجه تحديداً؟",
  "فهمت استفسارك. حالياً يمكنني تقديم معلومات عن باقات WE Gold (500 / 775 / 1000) وخدمات ADSL المنزلي وإجراءات نقل الرقم.",
  "شكراً على سؤالك! جرب الكتابة عن: باقات Gold، ADSL المنزلي، نقل الرقم MNP، أو شكاوى العملاء.",
];

const SESSIONS = [
  {
    id: 1,
    title: "مقارنة باقات WE Gold",
    time: "منذ ساعتين",
    tag: "WE Gold",
    active: true,
  },
  {
    id: 2,
    title: "استفسار ADSL منزلي",
    time: "أمس",
    tag: "ADSL",
    active: false,
  },
  {
    id: 3,
    title: "شكوى عميل مميز",
    time: "٢٣ أكتوبر",
    tag: "شكاوى",
    active: false,
  },
];

const CHIPS = [
  "WE Gold 775",
  "مقارنة الباقات",
  "ADSL منزلي",
  "نقل الرقم MNP",
  "شكاوى",
];

const INITIAL_MSGS = [
  {
    id: 1,
    role: "user",
    text: "WE Gold 775 فيها كام جيجا موبايل إنترنت؟",
    time: "2:14 م",
    liked: false,
  },
  {
    id: 2,
    role: "bot",
    response: DUMMY_RESPONSES[0],
    time: "2:14 م",
    liked: false,
  },
];

const SIDE_ACTIONS = [
  { label: "عرض جدول الأسعار", icon: <TableOutlined /> },
  { label: "سكريبت البيع", icon: <FileTextOutlined /> },
  { label: "خطوات التفعيل", icon: <ThunderboltOutlined /> },
];

/* ─── Helpers ──────────────────────────────────────────────────────────────── */
function getResponse(text) {
  const l = text.toLowerCase();
  for (const r of DUMMY_RESPONSES) {
    if (r.trigger.some((t) => l.includes(t))) return r;
  }
  return {
    type: "text",
    text: FALLBACK[Math.floor(Math.random() * FALLBACK.length)],
    tip: null,
  };
}
function nowTime() {
  return new Date().toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ─── Framer variants ──────────────────────────────────────────────────────── */
const msgIn = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Sub-components                                                             */
/* ═══════════════════════════════════════════════════════════════════════════ */

/* ── Animated WE badge ────────────────────────────────────────────────────── */
function WEBadge({ size = 32, glow = false }) {
  return (
    <motion.div
      whileHover={{ rotate: [0, 4, -4, 0] }}
      transition={{ duration: 0.4 }}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: glow ? `0 0 20px ${C.primaryGlow}` : undefined,
      }}
    >
      <span
        style={{
          color: "#fff",
          fontWeight: 900,
          fontSize: size * 0.28,
          letterSpacing: "-0.5px",
        }}
      >
        WE
      </span>
    </motion.div>
  );
}

/* ── Copy button ──────────────────────────────────────────────────────────── */
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={handle}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.onSurfaceVar,
        fontSize: 13,
        padding: 4,
        display: "flex",
        alignItems: "center",
      }}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="ok"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <CheckOutlined style={{ color: "#22c55e" }} />
          </motion.span>
        ) : (
          <motion.span
            key="cp"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <CopyOutlined />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ── Like button ──────────────────────────────────────────────────────────── */
function LikeBtn({ liked, onToggle }) {
  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.85 }}
      onClick={onToggle}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 4,
        display: "flex",
        alignItems: "center",
      }}
    >
      <motion.span
        animate={{
          color: liked ? "#f59e0b" : C.onSurfaceVar,
          scale: liked ? [1, 1.4, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{ fontSize: 13 }}
      >
        <StarOutlined style={{ color: liked ? "#f59e0b" : C.onSurfaceVar }} />
      </motion.span>
    </motion.button>
  );
}

/* ── Package card ─────────────────────────────────────────────────────────── */
function PackageCard({ pkg }) {
  const iconMap = {
    wifi: <WifiOutlined />,
    phone: <PhoneOutlined />,
    home: <HomeOutlined />,
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      style={{
        background: `linear-gradient(145deg,${C.surfaceLow},#ede0f7)`,
        borderRadius: 16,
        padding: 18,
        border: `1px solid ${C.outlineVar}50`,
        marginTop: 14,
        boxShadow: `0 4px 20px ${C.primaryGlow}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 14,
        }}
      >
        <div>
          <p
            style={{
              color: C.primary,
              fontWeight: 800,
              fontSize: 15,
              margin: 0,
            }}
          >
            {pkg.name}
          </p>
          <p
            style={{
              fontSize: 10,
              color: C.onSurfaceVar,
              margin: "3px 0 0",
              fontWeight: 500,
            }}
          >
            سعر الباقة الشهري
          </p>
        </div>
        <div style={{ textAlign: "left" }}>
          <p
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: C.primary,
              margin: 0,
              lineHeight: 1,
            }}
          >
            {pkg.price}
            <span style={{ fontSize: 11, fontWeight: 600, marginRight: 3 }}>
              EGP
            </span>
          </p>
          <p
            style={{
              fontSize: 10,
              color: C.error,
              fontWeight: 700,
              margin: "3px 0 0",
            }}
          >
            {pkg.tax} بعد الضريبة
          </p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {pkg.features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -3, boxShadow: `0 6px 18px ${C.primaryGlow}` }}
            style={{
              gridColumn: i === 2 ? "span 2" : "span 1",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              background: C.surfaceLowest,
              borderRadius: 12,
              border: `1px solid ${C.outlineVar}25`,
              transition: "box-shadow 0.2s",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: `${C.primary}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: C.primary, fontSize: 16 }}>
                {iconMap[f.icon]}
              </span>
            </div>
            <div>
              <p
                style={{
                  fontSize: 10,
                  color: C.onSurfaceVar,
                  margin: 0,
                  marginBottom: 2,
                }}
              >
                {f.label}
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.onSurface,
                  margin: 0,
                }}
              >
                {f.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Compare table ────────────────────────────────────────────────────────── */
function CompareTable({ rows }) {
  const headers = ["الباقة", "السعر", "إنترنت", "الدقائق", "منزلي"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      style={{
        marginTop: 14,
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${C.outlineVar}40`,
        boxShadow: `0 4px 16px ${C.primaryGlow}`,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          background: `linear-gradient(90deg,${C.primary},${C.primaryDark})`,
        }}
      >
        {headers.map((h) => (
          <div
            key={h}
            style={{
              padding: "10px 6px",
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
              textAlign: "center",
            }}
          >
            {h}
          </div>
        ))}
      </div>
      {rows.map((r, i) => (
        <motion.div
          key={i}
          whileHover={{
            background: r.highlight ? `${C.primary}18` : C.surfaceLow,
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            background: r.highlight
              ? `${C.primary}10`
              : i % 2 === 0
                ? C.surfaceLowest
                : "#faf5ff",
            borderTop: `1px solid ${C.outlineVar}25`,
            transition: "background 0.2s",
          }}
        >
          {[r.name, r.price, r.internet, r.minutes, r.home].map((val, j) => (
            <div
              key={j}
              style={{
                padding: "10px 6px",
                fontSize: 11,
                fontWeight: j === 0 || r.highlight ? 700 : 400,
                color: r.highlight && j === 0 ? C.primary : C.onSurface,
                textAlign: "center",
              }}
            >
              {val}
              {r.highlight && j === 0 && (
                <span
                  style={{
                    display: "block",
                    fontSize: 8,
                    color: C.accent,
                    fontWeight: 700,
                    marginTop: 1,
                  }}
                >
                  ★ الأشهر
                </span>
              )}
            </div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── Typing indicator ─────────────────────────────────────────────────────── */
function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{ display: "flex", gap: 10, alignItems: "flex-end" }}
    >
      <WEBadge size={36} />
      <div
        style={{
          background: C.surfaceLowest,
          borderRadius: "18px 18px 18px 4px",
          padding: "12px 18px",
          border: `1px solid ${C.outlineVar}30`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 12, color: C.onSurfaceVar }}>
          لبيب يفكر...
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          {[0, 0.18, 0.36].map((d, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 0.75, delay: d }}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: `linear-gradient(135deg,${C.primary},${C.accent})`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── User message ─────────────────────────────────────────────────────────── */
function UserMessage({ msg, onLike }) {
  return (
    <motion.div
      variants={msgIn}
      initial="hidden"
      animate="visible"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
          maxWidth: "72%",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            background: `linear-gradient(135deg,${C.msgUser},#1a0e2e)`,
            color: "#fff",
            padding: "13px 20px",
            borderRadius: "18px 18px 4px 18px",
            boxShadow: `0 6px 20px ${C.primaryGlow}`,
          }}
        >
          <p style={{ fontSize: 14, lineHeight: 1.75, margin: 0 }}>
            {msg.text}
          </p>
        </motion.div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, color: C.onSurfaceVar }}>
            {msg.time}
          </span>
          <CopyBtn text={msg.text} />
          <LikeBtn liked={msg.liked} onToggle={() => onLike(msg.id)} />
        </div>
      </div>
      <Avatar
        size={36}
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRPrzTrcmJT5eSL12gcspLbWpBbIJzNUWQcyCAzd2NM5dCqAKCm1m-j_sK-PkzC6Ongg5ZbkvA-FqyluYfANza-rebmh_ACY8d5Hs5EBach3uKlSgJE3FJbUZSrjR8O3R03PqY-lAPCmg3zNVRJaOEpV2um252x4bHH-8FRjWsj7Ofn0J6WYE6yVLsohIbVCcOC3F07P1ElizqdOSNZWxmLOYhvU89Ut6vYdI13zbBbuMgumFwM0zOtNjJAxqS5MaXdAEvogQYZaM"
        style={{ border: `2px solid ${C.outlineVar}`, flexShrink: 0 }}
      />
    </motion.div>
  );
}

/* ── Bot message ──────────────────────────────────────────────────────────── */
function BotMessage({ msg, onLike }) {
  const { response: resp } = msg;
  const rawText = resp?.text ?? "";
  return (
    <motion.div
      variants={msgIn}
      initial="hidden"
      animate="visible"
      style={{ display: "flex", gap: 10, alignItems: "flex-end" }}
    >
      <WEBadge size={36} glow />
      <div
        style={{
          maxWidth: "84%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <motion.div
          whileHover={{ boxShadow: `0 8px 28px ${C.primaryGlow}` }}
          transition={{ duration: 0.2 }}
          style={{
            background: C.surfaceLowest,
            borderRight: `4px solid ${C.primary}`,
            padding: "16px 20px",
            borderRadius: "18px 18px 18px 4px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: `1px solid ${C.outlineVar}25`,
          }}
        >
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.85,
              color: C.onSurface,
              margin: 0,
              whiteSpace: "pre-line",
            }}
          >
            {rawText}
          </p>
          {resp?.type === "package" && resp.package && (
            <PackageCard pkg={resp.package} />
          )}
          {resp?.type === "compare" && resp.compare && (
            <CompareTable rows={resp.compare} />
          )}
        </motion.div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingRight: 6,
          }}
        >
          <SafetyCertificateOutlined
            style={{ fontSize: 11, color: C.onSurfaceVar }}
          />
          <span style={{ fontSize: 10, color: C.onSurfaceVar }}>
            تم التحقق • {msg.time}
          </span>
          <div style={{ marginRight: "auto", display: "flex", gap: 4 }}>
            <CopyBtn text={rawText} />
            <LikeBtn liked={msg.liked} onToggle={() => onLike(msg.id)} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Empty state ──────────────────────────────────────────────────────────── */
function EmptyState({ onChip }) {
  const suggestions = [
    "WE Gold 775",
    "مقارنة الباقات",
    "شكاوى",
    "نقل الرقم MNP",
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: 20,
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <WEBadge size={72} glow />
      </motion.div>
      <div>
        <p
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: C.primary,
            margin: "0 0 6px",
          }}
        >
          أهلاً! أنا لبيب
        </p>
        <p style={{ fontSize: 13, color: C.onSurfaceVar, margin: 0 }}>
          مساعدك الذكي لباقات WE — اسألني عن أي شيء
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          maxWidth: 380,
        }}
      >
        {suggestions.map((s) => (
          <motion.button
            key={s}
            whileHover={{ scale: 1.06, background: C.primary, color: "#fff" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChip(s)}
            style={{
              padding: "10px 18px",
              borderRadius: 24,
              border: `1.5px solid ${C.outlineVar}`,
              background: C.surfaceLowest,
              color: C.primary,
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "Cairo, sans-serif",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {s}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Sidebar session item ────────────────────────────────────────────────── */
function SessionItem({ s, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.07 }}
      whileHover={{
        x: -3,
        background: s.active ? C.surfaceLowest : C.surfaceHigh,
      }}
      style={{
        padding: "11px 14px",
        borderRadius: 12,
        cursor: "pointer",
        marginBottom: 4,
        borderRight: s.active
          ? `4px solid ${C.primary}`
          : "4px solid transparent",
        background: s.active ? C.surfaceLowest : "transparent",
        boxShadow: s.active ? `0 2px 10px ${C.primaryGlow}` : "none",
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 4,
        }}
      >
        <MessageOutlined
          style={{ fontSize: 12, color: s.active ? C.primary : C.onSurfaceVar }}
        />
        <p
          style={{
            fontSize: 12,
            fontWeight: s.active ? 700 : 500,
            color: C.onSurface,
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
          }}
        >
          {s.title}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 10, color: C.onSurfaceVar }}>{s.time}</span>
        <Tag
          style={{
            fontSize: 9,
            padding: "1px 6px",
            borderRadius: 6,
            border: "none",
            background: s.active ? `${C.primary}20` : C.surfaceHighest,
            color: s.active ? C.primary : C.onSurfaceVar,
            margin: 0,
          }}
        >
          {s.tag}
        </Tag>
      </div>
    </motion.div>
  );
}

/* ─── Left Sidebar content ────────────────────────────────────────────────── */
function SidebarContent({ onNewChat, onClose }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div
        style={{
          padding: "20px 20px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <WEBadge size={34} glow />
          <div>
            <h1
              style={{
                fontWeight: 900,
                fontSize: 19,
                color: C.primary,
                margin: 0,
                lineHeight: 1,
              }}
            >
              لبيب
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginTop: 4,
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                  width: 7,
                  height: 7,
                  background: "#22c55e",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
              <span
                style={{ fontSize: 10, color: C.onSurfaceVar, fontWeight: 600 }}
              >
                متصل الآن
              </span>
            </div>
          </div>
        </div>
        {onClose && (
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            style={{ color: C.onSurfaceVar }}
          />
        )}
      </div>

      {/* New Chat */}
      <div style={{ padding: "0 16px 18px" }}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={() => {
              onNewChat();
              onClose?.();
            }}
            type="primary"
            icon={<PlusOutlined />}
            block
            style={{
              background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`,
              border: "none",
              borderRadius: 12,
              height: 44,
              fontWeight: 700,
              fontSize: 13,
              fontFamily: "Cairo, sans-serif",
              boxShadow: `0 4px 14px ${C.primaryGlow}`,
            }}
          >
            محادثة جديدة
          </Button>
        </motion.div>
      </div>

      {/* Sessions */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 10px" }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: C.onSurfaceVar,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            padding: "0 8px 10px",
          }}
        >
          الجلسات السابقة
        </p>
        {SESSIONS.map((s, i) => (
          <SessionItem key={s.id} s={s} i={i} />
        ))}
      </div>

      {/* Profile */}
      <div
        style={{
          padding: 16,
          borderTop: `1px solid ${C.outlineVar}30`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Badge dot status="success" offset={[-3, 34]}>
          <Avatar
            size={40}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc8of4_SCOehjcNnKPF0RtdIe1MXvlTJXsXtgVK5hFsqQdJL2Q9dwcwH9QlQG2_cJZqfchynkT-EqmjecEJbdZlj00dTwLoP1UBxQe6O_Y9SJ_ZtZdnGYEicKR4dRqApU4U9Q_s1ZFuU16XgVLJwjgtQ30uL7iIvy9LkYKRz6E_fcccnfU4Oi8SPn62WA-yHJG_AtDOjkM5FP5nttr8I15RdpAyLKHyVw9F8XHyvly8rn6N9OJ1IfsUQl7RjYiFQ233pVyJjd038s"
            style={{ border: `2px solid ${C.outlineVar}` }}
          />
        </Badge>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: C.onSurface,
              margin: 0,
            }}
          >
            أحمد محمود
          </p>
          <p style={{ fontSize: 10, color: C.onSurfaceVar, margin: 0 }}>
            موظف مبيعات - القاهرة
          </p>
        </div>
        <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
          <Button
            type="text"
            icon={<SettingOutlined />}
            style={{ color: C.onSurfaceVar }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Right context panel content ─────────────────────────────────────────── */
function ContextPanelContent({ lastTip, onClose }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 20,
        gap: 0,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <h3
          style={{
            fontSize: 12,
            fontWeight: 900,
            color: C.onSurface,
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <InfoCircleOutlined style={{ color: C.primary, fontSize: 14 }} />{" "}
          السياق الحالي
        </h3>
        {onClose && (
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            style={{ color: C.onSurfaceVar }}
          />
        )}
      </div>

      {/* Package context */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        style={{
          background: C.surfaceLowest,
          borderRadius: 14,
          padding: 16,
          marginBottom: 22,
          border: `1px solid ${C.outlineVar}25`,
          boxShadow: `0 2px 12px ${C.primaryGlow}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: C.primary,
            }}
          />
          <h4
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: C.onSurface,
              margin: 0,
            }}
          >
            الباقة المطروحة
          </h4>
        </div>
        <div
          style={{
            background: `${C.primary}08`,
            padding: 12,
            borderRadius: 10,
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: C.primary,
              margin: "0 0 8px",
            }}
          >
            WE Gold 775
          </p>
          <ul
            style={{
              fontSize: 10,
              color: C.onSurfaceVar,
              margin: 0,
              padding: 0,
              listStyle: "none",
              lineHeight: 2,
            }}
          >
            {[
              ["دقائق", "6000 دقيقة"],
              ["إنترنت", "30 جيجابايت"],
              ["التجوال", "1000 دقيقة استقبال"],
            ].map(([k, v]) => (
              <li
                key={k}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>• {k}</span>
                <span style={{ fontWeight: 600, color: C.primary }}>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Quick compare */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
        style={{ marginBottom: 22 }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: C.onSurfaceVar,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 10,
          }}
        >
          مقارنة سريعة
        </p>
        {[
          { name: "WE Gold 500", price: "500 EGP" },
          { name: "WE Gold 1000", price: "1000 EGP" },
        ].map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ x: -4, background: `${C.primary}10` }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 14px",
              background: `${C.surfaceHighest}60`,
              borderRadius: 12,
              cursor: "pointer",
              marginBottom: 8,
              transition: "background 0.2s",
              border: `1px solid ${C.outlineVar}20`,
            }}
          >
            <span style={{ fontSize: 12, color: C.onSurface, fontWeight: 500 }}>
              {c.name}
            </span>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.primary }}>
              {c.price}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 22,
        }}
      >
        {SIDE_ACTIONS.map((a, i) => (
          <motion.div key={i} whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }}>
            <Button
              block
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 12,
                border: `1px solid ${C.outlineVar}35`,
                background: C.surfaceLowest,
                color: C.onSurface,
                fontWeight: 700,
                fontSize: 12,
                fontFamily: "Cairo, sans-serif",
                height: 44,
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <span>{a.label}</span>
              <span style={{ color: C.primary }}>{a.icon}</span>
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Tip */}
      <div style={{ marginTop: "auto" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={lastTip}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: C.amber50,
              border: `1.5px solid ${C.amber200}`,
              borderRadius: 14,
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              >
                <BulbOutlined style={{ color: C.amber700, fontSize: 16 }} />
              </motion.span>
              <h4
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.amber700,
                  margin: 0,
                }}
              >
                نصيحة البيع
              </h4>
            </div>
            <p
              style={{
                fontSize: 11,
                lineHeight: 1.7,
                color: C.amber900,
                fontWeight: 500,
                margin: 0,
              }}
            >
              {lastTip}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Input area ──────────────────────────────────────────────────────────── */
function InputArea({ onSend, isTyping }) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const send = useCallback(() => {
    const t = input.trim();
    if (!t || isTyping) return;
    onSend(t);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [input, isTyping, onSend]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      style={{
        padding: "14px 20px 18px",
        background: `${C.surfaceLowest}e0`,
        borderTop: `1px solid ${C.outlineVar}25`,
        backdropFilter: "blur(12px)",
        flexShrink: 0,
      }}
    >
      {/* Chips */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 12,
          overflowX: "auto",
          paddingBottom: 2,
          scrollbarWidth: "none",
        }}
      >
        {CHIPS.map((chip) => (
          <motion.button
            key={chip}
            whileHover={{ scale: 1.06, background: C.primary, color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setInput(chip);
              inputRef.current?.focus();
            }}
            style={{
              padding: "7px 16px",
              borderRadius: 20,
              background: C.surfaceLow,
              border: `1px solid ${C.outlineVar}50`,
              fontWeight: 700,
              fontSize: 11,
              color: C.primary,
              cursor: "pointer",
              fontFamily: "Cairo, sans-serif",
              whiteSpace: "nowrap",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {chip}
          </motion.button>
        ))}
      </div>

      {/* Input row */}
      <motion.div
        animate={{
          boxShadow: focused
            ? `0 0 0 2.5px ${C.primary}40, 0 4px 20px ${C.primaryGlow}`
            : "0 2px 8px rgba(0,0,0,0.06)",
        }}
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          background: C.surfaceLowest,
          borderRadius: 18,
          padding: "6px 6px 6px 16px",
          border: `1.5px solid ${focused ? C.primary : C.outlineVar}40`,
          transition: "border-color 0.2s",
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
          <Tooltip title="إرفاق">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: C.onSurfaceVar,
                fontSize: 16,
                display: "flex",
                padding: 4,
              }}
            >
              <PaperClipOutlined />
            </motion.button>
          </Tooltip>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={isTyping}
            placeholder="اسأل لبيب عن أي باقة أو إجراء..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 14,
              fontFamily: "Cairo, sans-serif",
              color: C.onSurface,
              direction: "rtl",
              opacity: isTyping ? 0.5 : 1,
            }}
          />
          <Tooltip title="صوت">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: C.onSurfaceVar,
                fontSize: 16,
                display: "flex",
                padding: 4,
              }}
            >
              <AudioOutlined />
            </motion.button>
          </Tooltip>
        </div>
        <motion.button
          onClick={send}
          disabled={isTyping || !input.trim()}
          whileHover={{ scale: isTyping || !input.trim() ? 1 : 1.08 }}
          whileTap={{ scale: isTyping || !input.trim() ? 1 : 0.92 }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            border: "none",
            cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
            background:
              input.trim() && !isTyping
                ? `linear-gradient(135deg,${C.primary},${C.primaryDark})`
                : C.surfaceHigh,
            color: input.trim() && !isTyping ? "#fff" : C.onSurfaceVar,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17,
            boxShadow:
              input.trim() && !isTyping
                ? `0 4px 14px ${C.primaryGlow}`
                : "none",
            transition: "background 0.2s, box-shadow 0.2s, color 0.2s",
            flexShrink: 0,
          }}
        >
          <SendOutlined style={{ transform: "rotate(180deg)" }} />
        </motion.button>
      </motion.div>

      <p
        style={{
          textAlign: "center",
          fontSize: 10,
          color: C.onSurfaceVar,
          marginTop: 10,
          marginBottom: 0,
          opacity: 0.7,
        }}
      >
        يمكن لـ لبيب ارتكاب أخطاء. تأكد دائمًا من الإجراءات النهائية في نظام CRM
        الرسمي.
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Root                                                                       */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function LabibChat() {
  const [messages, setMessages] = useState(INITIAL_MSGS);
  const [isTyping, setIsTyping] = useState(false);
  const [lastTip, setLastTip] = useState(DUMMY_RESPONSES[0].tip);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const idRef = useRef(100);
  const bottomRef = useRef(null);
  const { isMobile, isTablet } = useBreakpoint();
  const showLeftInline = !isMobile && !isTablet;
  const showRightInline = !isMobile && !isTablet;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = useCallback((text) => {
    const userMsg = {
      id: idRef.current++,
      role: "user",
      text,
      time: nowTime(),
      liked: false,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    const resp = getResponse(text);
    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const botMsg = {
        id: idRef.current++,
        role: "bot",
        response: resp,
        time: nowTime(),
        liked: false,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      if (resp.tip) setLastTip(resp.tip);
    }, delay);
  }, []);

  const toggleLike = useCallback((id) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, liked: !m.liked } : m)),
    );
  }, []);

  const handleNewChat = () => {
    setMessages([]);
    setIsTyping(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; font-family: 'Cairo', sans-serif; direction: rtl; background: ${C.surface}; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.outlineVar}; border-radius: 10px; }
        input::placeholder { color: ${C.onSurfaceVar}80; font-family: 'Cairo', sans-serif; }
        .ant-drawer-body { padding: 0 !important; }
        .ant-drawer-content-wrapper { box-shadow: none !important; }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 ${C.primaryGlow}} 50%{box-shadow:0 0 0 8px transparent} }
      `}</style>

      {/* Mobile/Tablet left drawer */}
      {!showLeftInline && (
        <Drawer
          open={leftOpen}
          onClose={() => setLeftOpen(false)}
          placement="right"
          size={270}
          closable={false}
          styles={{ body: { padding: 0, background: C.surfaceLow } }}
        >
          <SidebarContent
            onNewChat={handleNewChat}
            onClose={() => setLeftOpen(false)}
          />
        </Drawer>
      )}

      {/* Mobile/Tablet right drawer */}
      {!showRightInline && (
        <Drawer
          open={rightOpen}
          onClose={() => setRightOpen(false)}
          placement="left"
          size={280}
          closable={false}
          styles={{ body: { padding: 0, background: C.surfaceLow } }}
        >
          <ContextPanelContent
            lastTip={lastTip}
            onClose={() => setRightOpen(false)}
          />
        </Drawer>
      )}

      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          direction: "rtl",
          fontFamily: "Cairo, sans-serif",
        }}
      >
        {/* ── Left sidebar (desktop) ── */}
        {showLeftInline && (
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              width: 248,
              flexShrink: 0,
              background: C.surfaceLow,
              display: "flex",
              flexDirection: "column",
              borderLeft: `1px solid ${C.outlineVar}30`,
              height: "100vh",
              boxShadow: `4px 0 20px ${C.primaryGlow}`,
            }}
          >
            <SidebarContent onNewChat={handleNewChat} />
          </motion.aside>
        )}

        {/* ── Main chat ── */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: C.surface,
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {/* Top bar */}
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              background: `${C.surfaceLowest}e0`,
              backdropFilter: "blur(16px)",
              borderBottom: `1px solid ${C.outlineVar}25`,
              flexShrink: 0,
              boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {!showLeftInline && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLeftOpen(true)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: C.primary,
                    fontSize: 20,
                    display: "flex",
                  }}
                >
                  <MenuOutlined />
                </motion.button>
              )}
              <WEBadge size={28} />
              <div>
                <h2
                  style={{
                    fontWeight: 800,
                    color: C.onSurface,
                    margin: 0,
                    fontSize: isMobile ? 13 : 15,
                    lineHeight: 1.2,
                  }}
                >
                  مقارنة باقات WE Gold
                </h2>
                {!isMobile && (
                  <p style={{ fontSize: 10, color: C.onSurfaceVar, margin: 0 }}>
                    {messages.length} رسائل
                  </p>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <Tooltip title="تصدير">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: C.onSurfaceVar,
                    fontSize: 18,
                    display: "flex",
                    padding: 6,
                  }}
                >
                  <ShareAltOutlined />
                </motion.button>
              </Tooltip>
              {!showRightInline && (
                <Tooltip title="السياق">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRightOpen(true)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: C.primary,
                      fontSize: 18,
                      display: "flex",
                      padding: 6,
                    }}
                  >
                    <InfoCircleOutlined />
                  </motion.button>
                </Tooltip>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: C.onSurfaceVar,
                  fontSize: 18,
                  display: "flex",
                  padding: 6,
                }}
              >
                <MoreOutlined />
              </motion.button>
            </div>
          </motion.header>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: isMobile ? "20px 14px" : "28px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {messages.length === 0 ? (
              <EmptyState onChip={(t) => handleSend(t)} />
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((msg) =>
                  msg.role === "user" ? (
                    <UserMessage key={msg.id} msg={msg} onLike={toggleLike} />
                  ) : (
                    <BotMessage key={msg.id} msg={msg} onLike={toggleLike} />
                  ),
                )}
                {isTyping && <TypingBubble key="typing" />}
              </AnimatePresence>
            )}
            <div ref={bottomRef} />
          </div>

          <InputArea onSend={handleSend} isTyping={isTyping} />
        </main>

        {/* ── Right context panel (desktop) ── */}
        {showRightInline && (
          <motion.aside
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              width: 272,
              flexShrink: 0,
              background: C.surfaceLow,
              display: "flex",
              flexDirection: "column",
              borderRight: `1px solid ${C.outlineVar}30`,
              height: "100vh",
              boxShadow: `-4px 0 20px ${C.primaryGlow}`,
            }}
          >
            <ContextPanelContent lastTip={lastTip} />
          </motion.aside>
        )}
      </div>
    </>
  );
}
