'use client';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ChooseRolePage() {
  const router = useRouter();
  const roles = ['Software Engineer', 'Graphic Designer', 'Digital Marketing'];

  const handleSelectRole = (role: string) => {
    // Redirect to assessment page and pass the selected role as a URL query parameter
    router.push(`/assessment?role=${encodeURIComponent(role)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-900 font-sans">
      <Navbar subtitle="Fast Track" />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mx-auto">
            <Sparkles className="w-4 h-4" /> Personalized Path
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            Pilih Jalur <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">Kariermu Sejati</span>.
          </h1>
          <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto">
            Pilih fokus profesi yang ingin kamu dalami, dan kami akan menyiapkan simulasi kasus khusus untukmu.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => handleSelectRole(role)}
              className="group relative p-10 rounded-[40px] border border-gray-100 bg-gray-50 hover:bg-white hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 text-left space-y-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                 <ArrowRight className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tighter leading-none mb-2">{role}</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Start Module</p>
              </div>
            </button>
          ))}
        </div>

        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] pt-8">
          Not sure yet? <button onClick={() => router.push('/assessment')} className="text-brand-primary hover:underline">Take the full assessment</button>
        </p>
      </main>
    </div>
  );
}
