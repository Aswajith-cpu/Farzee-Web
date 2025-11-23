import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { submitContactForm } from '../lib/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    jewellery_type: '',
    budget: '',
    message: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const jewelleryTypes = [
    'Engagement Ring',
    'Wedding Band',
    'Necklace',
    'Earrings',
    'Bracelet',
    'Custom Design',
    'Other',
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = '';

      if (imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', imageFile);
        imageUrl = 'pending_upload';
      }

      await submitContactForm({
        ...formData,
        reference_image_url: imageUrl || undefined,
      });

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        jewellery_type: '',
        budget: '',
        message: '',
      });
      setImageFile(null);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-burgundy/10 to-black pt-20 flex items-center justify-center animate-fade-in">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-black/50 border border-gold/30 p-12 animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 border border-gold/50 rounded-full mb-6">
              <CheckCircle className="text-gold" size={40} />
            </div>
            <h2 className="text-3xl font-serif text-gold mb-4">
              Thank You!
            </h2>
            <p className="text-pale-pink text-lg mb-6">
              We've received your inquiry and will be in touch within 24 hours.
            </p>
            <p className="text-white/70 mb-8">
              Our team is excited to help bring your vision to life.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-gold hover:bg-burgundy text-black hover:text-white px-8 py-3 rounded-none text-sm tracking-wider transition-all duration-300"
            >
              SEND ANOTHER INQUIRY
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-burgundy/10 to-black pt-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-serif text-gold mb-4">
            Get in Touch
          </h1>
          <p className="text-pale-pink text-lg max-w-2xl mx-auto">
            Let's create something extraordinary together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h2 className="text-3xl font-serif text-gold mb-6">
                Visit Our Atelier
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                Schedule a private consultation to discuss your vision and explore our
                collections. We welcome appointments Monday through Friday.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="bg-gold/10 border border-gold/30 p-3 group-hover:bg-gold/20 transition-colors duration-300">
                  <MapPin className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-pale-pink mb-1">Location</h3>
                  <p className="text-white/70">
                    123 Luxury Lane, Design District<br />
                    Metropolitan City, MC 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-gold/10 border border-gold/30 p-3 group-hover:bg-gold/20 transition-colors duration-300">
                  <Phone className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-pale-pink mb-1">Phone / WhatsApp</h3>
                  <p className="text-white/70">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-gold/10 border border-gold/30 p-3 group-hover:bg-gold/20 transition-colors duration-300">
                  <Mail className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-pale-pink mb-1">Email</h3>
                  <p className="text-white/70">hello@atelier-jewellery.com</p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 border border-gold/20 p-6 mt-8">
              <h3 className="text-gold text-sm tracking-widest mb-4">STUDIO HOURS</h3>
              <div className="space-y-2 text-white/70 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-pale-pink">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-pale-pink">By Appointment</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-pale-pink">Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-slide-in-right">
            <form onSubmit={handleSubmit} className="bg-black/50 border border-gold/30 p-8 space-y-6">
              <h2 className="text-2xl font-serif text-gold mb-6">
                Request Consultation
              </h2>

              {error && (
                <div className="bg-burgundy/20 border border-burgundy/50 text-pale-pink p-4 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-gold text-sm tracking-wider mb-2">
                  NAME *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/50 border border-gold/30 focus:border-gold text-white px-4 py-3 outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gold text-sm tracking-wider mb-2">
                  WHATSAPP / PHONE *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black/50 border border-gold/30 focus:border-gold text-white px-4 py-3 outline-none transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="jewellery_type" className="block text-gold text-sm tracking-wider mb-2">
                  JEWELLERY TYPE *
                </label>
                <select
                  id="jewellery_type"
                  required
                  value={formData.jewellery_type}
                  onChange={(e) => setFormData({ ...formData, jewellery_type: e.target.value })}
                  className="w-full bg-black/50 border border-gold/30 focus:border-gold text-white px-4 py-3 outline-none transition-colors"
                >
                  <option value="">Select type...</option>
                  {jewelleryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-gold text-sm tracking-wider mb-2">
                  BUDGET
                </label>
                <input
                  type="text"
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-black/50 border border-gold/30 focus:border-gold text-white px-4 py-3 outline-none transition-colors"
                  placeholder="e.g., $5,000 - $10,000"
                />
              </div>

              <div>
                <label htmlFor="reference" className="block text-gold text-sm tracking-wider mb-2">
                  REFERENCE IMAGE
                </label>
                <input
                  type="file"
                  id="reference"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full bg-black/50 border border-gold/30 focus:border-gold text-white px-4 py-3 outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gold/20 file:text-gold file:cursor-pointer hover:file:bg-gold/30"
                />
                <p className="text-white/50 text-xs mt-2">
                  Upload inspiration images or sketches (optional)
                </p>
              </div>

              <div>
                <label htmlFor="message" className="block text-gold text-sm tracking-wider mb-2">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black/50 border border-gold/30 focus:border-gold text-white px-4 py-3 outline-none transition-colors resize-none"
                  placeholder="Tell us about your vision..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold hover:bg-burgundy text-black hover:text-white py-4 rounded-none text-sm tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'SENDING...' : 'SUBMIT INQUIRY'}
              </button>

              <p className="text-white/50 text-xs text-center">
                By submitting this form, you agree to be contacted regarding your inquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
