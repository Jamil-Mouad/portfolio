import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import FadeInView from '../components/FadeInView';
import { siteConfig } from '../config/site';

const sanitize = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = sanitize(formData.name);
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Hi Mouad,\n\n${sanitize(formData.message)}\n\nFrom: ${name}\nEmail: ${sanitize(formData.email)}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative w-full py-20 md:py-28 bg-ig-bg">
      <div className="max-w-2xl mx-auto px-6 sm:px-10 lg:px-20">
        <FadeInView className="text-center mb-12">
          <p className="text-sm text-ig-text-secondary mb-4 tracking-wide">Get In Touch</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ig-text mb-4">
            Send Me a Message
          </h2>
          <p className="text-base text-ig-text-secondary">
            Have a project in mind or just want to say hi? Fill out the form and it will open your email client.
          </p>
        </FadeInView>

        <FadeInView delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm text-ig-text mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-ig-border bg-white text-ig-text text-sm focus:outline-none focus:ring-2 focus:ring-ig-text/20 transition-shadow"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-ig-text mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-ig-border bg-white text-ig-text text-sm focus:outline-none focus:ring-2 focus:ring-ig-text/20 transition-shadow"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-ig-text mb-2">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-ig-border bg-white text-ig-text text-sm focus:outline-none focus:ring-2 focus:ring-ig-text/20 transition-shadow resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <div className="text-center">
              <motion.button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 bg-ig-text text-white rounded-full text-sm font-medium hover:bg-ig-text/90 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Opening Email Client...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </FadeInView>
      </div>
    </section>
  );
};

export default ContactSection;
