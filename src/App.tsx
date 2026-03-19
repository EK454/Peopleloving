/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  BookOpen, 
  Search,
  PenTool,
  GraduationCap, 
  Users, 
  ShieldCheck, 
  HelpCircle,
  BarChart3,
  Target,
  Zap,
  Mail,
  Phone,
  Globe,
  Youtube,
  Instagram,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-brand uppercase bg-brand-light rounded-full">
    {children}
  </span>
);

const Highlight = ({ children, className = "", color = "#A3E635" }: { children: React.ReactNode, className?: string, color?: string }) => (
  <span 
    className={`inline px-1 [box-decoration-break:clone] ${className}`}
    style={{
      backgroundImage: `linear-gradient(transparent 65%, ${color} 65%)`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }}
  >
    {children}
  </span>
);

const Card = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div className={`p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className = "", 
  onClick,
  ...props 
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline', 
  className?: string,
  onClick?: () => void,
  [key: string]: any
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-dark shadow-sm",
    secondary: "bg-gray-900 text-white hover:bg-black shadow-sm",
    outline: "border border-gray-200 text-gray-700 hover:bg-gray-50"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// --- Track Data ---

const TRACK_CURRICULUM = {
  "기본·종합": {
    title: "아카데믹 스타트",
    intro: "영국 유학을 준비하는 초기 단계에서 IELTS를 넘어선 학술적 읽기, 쓰기, 답변 역량을 종합적으로 다지는 기초 강화 프로그램입니다. 전공 미확정 상태에서도 학술적 사고의 틀을 탄탄히 구축할 수 있도록 설계되었습니다.",
    methodology: [
      "핵심 질문 중심의 리딩 프롬프트 분석",
      "논리적 구조의 단문 에세이 작성",
      "상호 토론을 통한 다각적 해석 및 검증",
      "논리, 표현, 답변 흐름에 대한 멘토의 정밀 피드백",
      "구두 응답과 서면 논증의 유기적 연계 훈련"
    ],
    topics: [
      "AI 시대에 대학 진학의 필요성은 무엇인가",
      "청소년에게 소셜 미디어 '좋아요'는 어떤 의미인가",
      "성공은 오롯이 개인의 노력에 의한 결과인가",
      "디지털 기기는 학습의 도구인가, 방해 요소인가",
      "학교 내 경쟁은 성장을 돕는가, 저해하는가",
      "나다운 삶을 정의하고 지켜내는 것은 왜 어려운가"
    ],
    roadmap: [
      { step: "1단계", title: "질문 해석 및 답변 구조 정립" },
      { step: "2단계", title: "독해와 논리적 글쓰기의 연계" },
      { step: "3단계", title: "심층 토론을 통한 추론 역량 확장" },
      { step: "4단계", title: "개별 취약점 보완 및 심화 과정 연계" }
    ],
    goals: [
      "답변에 대한 막연함 해소",
      "글쓰기 구조의 명확성 확보",
      "토론 시 자기 생각을 선명하게 전달하는 역량 강화"
    ],
    frequency: "주 1회",
    duration: "1.5시간",
    pricing: {
      original: "1,200,000 KRW",
      discounted: "960,000 KRW",
      note: "4월 런칭 기념 특가 20% 할인"
    }
  },
  "인문사회 심화": {
    title: "인문사회 포커스",
    intro: "PPE, Law, History, Politics, Economics 등 고도의 텍스트 해석과 논증 역량이 요구되는 전공 지망생을 위한 심화 프로그램입니다. 인문사회 계열 특유의 비판적 사고와 정교한 논리 전개 방식을 체계적으로 훈련합니다.",
    methodology: [
      "학술 아티클 및 에세이 발췌문 정독",
      "핵심 주장 및 전제의 논리적 분석",
      "논리적 아규먼트 구성 및 기술",
      "심층 토론 및 반론 대응 훈련",
      "뉘앙스, 구조, 반론에 대한 멘토의 정밀 피드백"
    ],
    topics: [
      "자유지상주의와 공동체주의: 개인의 권리는 어디까지인가",
      "공정한 분배란 무엇인가: 결과의 평등 vs 기회의 평등",
      "디지털 감시 사회: 프라이버시와 공공 안전의 충돌",
      "역사적 정의의 실현: 과거의 잘못을 어떻게 보상할 것인가",
      "민주주의와 포퓰리즘: 다수의 결정은 항상 옳은가",
      "AI 윤리: 인공지능에게 도덕적 책임을 물을 수 있는가"
    ],
    roadmap: [
      { step: "1단계", title: "주장과 전제의 비판적 분석" },
      { step: "2단계", title: "논리적 아규먼트 구성 및 기술" },
      { step: "3단계", title: "심층 토론 및 반론 대응 훈련" },
      { step: "4단계", title: "옥스브리지 튜토리얼식 응답 정교화" }
    ],
    goals: [
      "텍스트에 대한 심층적 독해력 배양",
      "주장과 근거를 명확히 구분하는 분석력 강화",
      "반론에 대한 정교한 대응 및 논리 전개 능력 향상"
    ],
    frequency: "주 1회",
    duration: "1.5시간",
    pricing: {
      original: "1,200,000 KRW",
      discounted: "960,000 KRW",
      note: "4월 런칭 기념 특가 20% 할인"
    }
  },
  "STEM·의대 심화": {
    title: "STEM·의대 포커스",
    intro: "STEM, Natural Sciences, Engineering, Medicine 등 데이터 분석과 학술적 설명 능력이 핵심인 전공 지망생을 위한 심화 프로그램입니다. 복잡한 과학적 개념을 논리적으로 구조화하여 전달하고, 심층적인 why/how 질문에 즉각적으로 대응하는 역량을 집중 배양합니다.",
    methodology: [
      "개념, 그래프, 데이터 기반 시나리오 분석",
      "학술적 설명문 및 추론 노트 작성",
      "소그룹 중심의 개념 설명 및 상호 검증",
      "문제 해결 중심의 심층 토론",
      "정밀도, 명확성, 논리 흐름에 대한 멘토의 정밀 피드백"
    ],
    topics: [
      "상관관계와 인과관계: 데이터의 함정에서 벗어나는 법",
      "과학적 객관성이란 존재하는가: 패러다임의 변화와 과학의 발전",
      "유전자 편집 기술(CRISPR): 인간 개조는 축복인가 재앙인가",
      "기후 위기와 기술적 해결책: 탄소 포집 기술은 근본적 대안인가",
      "의료 인공지능과 의사의 역할: 진단의 주체는 누구여야 하는가",
      "우주 탐사의 가치: 지구의 문제보다 우주 개척이 우선인가"
    ],
    roadmap: [
      { step: "1단계", title: "핵심 개념 및 프로세스의 명확한 설명" },
      { step: "2단계", title: "데이터와 증거의 논리적 결합" },
      { step: "3단계", title: "시나리오 기반의 다각적 추론" },
      { step: "4단계", title: "학술적 설명력 및 즉각적 응답력 강화" }
    ],
    goals: [
      "복잡한 개념에 대한 명확한 설명력 확보",
      "심층적인 why/how 질문에 대한 대응력 강화",
      "데이터와 논리를 연결하는 분석 역량 향상"
    ],
    frequency: "주 1회",
    duration: "1.5시간",
    pricing: {
      original: "1,200,000 KRW",
      discounted: "960,000 KRW",
      note: "4월 런칭 기념 특가 20% 할인"
    }
  },
  "영어 디스커션 심화": {
    title: "영어 디스커션",
    intro: "전 과정이 영어로 진행되며, 실전 Speaking, Discussion, Mini Debate 및 후속 질문 대응 역량 강화에 집중하는 특화 프로그램입니다. 학술적 내용을 이해하는 수준을 넘어, 자신의 논리를 영어로 즉각적이고 유창하게 표현하고자 하는 학생에게 최적화되어 있습니다.",
    methodology: [
      "엄선된 리딩 프롬프트 사전 제공",
      "논리적 구조의 즉각적 구두 응답 훈련",
      "영어 기반의 심층 토론 전개",
      "후속 질문 대응 및 미니 디베이트 실전",
      "유창성, 구조, 응답 제어력에 대한 멘토의 정밀 피드백"
    ],
    topics: [
      "The Ethics of Fast Fashion: Who pays the real price?",
      "Digital Nomadism: Is the traditional office dead?",
      "The Power of Algorithms: Are we losing our free will?",
      "Universal Basic Income: A solution to AI-driven job loss?",
      "Cancel Culture: Accountability or modern-day witch hunt?",
      "The Future of Language: Will translation AI replace learning?"
    ],
    roadmap: [
      { step: "1단계", title: "영어 답변의 논리적 구조 정립" },
      { step: "2단계", title: "실전 그룹 토론 역량 강화" },
      { step: "3단계", title: "심화 후속 질문 및 미니 디베이트 대응" },
      { step: "4단계", title: "모의 인터뷰 및 토론 실전 역량 완성" }
    ],
    goals: [
      "영어로 답변 시작하는 속도 향상",
      "follow-up 질문에 대한 순발력 강화",
      "토론 중 논리적으로 자기 주장을 전개하는 자신감 확보"
    ],
    frequency: "주 1회",
    duration: "1.5시간",
    pricing: {
      original: "1,200,000 KRW",
      discounted: "960,000 KRW",
      note: "4월 런칭 기념 특가 20% 할인"
    }
  }
};

const TrackModal = ({ trackTitle, onClose }: { trackTitle: string, onClose: () => void }) => {
  const data = TRACK_CURRICULUM[trackTitle as keyof typeof TRACK_CURRICULUM];
  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-brand text-white">
          <div>
            <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
            <p className="text-white/90 text-sm leading-relaxed max-w-2xl">{data.intro}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 md:p-12 overflow-y-auto flex-grow space-y-16">
          {/* Program Info Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Frequency</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                  <Users className="w-4 h-4" />
                </div>
                <p className="text-xl font-bold text-gray-900">{(data as any).frequency}</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Duration</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                  <BookOpen className="w-4 h-4" />
                </div>
                <p className="text-xl font-bold text-gray-900">{(data as any).duration}</p>
              </div>
            </div>
            <div className="p-6 bg-brand text-white rounded-2xl shadow-xl shadow-brand/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-white/20 rounded-bl-xl">
                <span className="text-[8px] font-black uppercase tracking-widest">Limited Offer</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">Pricing</p>
              <div className="flex flex-col">
                <span className="text-white/60 line-through text-xs mb-0.5">{(data as any).pricing.original}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{(data as any).pricing.discounted}</span>
                  <span className="text-[10px] font-medium opacity-70">/ 16주</span>
                </div>
              </div>
              <div className="mt-3 py-1 px-2.5 bg-white/10 rounded-lg inline-block border border-white/10">
                <p className="text-[10px] font-bold">{(data as any).pricing.note}</p>
              </div>
            </div>
          </div>

          {/* Intro Section (A) */}
          <section className="max-w-3xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center text-sm">A</span>
              프로그램 소개
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {data.intro}
            </p>
          </section>

          {/* Methodology (B) */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center text-sm">B</span>
              수업은 이렇게 진행됩니다
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {data.methodology.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-brand/20 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Topics (C) */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center text-sm">C</span>
              이런 주제를 다룹니다
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.topics.map((topic, i) => (
                <div key={i} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-600 hover:border-brand/30 transition-all hover:shadow-md">
                  <span className="text-brand mr-2">•</span>
                  {topic}
                </div>
              ))}
            </div>
          </section>

          {/* Roadmap (D) */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center text-sm">D</span>
              16주 운영 흐름
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.roadmap.map((phase, i) => (
                <div key={i} className="relative p-6 bg-brand-light/30 rounded-3xl border border-brand-light/50 group hover:bg-brand-light/50 transition-colors">
                  <span className="text-[10px] font-black text-brand uppercase tracking-widest mb-3 block opacity-60">{phase.step}</span>
                  <h4 className="font-bold text-gray-900 text-base leading-snug">{phase.title}</h4>
                </div>
              ))}
            </div>
          </section>

          {/* Goals (E) */}
          <section className="pb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center text-sm">E</span>
              이런 변화가 목표입니다
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {data.goals.map((goal, i) => (
                <div key={i} className="p-8 bg-brand text-white rounded-[32px] shadow-lg shadow-brand/20 flex items-center justify-center text-center">
                  <p className="font-bold leading-relaxed">{goal}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-xs text-gray-400 leading-relaxed text-center italic">
              ※ 위 내용은 표준 가이드라인이며, 실제 수업은 학생의 관심사와 역량에 맞춰 멘토가 유연하게 조정합니다.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <Button onClick={onClose} variant="secondary">닫기</Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Waitlist Form Component ---

const FORM_ENDPOINT = "https://formspree.io/f/your-id"; // REPLACE THIS URL LATER

const WaitlistForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [interestError, setInterestError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(null);
    setInterestError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const emailConfirm = formData.get('emailConfirm') as string;
    const interests = formData.getAll('interest');

    if (email !== emailConfirm) {
      setEmailError('이메일 주소가 일치하지 않습니다.');
      return;
    }

    if (interests.length === 0) {
      setInterestError('최소 하나 이상의 클래스를 선택해주세요.');
      return;
    }

    setStatus('submitting');
    
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-brand" />
        </div>
        <h2 className="text-3xl font-bold mb-4">등록이 완료되었습니다</h2>
        <p className="text-gray-600 mb-8">
          대기명단에 성공적으로 등록되었습니다.<br />
          상담 및 수업 공석 발생 시 남겨주신 연락처로 우선 안내드리겠습니다.
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')}>
          추가 등록하기
        </Button>
      </motion.div>
    );
  }

  return (
    <>
      <div className="text-center mb-12">
        <SectionTag>Waitlist</SectionTag>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
          <Highlight>대기명단 등록</Highlight>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">상담 및 수업 공석 발생 시 우선적으로 연락드립니다</p>
        <p className="text-xs text-gray-400 mt-4 text-right"><span className="text-red-500">*</span> 필수 입력 항목</p>
      </div>
      
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">이름 <span className="text-red-500">*</span></label>
          <input 
            required
            name="name"
            type="text" 
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" 
            placeholder="홍길동" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">학년 <span className="text-red-500">*</span></label>
          <select 
            required
            name="grade"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
          >
            <option value="">학년을 선택해주세요</option>
            <option>초등학생</option>
            <option>중학교 1~2학년</option>
            <option>중학교 3학년</option>
            <option>고등학교 1학년</option>
            <option>고등학교 2학년</option>
            <option>고등학교 3학년 / N수</option>
            <option>성인 / 기타</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">목표 학교/전공 <span className="text-red-500">*</span></label>
          <input 
            required
            name="target"
            type="text" 
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" 
            placeholder="예: Oxford PPE / Cambridge Medicine / UCL History" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">연락처 (휴대폰) <span className="text-red-500">*</span></label>
          <input 
            required
            name="phone"
            type="tel" 
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" 
            placeholder="010-0000-0000" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">이메일 주소 <span className="text-red-500">*</span></label>
          <input 
            required
            name="email"
            type="email" 
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" 
            placeholder="example@email.com" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">이메일 주소 확인 <span className="text-red-500">*</span></label>
          <input 
            required
            name="emailConfirm"
            type="email" 
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" 
            placeholder="이메일을 다시 입력해주세요" 
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-bold text-gray-700">관심 클래스 <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["기본·종합", "인문사회 심화", "STEM·의대 심화", "영어 디스커션 심화"].map(c => (
              <label key={c} className="flex items-center gap-2 p-3 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" name="interest" value={c} className="accent-brand" />
                <span className="text-xs font-medium">{c}</span>
              </label>
            ))}
          </div>
          {interestError && <p className="text-red-500 text-xs mt-1">{interestError}</p>}
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-bold text-gray-700">추가 문의사항 (선택)</label>
          <textarea 
            name="message"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all h-32" 
            placeholder="현재 영어 수준이나 궁금한 점을 적어주세요"
          ></textarea>
        </div>
        <div className="md:col-span-2 mt-4">
          <Button 
            type="submit" 
            className="w-full py-4 text-lg"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? '등록 중...' : '대기명단 등록'}
          </Button>
          {status === 'error' && (
            <p className="text-red-500 text-sm mt-2 text-center">오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
          )}
        </div>
      </form>
    </>
  );
};

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-light selection:text-brand">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-light/90 backdrop-blur-md border-b border-brand-light/50' : 'bg-white/80 backdrop-blur-md border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://ais-dev-2mshiyujbktiol5ii3cwoa-242946353835.asia-northeast1.run.app/logo.png" alt="사람사랑유학원" className="h-12 w-auto" referrerPolicy="no-referrer" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#who" className="text-sm font-medium text-gray-600 hover:text-brand">대상</a>
            <a href="#why" className="text-sm font-medium text-gray-600 hover:text-brand">필요성</a>
            <a href="#tracks" className="text-sm font-medium text-gray-600 hover:text-brand">프로그램</a>
            <a href="#how" className="text-sm font-medium text-gray-600 hover:text-brand">수업방식</a>
            <a href="#waitlist" className="text-sm font-bold text-brand">대기명단 등록</a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              <a href="#who" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">대상</a>
              <a href="#why" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">필요성</a>
              <a href="#tracks" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">프로그램</a>
              <a href="#how" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">수업방식</a>
              <Button onClick={() => {
                setIsMenuOpen(false);
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
              }}>대기명단 등록</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-brand-light/20 rounded-l-[120px] hidden lg:block" />
        <div className="absolute top-1/4 left-0 -z-10 w-80 h-80 bg-brand/5 rounded-full blur-[120px]" />
        
        {/* Subtle Watermark */}
        <div className="absolute top-40 right-10 -z-10 opacity-[0.03] select-none pointer-events-none hidden xl:block">
          <span className="font-serif text-[240px] font-bold leading-none tracking-tighter">OXBRIDGE</span>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand/10 text-brand rounded-full mb-8">
                <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Premium Tutorial for UK Admissions</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-8 tracking-tight text-gray-900">
                영국 상위권 대학 진학을 위한<br />
                <Highlight>영어 기반 사고</Highlight>의 시작
              </h1>
              
              <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-xl font-medium">
                IELTS 점수를 위한 영어 공부로는 부족합니다. 상위권 대학에서 요구되는 인터뷰, 에세이, 튜토리얼형 수업에서 실제로 요구되는 사고력과 영어 수행 능력을 근본적으로 향상시켜야 합니다.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-5 text-lg shadow-2xl shadow-brand/20 hover:shadow-brand/40 transition-all rounded-2xl"
                >
                  대기명단 등록하기 <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  className="px-10 py-5 text-lg border-2 border-gray-100 hover:border-brand/30 hover:bg-gray-50 transition-all rounded-2xl"
                  onClick={() => window.location.href = 'mailto:seoul@peopleloving.co.kr'}
                >
                  상담 문의하기
                </Button>
              </div>

              {/* Trust Indicators - Optimized & Enhanced */}
              <div className="mt-20 flex flex-nowrap items-center gap-x-8 xl:gap-x-12 border-t border-gray-100 pt-12">
                <div className="group flex-shrink-0">
                  <p className="text-2xl xl:text-3xl font-serif font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors">Oxbridge</p>
                  <p className="text-[10px] xl:text-[11px] text-gray-400 font-bold uppercase tracking-[0.15em] xl:tracking-[0.2em] group-hover:text-brand/70 transition-colors">Curriculum Inspired</p>
                </div>
                
                <div className="w-px h-8 xl:h-10 bg-gray-200/60 flex-shrink-0" />
                
                <div className="group flex-shrink-0">
                  <p className="text-2xl xl:text-3xl font-serif font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors">1:2 ~ 1:5</p>
                  <p className="text-[10px] xl:text-[11px] text-gray-400 font-bold uppercase tracking-[0.15em] xl:tracking-[0.2em] group-hover:text-brand/70 transition-colors">Small Group Tutorial</p>
                </div>

                <div className="w-px h-8 xl:h-10 bg-gray-200/60 flex-shrink-0" />

                <div className="group flex-shrink-0">
                  <p className="text-2xl xl:text-3xl font-serif font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors">16 Weeks</p>
                  <p className="text-[10px] xl:text-[11px] text-gray-400 font-bold uppercase tracking-[0.15em] xl:tracking-[0.2em] group-hover:text-brand/70 transition-colors">Intensive Program</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 40, y: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: -20 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              {/* Image Container with Editorial Mask */}
              <div className="relative z-20 group">
                <div className="absolute -inset-4 bg-brand/5 rounded-[60px] blur-2xl group-hover:bg-brand/10 transition-colors duration-500" />
                <div className="relative rounded-[50px] overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop" 
                    alt="Oxford University Architecture" 
                    className="w-full h-[580px] object-cover group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
              </div>
              
              {/* Floating Badge - Optimized */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white p-6 rounded-[24px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] z-30 border border-gray-50 max-w-[240px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base leading-tight">Academic Rigor</p>
                    <p className="text-[9px] text-brand font-black uppercase tracking-widest">Tutorial Method</p>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                  옥스브릿지 튜토리얼 방식을 재현하여 영어 기반으로 사고 하는 힘을 키우고 학술적 깊이를 더합니다.
                </p>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand/10 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-1/4 -right-16 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Who this is for */}
      <section id="who" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionTag>Target Audience</SectionTag>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
              <Highlight>이런 학생들을 위해 설계되었습니다</Highlight>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">점수 중심 영어를 넘어, 영국식 학업 수행 역량을 미리 준비해야 하는 학생</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "옥스브리지 지망생",
                desc: "단순 지식 암기를 넘어 교수와의 1:1 튜토리얼을 견딜 수 있는 사고력이 필요한 학생",
                icon: <GraduationCap className="w-6 h-6 text-brand" />
              },
              {
                title: "영국 의대 준비생",
                desc: "높은 학업 성취도와 더불어 복합적인 윤리적 판단과 인터뷰 대응 능력이 필요한 학생",
                icon: <ShieldCheck className="w-6 h-6 text-brand" />
              },
              {
                title: "에세이 기반 전공 희망자",
                desc: "경제, 정치, 역사 등 방대한 읽기 자료를 분석하고 자신의 논리를 글로 정립해야 하는 학생",
                icon: <BookOpen className="w-6 h-6 text-brand" />
              }
            ].map((item, i) => (
              <Card key={i} className="border-none">
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why this is needed */}
      <section id="why" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <SectionTag>The Academic Gap</SectionTag>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1]">
              IELTS 점수만으로는<br />
              <Highlight color="#A3E635">충분하지 않습니다</Highlight>
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto">
              주어진 시간 내에 정해진 형식으로 답하는 능력과, 낯선 질문 앞에서 스스로 생각을 전개하는 능력은 근본적으로 다릅니다.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Decorative Glow */}
            <div className="absolute -inset-10 bg-brand/5 blur-3xl rounded-[100px] z-0" />
            
            <div className="bg-white border border-gray-100 rounded-[40px] shadow-2xl overflow-hidden relative z-10">
              {/* VS Badge */}
              <div className="absolute top-[5.5rem] left-1/2 -translate-x-1/2 z-20 w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-xs font-black text-gray-300 italic">VS</span>
              </div>

              <div className="grid grid-cols-2 relative z-10">
                <div className="p-10 bg-gray-50/50 text-center border-r border-gray-100 flex flex-col items-center justify-center">
                  <span className="text-base md:text-lg font-bold text-gray-400">일반적인 시험 대비</span>
                </div>
                <div className="p-10 bg-brand text-white text-center shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center">
                  <span className="text-base md:text-lg font-bold">본 튜토리얼</span>
                </div>
              </div>
              
              <div className="relative z-10 bg-white">
                {/* Row 1 */}
                <div className="relative group">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-4 py-1.5 bg-white rounded-full border border-gray-100 shadow-md transition-transform group-hover:scale-110">
                    <div className="flex items-center gap-2">
                      <Target className="w-3 h-3 text-brand" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">목표</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-12 md:p-16 bg-gray-50/20 border-r border-gray-50 flex items-center justify-center text-center">
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed">유형 적응을 통한<br />빠른 점수 획득</p>
                    </div>
                    <div className="p-12 md:p-16 bg-white flex items-center justify-center text-center">
                      <p className="text-sm md:text-base font-bold text-gray-900 leading-relaxed">근본적인 사고력 및<br />학업 수행 능력 강화</p>
                    </div>
                  </div>
                </div>
                
                {/* Row 2 */}
                <div className="relative border-t border-gray-50 group">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-4 py-1.5 bg-white rounded-full border border-gray-100 shadow-md transition-transform group-hover:scale-110">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3 h-3 text-brand" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">수업 방식</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-12 md:p-16 bg-gray-50/20 border-r border-gray-50 flex items-center justify-center text-center">
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed">정답 및 모델 답변 위주의<br />반복 학습</p>
                    </div>
                    <div className="p-12 md:p-16 bg-white flex items-center justify-center text-center">
                      <p className="text-sm md:text-base font-bold text-gray-900 leading-relaxed">읽기, 쓰기, 토론, 피드백을 통한<br />유기적 학습</p>
                    </div>
                  </div>
                </div>
                
                {/* Row 3 */}
                <div className="relative border-t border-gray-50 group">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-4 py-1.5 bg-white rounded-full border border-gray-100 shadow-md transition-transform group-hover:scale-110">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-brand" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">길러지는 힘</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-12 md:p-16 bg-gray-50/20 border-r border-gray-50 flex items-center justify-center text-center">
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed">시험장 대응력과<br />페이퍼 상의 점수</p>
                    </div>
                    <div className="p-12 md:p-16 bg-white flex items-center justify-center text-center">
                      <p className="text-sm md:text-base font-bold text-gray-900 leading-relaxed">인터뷰, 에세이, 튜토리얼형 수업에<br />포괄적으로 대응할 수 있는 사고능력과 영어실력</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="h-2 w-full bg-gradient-to-r from-gray-100 via-brand to-gray-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Constraints of AI-based learning Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionTag>Constraints of AI-based learning</SectionTag>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
              AI가 써주는 답과,<br />
              <Highlight>내가 직접 고민해가며 쓰는 답은 그 무게감이 다릅니다</Highlight>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              AI는 그럴듯해 보이는 글을 빠르게 출력하는 목적으로 유용합니다. 하지만 영국 상위권 대학에 입학하고 생존하는 데는 역부족입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-none shadow-sm bg-gray-50/50 p-10 flex flex-col hover:bg-white hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold mb-5 leading-tight">그럴듯해 보이는 문장,<br />그렇지 못한 논리</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                AI는 매끈한 표현을 빠르게 만드는 데 능하지만, 논리적 비약, 근거 불충분, 맥락 이탈 등의 문제가 큽니다. 상위권 대학 준비에 있어서 치명적인 문제로 작용할 수 있습니다.
              </p>
            </Card>
            <Card className="border-none shadow-sm bg-gray-50/50 p-10 flex flex-col hover:bg-white hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold mb-5 leading-tight">문제가 되지 않는,<br />틀리지 않는 답변 제시</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                AI가 대중화 되면서 크고 작은 문제가 꾸준히 발생해왔고, 이에 따라 각 AI 기업의 정책이 보수적, 안정지향적으로 변화하고 있습니다. 이에 따라 독창적이고 눈에 띄는 답변보다는 문제가 되지 않고 틀리지 않는 답변을 내놓는 성향이 강합니다.
              </p>
            </Card>
            <Card className="border-none shadow-sm bg-gray-50/50 p-10 flex flex-col hover:bg-white hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold mb-5 leading-tight">대학교 차원에서<br />AI 사용 제한 강화</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                많은 대학교에서 AI 사용 및 이를 활용한 부정행위의 심각성을 이미 인지하고 있고, 대대적으로 단속을 강화하는 추세입니다.
              </p>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-2">
            <p className="text-gray-400 text-xs leading-relaxed">
              *본 수업은 AI 사용을 반대하는 게 아니라, 스스로 생각하는 힘을 키울 수 있도록 돕습니다.
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              *설명의 편의를 위하여 LLM(Large Language Model)을 AI로 표기했습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Program Architecture (Tracks) */}
      <section id="tracks" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionTag>Program Architecture</SectionTag>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
              <Highlight>프로그램은 이렇게 나뉩니다</Highlight>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              관심 분야에 따라 선택할 수 있도록 다양한 특화 프로그램을 준비했습니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Foundation */}
            <Card className="border-none shadow-lg bg-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand" />
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-light text-brand shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">
                    <Highlight>기본·종합</Highlight>
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-8 leading-relaxed flex-grow">
                  영국 유학을 준비하는 학생이라면 흔히 관심 가질만한 주제를 가지고, 쓰기, 답변, 토론의 기본 틀을 다지는 프로그램
                </p>
                <button 
                  onClick={() => setSelectedTrack("기본·종합")}
                  className="inline-flex items-center justify-center gap-2 bg-brand text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-brand/90 transition-all mt-auto w-fit"
                >
                  상세보기 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>

            {/* 2. Humanities Track */}
            <Card className="border-none shadow-lg bg-white relative overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand" />
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">
                    <Highlight>인문사회 심화</Highlight>
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-8 leading-relaxed flex-grow">
                  문과 계열 전공 관심 학생이 글을 읽고 해석하고 논증하는 힘을 더 깊게 다지는 프로그램
                </p>
                <button 
                  onClick={() => setSelectedTrack("인문사회 심화")}
                  className="inline-flex items-center justify-center gap-2 bg-brand text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-brand/90 transition-all mt-auto w-fit"
                >
                  상세보기 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>

            {/* 3. STEM Track */}
            <Card className="border-none shadow-lg bg-white relative overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand" />
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">
                    <Highlight>STEM·의대 심화</Highlight>
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-8 leading-relaxed flex-grow">
                  이과 계열 전공 관심 학생이 데이터와 과학적 자료를 분석하고 설명하는 힘을 더 깊게 다지는 프로그램
                </p>
                <button 
                  onClick={() => setSelectedTrack("STEM·의대 심화")}
                  className="inline-flex items-center justify-center gap-2 bg-brand text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-brand/90 transition-all mt-auto w-fit"
                >
                  상세보기 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>

            {/* 4. English Discussion */}
            <Card className="border-2 border-dashed border-purple-100 bg-purple-50/30 relative overflow-hidden hover:bg-white transition-colors duration-300 flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand" />
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100 text-purple-600 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">
                    <Highlight>영어 디스커션 심화</Highlight>
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-8 leading-relaxed flex-grow">
                  수업을 영어로 진행하며 스피킹, 토론, 답변 감각을 더 강하게 훈련하는 프로그램
                </p>
                <button 
                  onClick={() => setSelectedTrack("영어 디스커션 심화")}
                  className="inline-flex items-center justify-center gap-2 bg-brand text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-brand/90 transition-all mt-auto w-fit"
                >
                  상세보기 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedTrack && (
          <TrackModal 
            trackTitle={selectedTrack} 
            onClose={() => setSelectedTrack(null)} 
          />
        )}
      </AnimatePresence>

      {/* 5. Curriculum overview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionTag>Tutorial structure</SectionTag>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
              <Highlight>튜토리얼 구조</Highlight>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              캠브리지 supervision의 핵심 원리에 기반해, 총 4단계로 설계했습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { 
                step: "01", 
                title: "Foundation", 
                desc: "핵심 이론 정립 및 학술적 사고의 기초 형성",
                icon: <BookOpen className="w-5 h-5" />
              },
              { 
                step: "02", 
                title: "Reading", 
                desc: "논설, 기사 등 다양한 텍스트 심층 분석 및 비판적 읽기",
                icon: <Search className="w-5 h-5" />
              },
              { 
                step: "03", 
                title: "Writing", 
                desc: "분석 내용을 바탕으로 한 사고의 구조화 및 논리적 에세이 작성",
                icon: <PenTool className="w-5 h-5" />
              },
              { 
                step: "04", 
                title: "Discussion & Feedback", 
                desc: "다른 학생들과의 심층 토론을 통한 논리 검증 및 멘토의 맞춤 피드백",
                icon: <MessageSquare className="w-5 h-5" />
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all group"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div className="mb-6 mt-2 w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center text-brand">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">
                  <Highlight>{item.title}</Highlight>
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Supervision Philosophy Block - Compacted and moved to bottom as context */}
          <div className="max-w-5xl mx-auto p-1 bg-gray-50 rounded-[40px]">
            <div className="bg-white rounded-[38px] p-10 md:p-14 border border-gray-100 flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-3/5 shrink-0">
                <div className="rounded-2xl overflow-hidden aspect-video shadow-xl bg-black">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/HstR1TR_cP8?si=7gN4RhmYxzca0ze6" 
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-[10px] text-gray-400 mt-4 text-center">Source: Cambridge University YouTube Channel</p>
              </div>
              <div className="flex-grow">
                <SectionTag>The Philosophy</SectionTag>
                <h3 className="text-2xl font-bold mb-5">
                  <Highlight>Cambridge Supervision 이란?</Highlight>
                </h3>
                <div className="space-y-5 text-gray-600 text-sm leading-relaxed">
                  <p>
                    Supervision은 보통 학생 1~3명과 교수가 함께하는 소규모 수업이다. 
                    일반적인 강의처럼 일방적으로 듣는 방식이 아니라, 미리 제출한 에세이나 과제를 바탕으로 함께 이야기하고 피드백을 받는 토론형 수업에 가깝다. 
                    학생 수가 적기 때문에 적극적으로 질문할 수 있는 환경이 마련되고, 자기 수준과 필요에 맞는 지도를 받을 수 있다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How classes work */}
      <section id="how" className="py-24 bg-brand text-white rounded-t-[60px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionTag>Tailored Tutoring</SectionTag>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
              <Highlight>한국 학생의 성향을 고려한<br className="md:hidden" /> 세심한 수업 방식</Highlight>
            </h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
              영국식 교육의 정수를 한국 학생의 기호와 학습 패턴에 맞춰 최적화했습니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-10 rounded-[40px] border border-white/20 hover:bg-white/15 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <p className="text-2xl font-bold mb-3">소수 정예</p>
              <p className="text-sm text-white/60 font-medium">최대 1:4 그룹 수업</p>
            </div>
            <div className="bg-white/10 p-10 rounded-[40px] border border-white/20 hover:bg-white/15 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <p className="text-2xl font-bold mb-3">매 수업 에세이 피드백</p>
              <p className="text-sm text-white/60 font-medium">개인별 맞춤 첨삭</p>
            </div>
            <div className="bg-white/10 p-10 rounded-[40px] border border-white/20 hover:bg-white/15 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <p className="text-2xl font-bold mb-3">월간 리포트</p>
              <p className="text-sm text-white/60 font-medium">학습 성취도 분석</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Mentor Profile section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <SectionTag>MENTOR PROFILE</SectionTag>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-[1.1]">
              이 프로그램을 직접<br />
              <Highlight>설계하고 이끄는 멘토</Highlight>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto">
              영어, 입시, 학업을 포괄적으로 이해하는 케임브리지 출신 멘토가 직접 지도합니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-start mb-20">
            {/* Left: Mentor Image & Basic Info */}
            <div className="lg:col-span-4">
              <div className="relative group">
                <div className="absolute -inset-4 bg-brand/5 rounded-[40px] blur-2xl group-hover:bg-brand/10 transition-colors duration-500" />
                <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-gray-50 aspect-[4/5]">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=750&auto=format&fit=crop" 
                    alt="Mentor Kim Euntaek" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="mt-8 text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">김은택 멘토</h3>
                  <p className="text-lg font-serif text-brand font-semibold">University of Cambridge</p>
                  <p className="text-sm text-gray-500 font-medium tracking-tight uppercase">Psychological and Behavioural Sciences</p>
                </div>
              </div>
            </div>

            {/* Right: Detailed Experience Narrative & Proof Blocks */}
            <div className="lg:col-span-8">
              <div className="space-y-10 text-gray-600 mb-16">
                <div className="relative pl-8 border-l-2 border-brand/20">
                  <p className="text-lg leading-relaxed">
                    케임브리지에서 Psychological and Behavioural Sciences를 전공하며, neuroscience부터 anthropology, political philosophy까지 다양한 분야를 깊이 공부했습니다. 이 경험을 바탕으로 단순한 영어 교정이 아니라 학생이 읽고, 생각하고, 쓰고, 답하고, 토론하는 방식 자체를 훈련하는 데 초점을 두고 지도합니다.
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-brand/20">
                  <p className="text-lg leading-relaxed">
                    또한 옥스브리지, 의대, 약대 등 영국 상위권 대학을 비롯하여 영국에서의 대학 진학을 목표로 하는 학생들을 꾸준히 지도해왔습니다. 입시용 영어 성적 준비가 아니라, 에세이, 인터뷰, 튜토리얼형 수업 등에서 요구되는 학업 수행 역량을 함께 다루는 것이 교육 방식의 특징입니다.
                  </p>
                </div>
              </div>

              {/* Proof Blocks - Integrated below description */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-gray-50/50 border-none shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-brand group-hover:text-white transition-all duration-300">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">상위권 입시 지도</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    옥스브리지, 의대, 약대 등 경쟁률 높은 과정 지망생 다수 지도 경험
                  </p>
                </Card>

                <Card className="p-6 bg-gray-50/50 border-none shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-brand group-hover:text-white transition-all duration-300">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">글로벌 커뮤니케이션</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    100개국 이상 다국적 유저와 클라이언트를 상대로 스타트업을 운영하며 쌓은 실전 커뮤니케이션 능력
                  </p>
                </Card>

                <Card className="p-6 bg-gray-50/50 border-none shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-brand group-hover:text-white transition-all duration-300">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">학술적 사고 기반</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    뇌과학, 인류학, 정치철학 등 다양한 분야를 넘나드는 폭넓은 학문 기반
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionTag>FAQ</SectionTag>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
              <Highlight>자주 묻는 질문</Highlight>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              프로그램에 대해 가장 많이 궁금해하시는 내용을 정리했습니다.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { q: "어떤 학생에게 가장 적합한가요?", a: "영어로 말하면 생각이 끊기고 답변이 어려운 학생, 상위권 대학, 메디컬 또는에세이 전공을 목표로 하는 학생, 대학 진학을 위한 영어 점수는 준비되었지만 여전히 실전영어는 막막한 학생에게 특히 적합합니다." },
              { q: "IELTS 수업과는 무엇이 다른가요?", a: "주어진 시간 내에 효율적으로 높은 점수를 내는 테크닉을 기르는 IELTS 수업과 달리, 본 수업은 에세이, 인터뷰, 튜토리얼형 수업 등에서 실제로 요구되는 영어 능력과 사고의 힘을 기르는데 초점을 둡니다." },
              { q: "영어가 아직 완전히 편하지 않아도 수업을 따라갈 수 있나요?", a: "네. 영어가 아직 완전히 편하지 않은 학생들을 위해 만들어진 수업입니다." },
              { q: "그룹수업이면 소극적인 학생은 불리하지 않나요?", a: "다양항 연령대의 학생들을 지도한 경험이 있는 멘토가 모든 학생들이 균형있게 참여하도록 유도합니다." },
              { q: "언제부터 시작하는 것이 좋은가요?", a: "높은 목표를 가진 학생일수록 가능한 빨리 시작하는 편이 좋습니다. 읽기, 쓰기, 사고 방식 자체를 바꾸는 훈련이기 떄문에 시간적 여유를 충분히 두고 실력을 향상시켜야 합니다." },
              { q: "꼭 상위권 대학을 목표하지 않거나, 영국 학부 유학 목표가 아니더라도 수업 참여가 가능한가요?", a: "가능합니다. 영어로 사고하는 힘을 키우는 것은 글로벌 시대에 훌륭한 자산이 될 수 있습니다." },
              { q: "1:1 수업도 가능한가요?", a: "가능합니다. 유학원을 통해 개별 연락 바랍니다." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-bold text-gray-800">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="text-center">
            <SectionTag>Testimonials</SectionTag>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
              <Highlight>수강생들의 변화</Highlight>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              이전 학생들이 수업을 통해 느낀 변화를 간단히 정리했습니다.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Gradient Overlays for smooth fade effect */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div 
            className="flex gap-6 px-6"
            animate={{ x: [0, -1000] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {[
                  { text: "“예전에는 영어로 질문을 받으면 긴장부터 했는데 이제 어디서부터 풀어가야 할지 알 것 같아요.”", name: "강OO" },
                  { text: "“제 답변이 왜 늘 애매하게 끝나는지 이해하게 됐어요.”", name: "박OO" },
                  { text: "“제가 영어로 라이팅이나 스피킹을 할 때 논리가 어디서 어떻게 흐려지는지 꾸준하게 피드백을 받다 보니 자신감이 많이 생겼습니다.”", name: "김OO" },
                  { text: "“영어 시험 성적만 가지고는 부족하다는 걸 머리로는 이해하고 있었는데 어떻게 해결해야 할지 모르고 있었어요. 수업을 통해 영어와 사고력 둘 다 잡을 수 있어서 좋았어요.”", name: "이OO" },
                  { text: "“혼자 준비할 때는 항상 막막한 느낌이었는데 전문적인 피드백을 받으니 더 안정감 있게 실력을 늘릴 수 있는 느낌이었어요.”", name: "최OO" }
                ].map((t, idx) => (
                  <div 
                    key={idx} 
                    className="flex-shrink-0 w-[350px] bg-gray-50/50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
                  >
                    <p className="text-gray-700 leading-relaxed mb-8 font-medium">
                      {t.text}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                      <span className="text-sm font-bold text-gray-400 tracking-tight">{t.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. Waitlist form */}
      <section id="waitlist" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* 10. Inquiry / Footer */}
      <footer className="bg-[#333C4D] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-8">
                <img src="https://ais-dev-2mshiyujbktiol5ii3cwoa-242946353835.asia-northeast1.run.app/logo.png" alt="사람사랑유학원" className="h-12 w-auto brightness-0 invert" referrerPolicy="no-referrer" />
              </div>
              <p className="text-white/50 max-w-sm mb-10 leading-relaxed text-sm">
                영국식 학업 수행을 준비하는 학생을 위한 소수 정예 튜토리얼. 
                단순한 입시를 넘어 대학에서의 실질적인 성공을 위한 지적 토대를 마련합니다.
              </p>
              <div className="flex gap-3">
                <a href="https://www.peopleloving.co.kr" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand hover:scale-110 transition-all duration-300 group">
                  <Globe className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
                <a href="https://www.youtube.com/@peopleloving" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand hover:scale-110 transition-all duration-300 group">
                  <Youtube className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
                <a href="https://www.instagram.com/peoplelovingofficial/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand hover:scale-110 transition-all duration-300 group">
                  <Instagram className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
                <a href="mailto:seoul@peopleloving.co.kr" className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand hover:scale-110 transition-all duration-300 group">
                  <Mail className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-12 lg:pl-12">
              <div className="space-y-8">
                <div>
                  <h5 className="text-[11px] font-bold text-brand uppercase tracking-[0.2em] mb-6">Contact Info</h5>
                  <ul className="space-y-5">
                    <li className="group">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">대표전화</p>
                      <p className="text-lg font-semibold group-hover:text-brand transition-colors">02-566-9184</p>
                    </li>
                    <li className="group">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">이메일</p>
                      <a href="mailto:seoul@peopleloving.co.kr" className="text-base font-medium text-white/80 hover:text-brand transition-colors border-b border-white/10 pb-0.5">seoul@peopleloving.co.kr</a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h5 className="text-[11px] font-bold text-brand uppercase tracking-[0.2em] mb-6">Our Location</h5>
                  <div className="space-y-5">
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">위치</p>
                      <p className="text-white/80 leading-relaxed text-sm">
                        서울특별시 서초구 강남대로 455,<br />
                        강남태영데시앙루브 3층 302호
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse"></div>
                      <span className="text-[10px] text-white/50 font-medium">방문 상담은 예약제로 운영됩니다</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-white/30">
                  <span className="flex items-center gap-2">
                    <span className="text-white/50 font-semibold">대표자</span> 이선오
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-white/50 font-semibold">사업자등록번호</span> 220-06-32170
                  </span>
                </div>
                <p className="text-[10px] text-white/20 tracking-wide">
                  © 2026 사람사랑유학원 English Tutorial. All rights reserved.
                </p>
              </div>
              
              <div className="flex items-center gap-8 text-[11px] font-bold tracking-wider uppercase">
                <a href="#" className="text-white/40 hover:text-brand transition-colors">이용약관</a>
                <a href="#" className="text-white/40 hover:text-brand transition-colors">개인정보처리방침</a>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all group"
                >
                  <ArrowRight className="w-4 h-4 -rotate-90 text-white/40 group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
