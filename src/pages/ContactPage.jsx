import { useState } from 'react';
import { Github, Linkedin, Mail, FileDown, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import ScrollReveal from '../components/animation/ScrollReveal';
import { StaggerContainer, StaggerItem } from '../components/animation/StaggerContainer';
import { profile } from '../data/portfolioData';

export default function ContactPage() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const fd = new FormData(e.target);
    const body = {
      name: fd.get('name'),
      email: fd.get('email'),
      message: fd.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // Guard against non-JSON responses (e.g. proxy down, HTML error page)
      const contentType = res.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || `Server error (${res.status})`);
      }

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('sent');
      e.target.reset();
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }
  return (
    <div className="space-y-5 pb-6">
      <ScrollReveal>
        <section>
          <h1 className="text-3xl font-bold">Contact</h1>
          <p className="text-textMuted mt-1 text-[15px]">Open to product engineering, AI, and research-driven opportunities.</p>
        </section>
      </ScrollReveal>

      <div className="grid lg:grid-cols-3 gap-3">
        <ScrollReveal delay={0.05} className="lg:col-span-2">
          <GlassCard className="p-5 h-full">
            <h2 className="font-semibold mb-4 text-[15px]">Contact Form</h2>
            <form className="grid gap-3" onSubmit={handleSubmit}>
              <input
                name="name"
                required
                className="rounded-lg bg-white/[0.04] px-4 py-2.5 text-sm placeholder-textMuted focus:outline-none focus:ring-1 focus:ring-white/15 focus:bg-white/[0.06] transition-all duration-220 ease-out-expo"
                placeholder="Your name"
              />
              <input
                name="email"
                required
                className="rounded-lg bg-white/[0.04] px-4 py-2.5 text-sm placeholder-textMuted focus:outline-none focus:ring-1 focus:ring-white/15 focus:bg-white/[0.06] transition-all duration-220 ease-out-expo"
                placeholder="Your email"
                type="email"
              />
              <textarea
                name="message"
                required
                className="rounded-lg bg-white/[0.04] px-4 py-2.5 text-sm min-h-36 placeholder-textMuted focus:outline-none focus:ring-1 focus:ring-white/15 focus:bg-white/[0.06] transition-all duration-220 ease-out-expo resize-none"
                placeholder="Your message"
              />

              <div className="flex items-center gap-3">
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-accent text-black font-semibold px-6 py-2.5 w-fit hover:bg-accent-hover transition-colors duration-150 shadow-lg shadow-accent/20 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {status === 'sending' && <Loader2 size={16} className="animate-spin" />}
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </motion.button>

                {status === 'sent' && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-1.5 text-sm text-accent font-medium"
                  >
                    <CheckCircle2 size={16} /> Sent!
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-1.5 text-sm text-red-400 font-medium"
                  >
                    <XCircle size={16} /> {errorMsg}
                  </motion.span>
                )}
              </div>
            </form>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <StaggerContainer className="space-y-2">
            <StaggerItem>
              <a href={`mailto:${profile.contact.email}`} className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3.5 py-3 hover:bg-white/[0.07] transition-all duration-220 ease-out-expo group">
                <Mail size={16} className="text-textMuted group-hover:text-accent transition-colors" />
                <span className="text-sm font-medium">Email Me</span>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3.5 py-3 hover:bg-white/[0.07] transition-all duration-220 ease-out-expo group">
                <Linkedin size={16} className="text-textMuted group-hover:text-accent transition-colors" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a href={profile.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3.5 py-3 hover:bg-white/[0.07] transition-all duration-220 ease-out-expo group">
                <Github size={16} className="text-textMuted group-hover:text-accent transition-colors" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </StaggerItem>
            <StaggerItem>
              <motion.a
                href={profile.contact.resumeUrl}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 rounded-full bg-accent text-black font-medium px-4 py-2.5 hover:bg-accent-hover transition-colors duration-150 shadow-lg shadow-accent/20"
              >
                <FileDown size={16} />
                <span className="text-sm">Download Resume</span>
              </motion.a>
            </StaggerItem>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </div>
  );
}
