/* Reference-matched contact page: exact business details and a practical mailto enquiry form. */
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { PageHero, PageShell } from "../components/PageShell";

export default function Contact() {
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Bridge Wax enquiry from ${form.get("name") || "website visitor"}`);
    const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\nCompany: ${form.get("company") || "Not provided"}\n\n${form.get("message")}`);
    window.location.href = `mailto:bridgewax.sales@gmail.com?subject=${subject}&body=${body}`;
  };

  return <PageShell><PageHero eyebrow="Get Started" title="Need Equipment or Technical Support?" subtitle="Contact our team of experts to discuss your requirements and find the right solution for your operation." image="/manus-storage/contact-hero_f2d9a808.webp" /><section className="section section-white"><div className="content-wrap contact-layout"><div className="contact-details"><div><span className="eyebrow">Contact Details</span><h2>Bridge Wax Ltd</h2></div><div className="contact-list"><span><MapPin size={20} /><span>Stand No. LUS/5180/5181, Chishango Road, Lusaka, Zambia</span></span><a href="tel:+260966892403"><Phone size={20} />+260 96 689 2403</a><a href="tel:+260964326839"><Phone size={20} />+260 96 432 6839</a><a href="mailto:bridgewax.sales@gmail.com"><Mail size={20} />bridgewax.sales@gmail.com</a><a href="mailto:info@bridgewax.com"><Mail size={20} />info@bridgewax.com</a><a href="https://www.bridgewax.com" target="_blank" rel="noreferrer"><Globe size={20} />www.bridgewax.com</a></div></div><div className="form-card"><h3>Send Us an Enquiry</h3><form onSubmit={submit}><div className="form-row"><input required name="name" placeholder="Full name" /><input required type="email" name="email" placeholder="Email address" /></div><input name="company" placeholder="Company" /><textarea required name="message" rows={5} placeholder="Tell us what equipment or support you need" /><button type="submit" className="button button-gold">Send Enquiry</button></form></div></div></section></PageShell>;
}
