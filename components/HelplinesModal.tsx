"use client";

import React from "react";
import { X, Phone, Globe, Shield, AlertCircle } from "lucide-react";

interface HelplinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelplinesModal: React.FC<HelplinesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const helplines = [
    {
      name: "FIA Cybercrime Wing (CCW)",
      urdu: "ایف آئی اے سائبر کرائم",
      phone: "1991",
      whatsapp: "0336-6006060",
      description: "For online harassment, blackmail, photo leaks, cyber fraud, and online stalking (24/7 National Helpline).",
      portal: "https://complaint.fia.gov.pk",
      badge: "National 24/7",
      color: "bg-rose-50 text-rose-800 border-rose-200",
    },
    {
      name: "District Consumer Protection Court & Council",
      urdu: "کنزیومر کورٹ ہیلپ لائن",
      phone: "1334 / 0800-02345",
      description: "For defective goods, online shopping fraud (Daraz/Instagram), broken warranties, and unfair services.",
      portal: "https://pcpc.punjab.gov.pk",
      badge: "Free Filing",
      color: "bg-teal-50 text-teal-800 border-teal-200",
    },
    {
      name: "Banking Mohtasib Pakistan (Banking Ombudsman)",
      urdu: "بینکنگ محتسب پاکستان",
      phone: "021-99217334-38",
      description: "For unauthorized bank transfers, ATM cash deduction failures, and Easypaisa/JazzCash fraud.",
      portal: "https://www.bankingmohtasib.gov.pk",
      badge: "Statutory",
      color: "bg-sky-50 text-sky-800 border-sky-200",
    },
    {
      name: "Provincial Labor Department",
      urdu: "ڈائریکٹوریٹ آف لیبر ویلفیئر",
      phone: "0800-02345 / 042-99204131",
      description: "For unpaid wages, illegal job termination, gratuity withholding, and workplace rights.",
      portal: "https://labour.punjab.gov.pk",
      badge: "Labor Welfare",
      color: "bg-purple-50 text-purple-800 border-purple-200",
    },
    {
      name: "Police Emergency & Safe City",
      urdu: "پولیس ایمرجنسی اور سیف سٹی",
      phone: "15",
      description: "Immediate criminal threats, extortion, extortion calls, and physical trespass.",
      portal: "https://psca.gop.pk",
      badge: "Emergency",
      color: "bg-amber-50 text-amber-800 border-amber-200",
    },
    {
      name: "Traffic Police Helpline & Grievance",
      urdu: "ٹریفک پولیس ہیلپ لائن",
      phone: "1915",
      description: "Challan dispute verification, warden grievance, and emergency road assistance.",
      portal: "https://traffic.punjab.gov.pk",
      badge: "Traffic",
      color: "bg-slate-100 text-slate-700 border-slate-300",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#fdfdfb] p-6 shadow-2xl ring-1 ring-slate-200 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/90 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-950 text-teal-300 shadow-sm">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-teal-950">
                Official Pakistani Legal &amp; Complaint Helplines
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Direct government portals, emergency numbers &amp; dispute bodies
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Helplines List */}
        <div className="mt-4 space-y-3">
          {helplines.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/90 bg-[#fcfcf9] p-3.5 transition hover:border-teal-300 hover:bg-white shadow-2xs"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                      {item.name}
                    </h4>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${item.color}`}>
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs font-serif italic text-teal-800 mt-0.5">
                    {item.urdu}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${item.phone.split(" ")[0]}`}
                    className="flex items-center gap-1.5 rounded-full bg-teal-950 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-2xs hover:bg-black transition"
                  >
                    <Phone className="h-3 w-3 text-teal-300" />
                    <span>{item.phone}</span>
                  </a>
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-600 leading-relaxed font-sans">
                {item.description}
              </p>

              {item.portal && (
                <div className="mt-2.5 flex items-center gap-2 pt-2 border-t border-slate-200/60">
                  <Globe className="h-3.5 w-3.5 text-teal-700" />
                  <a
                    href={item.portal}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-teal-800 hover:underline"
                  >
                    Official Portal: {item.portal.replace("https://", "")}
                  </a>
                  {item.whatsapp && (
                    <span className="ml-auto text-xs text-slate-500 font-medium">
                      WhatsApp: {item.whatsapp}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-4 rounded-xl bg-amber-50/80 p-3.5 text-xs text-amber-950 border border-amber-200">
          <p className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="h-4 w-4 text-amber-700 shrink-0" />
            Advice when calling:
          </p>
          <p className="mt-1 text-amber-900 leading-relaxed font-sans">
            Always ask for and note down your <strong>Diary / Complaint Reference Number</strong> and the name/designation of the officer attending your call.
          </p>
        </div>
      </div>
    </div>
  );
};

