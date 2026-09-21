import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, XCircle, Clock, AlertCircle, Search } from 'lucide-react';
import { SUPPORT_EMAIL } from '../lib/registration-config';

const STATUS_UI = {
  'Verified': { cls: 'bg-green-100 text-green-800 border-green-300', icon: CheckCircle, note: 'Your payment is verified. See you at the conference!' },
  'Rejected': { cls: 'bg-red-100 text-red-700 border-red-300', icon: XCircle, note: 'There was an issue with your payment. Please contact us.' },
  'Pending Verification': { cls: 'bg-amber-100 text-amber-800 border-amber-300', icon: Clock, note: 'We have your registration and are verifying your payment.' },
};

export default function StatusPortal() {
  const [step, setStep] = useState(1); // 1 email, 2 otp, 3 result
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [resendIn, setResendIn] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [regs, setRegs] = useState(null);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const sendOtp = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email address'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/register/send-otp', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send code');
      setOtpToken(data.token); setResendIn(45); setStep(2);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  const verifyAndFetch = async () => {
    if (!/^\d{6}$/.test(otp.trim())) { setError('Enter the 6-digit code'); return; }
    setLoading(true); setError('');
    try {
      const vr = await fetch('/api/register/verify-otp', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: otpToken, otp: otp.trim() }),
      });
      const vd = await vr.json().catch(() => ({}));
      if (!vr.ok) throw new Error(vd.error || 'Verification failed');

      const sr = await fetch('/api/register/status', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verifiedToken: vd.verifiedToken }),
      });
      const sd = await sr.json().catch(() => ({}));
      if (!sr.ok) throw new Error(sd.error || 'Could not fetch your status');
      setRegs(sd.registrations || []); setStep(3);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  return (
    <>
      <Header theme="red" />
      <main className="bg-paper min-h-screen pt-28 pb-20 font-sans">
        <section className="max-w-xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="eyebrow text-xs text-primary font-bold">DELEGATE PORTAL</span>
            <h1 className="font-serif-display text-3xl font-bold text-ink mt-2">Check Your Registration</h1>
            <p className="text-sm text-ink-600 mt-2">Sign in with the email you registered with to see your status.</p>
          </div>

          <div className="bg-white border border-ink/15 shadow-sm p-8">
            {step === 1 && (
              <div>
                <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2"><Mail size={14} className="text-primary" /> Registered Email</label>
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="w-full py-2.5 px-3 border border-ink/15 text-sm focus:ring-1 focus:ring-primary focus:border-primary" placeholder="you@college.edu" />
                {error && <p className="text-primary text-xs mt-2 flex items-center gap-1 font-semibold"><AlertCircle size={12} /> {error}</p>}
                <button onClick={sendOtp} disabled={loading} className="btn-primary w-full mt-5 disabled:opacity-60">
                  {loading ? 'Sending code…' : <>Send Login Code <ArrowRight size={16} /></>}
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="text-sm text-ink-700 mb-4">Enter the 6-digit code sent to <span className="font-bold text-ink">{email}</span>.</p>
                <input inputMode="numeric" maxLength={6} value={otp} onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
                  className="w-full py-3 px-3 border border-ink/15 text-center text-2xl tracking-[0.5em] font-bold focus:ring-1 focus:ring-primary focus:border-primary" placeholder="______" />
                {error && <p className="text-primary text-xs mt-2 flex items-center gap-1 font-semibold"><AlertCircle size={12} /> {error}</p>}
                <div className="flex items-center justify-between mt-3 text-xs">
                  <button onClick={sendOtp} disabled={resendIn > 0 || loading} className="text-primary font-bold disabled:text-ink/40 bg-transparent border-none cursor-pointer p-0">
                    {resendIn > 0 ? `Resend in ${resendIn}s` : 'Resend code'}
                  </button>
                  <button onClick={() => { setStep(1); setOtp(''); setError(''); }} className="text-ink-600 font-semibold flex items-center gap-1 bg-transparent border-none cursor-pointer p-0"><ArrowLeft size={12} /> Change email</button>
                </div>
                <button onClick={verifyAndFetch} disabled={loading} className="btn-primary w-full mt-5 disabled:opacity-60">
                  {loading ? 'Checking…' : <>View My Status <ArrowRight size={16} /></>}
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                {(!regs || regs.length === 0) ? (
                  <div className="text-center py-6">
                    <Search size={32} className="text-ink-300 mx-auto mb-3" />
                    <p className="text-sm text-ink-700">No registration found for <span className="font-bold">{email}</span>.</p>
                    <a href="/cmun-connect" className="btn-primary mt-5 inline-flex">View Conference Recap <ArrowRight size={16} /></a>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {regs.map((r, i) => {
                      const ui = STATUS_UI[r['Status']] || STATUS_UI['Pending Verification'];
                      const Icon = ui.icon;
                      return (
                        <div key={i} className="border border-ink/10">
                          <div className="flex items-center justify-between bg-paper px-4 py-3 border-b border-ink/10">
                            <span className="font-mono text-xs text-ink-700">{r['Reg ID']}</span>
                            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 border ${ui.cls}`}>
                              <Icon size={11} /> {r['Status'] === 'Pending Verification' ? 'Pending' : r['Status']}
                            </span>
                          </div>
                          <div className="p-4 text-sm space-y-1.5">
                            <Row label="Name" value={r['Name']} />
                            <Row label="Committee" value={[r['Committee 1'], r['Committee 2'], r['Committee 3']].filter(Boolean).join(' · ')} />
                            <Row label="Portfolio pref." value={r['Portfolio Pref']} />
                            <Row label="Category / Fee" value={`${r['Category'] || '—'} · ₹${r['Fee (₹)'] || '—'}`} />
                            <p className={`text-xs mt-3 px-3 py-2 border ${ui.cls}`}>{ui.note}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="text-center text-xs text-ink-500 mt-6">Trouble? Email <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary font-semibold">{SUPPORT_EMAIL}</a></p>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4">
      <span className="text-ink-500 text-xs uppercase tracking-wider font-bold">{label}</span>
      <span className="text-ink text-right">{value}</span>
    </div>
  );
}
