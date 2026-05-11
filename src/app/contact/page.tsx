"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";

const CONTACT_METHODS = [
  {
    icon: <Mail size={28} />,
    title: "Email Us",
    details: ["info@saltcity.church", "support@saltcity.church"],
    href: "mailto:info@saltcity.church",
  },
  {
    icon: <Phone size={28} />,
    title: "Call Us",
    details: ["+234 803 059 7015", "Mon-Fri, 9AM-5PM WAT"],
    href: "tel:+2348030597015",
  },
  {
    icon: <MessageCircle size={28} />,
    title: "WhatsApp",
    details: ["+234 803 059 7015", "Quick responses"],
    href: "https://wa.me/2348030597015",
  },
  {
    icon: <MapPin size={28} />,
    title: "Visit Us",
    details: ["20 Okumagba Ave, Warri", "Delta State, Nigeria"],
    href: "/locations",
  },
];

export default function ContactPage() {
  const [subject, setSubject] = useState("General Inquiry");
  const isCounselling = subject === "Counselling";
  const [showPrivacy, setShowPrivacy] = useState(false);

  // form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",

    // counselling fields
    alternatePhone: "",
    preferredTime: "",
    membershipStatus: "",
    unit: "",
    duration: "",
    areas: [] as string[],
    urgency: "",
    mode: "",
    counselor: "",
    additionalInfo: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (value: string) => {
    setForm((prev) => {
      const exists = prev.areas.includes(value);
      return {
        ...prev,
        areas: exists
          ? prev.areas.filter((x) => x !== value)
          : [...prev.areas, value],
      };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      formType: isCounselling ? "counseling" : "general",

      fullName: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      message: form.message,

      alternatePhone: form.alternatePhone,
      membershipStatus: form.membershipStatus,
      unit: form.unit,
      duration: form.duration,
      areas: form.areas,
      urgency: form.urgency,
      mode: form.mode,
      preferredTime: form.preferredTime,
      counselor: form.counselor,
      additionalInfo: form.additionalInfo,
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxLoWAaKFqZc4imlNA4GjconlLYsJmeF4pzltYtpJmWGHI3pbBGlYSBS9pi2T149N4c/exec?key=THIS_IS_TO_TEST_SALTCITY", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      alert("Message sent successfully");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 to-black">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              We'd love to hear from you. Whether you have a question, need prayer, or want to get involved, we're here to help.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {CONTACT_METHODS.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group bg-neutral-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-xl bg-black/5 group-hover:bg-black group-hover:text-white flex items-center justify-center mx-auto mb-6 transition-colors">
                  {method.icon}
                </div>
                <h3 className="font-bold text-lg mb-3">{method.title}</h3>
                {method.details.map((detail, i) => (
                  <p key={i} className="text-sm text-black/70">
                    {detail}
                  </p>
                ))}
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-neutral-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-black mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full px-4 py-3.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-shadow"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-3.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-shadow"
                  >
                    <option>General Inquiry</option>
                    <option>Prayer Request</option>
                    <option>Counselling</option>
                    <option>Partnership</option>
                    <option>Volunteering</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  {!isCounselling ? (
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3.5 rounded-xl border border-black/10 resize-none"
                      placeholder="Your message..."
                    />
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold mb-2">
                          Why are you seeking counselling?
                        </label>
                        <textarea
                          name="additionalInfo"
                          value={form.additionalInfo}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3.5 rounded-xl border border-black/10 resize-none"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          name="alternatePhone"
                          value={form.alternatePhone}
                          onChange={handleChange}
                          className="px-4 py-3.5 rounded-xl border border-black/10"
                          placeholder="Alternate phone number (optional)"
                        />
                        <input
                          name="preferredTime"
                          value={form.preferredTime}
                          onChange={handleChange}
                          className="px-4 py-3.5 rounded-xl border border-black/10"
                          placeholder="Preferred day/time"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-2">
                          Are you a member of SaltCity?
                        </label>
                        <div className="flex gap-6 text-sm">
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="membershipStatus" 
                              value="Yes" 
                              onChange={handleChange}
                            /> 
                            Yes
                          </label>
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="membershipStatus" 
                              value="No" 
                              onChange={handleChange}
                            /> 
                            No
                          </label>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <input 
                          name="unit"
                          value={form.unit}
                          onChange={handleChange}
                          className="px-4 py-3.5 rounded-xl border border-black/10" 
                          placeholder="Unit / Group" 
                        />
                        <input 
                          name="duration"
                          value={form.duration}
                          onChange={handleChange}
                          className="px-4 py-3.5 rounded-xl border border-black/10" 
                          placeholder="How long?" 
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-2">Area of concern</label>
                        <div className="grid sm:grid-cols-2 gap-2 text-sm">
                          {["Spiritual", "Family/Marriage", "Emotional/Mental", "Academic/Career", "Financial", "Other"].map((x) => (
                            <label key={x} className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                onChange={() => handleCheckbox(x)}
                              />
                              {x}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-2">Urgency</label>
                        <div className="space-y-2 text-sm">
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="urgency" 
                              value="Urgent" 
                              onChange={handleChange}
                            /> 
                            Urgent
                          </label>
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="urgency" 
                              value="Moderate" 
                              onChange={handleChange}
                            /> 
                            Moderate
                          </label>
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="urgency" 
                              value="Not urgent" 
                              onChange={handleChange}
                            /> 
                            Not urgent
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-2">Preferred mode</label>
                        <div className="flex gap-6 text-sm">
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="mode" 
                              value="In-person" 
                              onChange={handleChange}
                            /> 
                            In-person
                          </label>
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="mode" 
                              value="Phone" 
                              onChange={handleChange}
                            /> 
                            Phone
                          </label>
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="mode" 
                              value="Online" 
                              onChange={handleChange}
                            /> 
                            Online
                          </label>
                        </div>
                      </div>

                      <input
                        name="counselor"
                        value={form.counselor}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-black/10"
                        placeholder="Preferred counselor (optional)"
                      />

                      <div className="rounded-xl bg-neutral-50 border border-black/10 p-5 text-sm space-y-4">
                        <p className="font-bold text-black">Consent & Confidentiality</p>

                        <p className="text-black/70">
                          By submitting this counselling request, you acknowledge that the information shared
                          may include sensitive personal and spiritual matters. This will be handled confidentially
                          by SaltCity Church in accordance with our Privacy Policy.
                        </p>

                        <button
                          type="button"
                          onClick={() => setShowPrivacy(true)}
                          className="text-sm font-semibold underline text-black"
                        >
                          View Privacy Policy
                        </button>

                        <label className="flex items-start gap-3 font-semibold text-black">
                          <input type="checkbox" required className="mt-1" />
                          I have read and agree to the Privacy Policy and consent to counselling support.
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3.5 rounded-full bg-black text-white font-semibold hover:bg-black/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Office Hours */}
      <section className="py-20 bg-neutral-900">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6 text-white">
              <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Clock size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black mb-4">Office Hours</h2>
                <div className="space-y-2 text-white/80">
                  <p><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM (WAT)</p>
                  <p><strong>Saturday:</strong> Closed</p>
                  <p><strong>Sunday:</strong> Service times only</p>
                </div>
                <p className="mt-4 text-white/60 text-sm">
                  For urgent matters outside office hours, please call or WhatsApp our emergency line.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}