// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import type { Dictionary } from "@/types";
import { CONTACT_API_ENDPOINT } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";

interface ContactFormProps {
  dict: Dictionary;
}

interface FormData {
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  facilities: string;
  industry: string;
  message: string;
  preferredDate: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  fullName: "",
  email: "",
  company: "",
  jobTitle: "",
  phone: "",
  facilities: "",
  industry: "",
  message: "",
  preferredDate: "",
};

export default function ContactForm({ dict }: ContactFormProps) {
  const { contact } = dict;
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const required: (keyof FormData)[] = [
      "fullName",
      "email",
      "company",
      "jobTitle",
    ];

    for (const field of required) {
      if (!formData[field].trim()) {
        newErrors[field] = contact.validation.required;
      }
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = contact.validation.emailInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch(CONTACT_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _gotcha: "", // honeypot
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData(initialFormData);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <SectionWrapper id="contact" className="bg-black">
        <div className="mx-auto max-w-lg rounded-2xl bg-neutral-900/60 border border-white/10 p-12 text-center shadow-2xl backdrop-blur-xl">
          <CheckCircle className="mx-auto h-16 w-16 text-accent" />
          <h2 className="mt-6 font-heading text-2xl font-bold text-white">
            {contact.title}
          </h2>
          <p className="mt-4 text-neutral-400 font-light">{contact.success}</p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="contact" className="bg-black">
      <SectionHeading title={contact.title} subtitle={contact.subtitle} light />

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-12 max-w-2xl rounded-3xl bg-neutral-900/40 border border-white/5 p-8 lg:p-12 shadow-2xl backdrop-blur-xl"
        noValidate
      >
        {/* Honeypot */}
        <input
          type="text"
          name="_gotcha"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        {status === "error" && (
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {contact.error}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label={contact.fields.fullName}
            name="fullName"
            required
            requiredLabel={contact.required}
            error={errors.fullName}
            value={formData.fullName}
            onChange={handleChange}
          />
          <FormField
            label={contact.fields.email}
            name="email"
            type="email"
            required
            requiredLabel={contact.required}
            error={errors.email}
            value={formData.email}
            onChange={handleChange}
          />
          <FormField
            label={contact.fields.company}
            name="company"
            required
            requiredLabel={contact.required}
            error={errors.company}
            value={formData.company}
            onChange={handleChange}
          />
          <FormField
            label={contact.fields.jobTitle}
            name="jobTitle"
            required
            requiredLabel={contact.required}
            error={errors.jobTitle}
            value={formData.jobTitle}
            onChange={handleChange}
          />
          <FormField
            label={contact.fields.phone}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <FormField
            label={contact.fields.facilities}
            name="facilities"
            options={contact.facilitiesOptions}
            value={formData.facilities}
            onChange={handleChange}
          />
          <FormField
            label={contact.fields.industry}
            name="industry"
            options={contact.industryOptions}
            value={formData.industry}
            onChange={handleChange}
          />
          <FormField
            label={contact.fields.preferredDate}
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <FormField
            label={contact.fields.message}
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <p className="mt-4 text-xs text-neutral-500">{contact.privacy}</p>

        <div className="mt-6">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </span>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                {contact.submit}
              </>
            )}
          </Button>
        </div>
      </form>
    </SectionWrapper>
  );
}
