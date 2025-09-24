"use client";
import React, { useState } from "react";

const defaultPlan = {
  location: "",
  familySize: 1,
  specialNeeds: "",
  emergencyContacts: "",
  pets: false,
};

export default function EmergencyPlanPage() {
  const [form, setForm] = useState(defaultPlan);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let fieldValue: string | number | boolean = value;
    if (type === "checkbox") {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const planSummary = (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-6 shadow">
      <h2 className="text-xl font-bold mb-2 text-green-700">Your Personalized Emergency Plan</h2>
      <ul className="list-disc ml-6 text-gray-700 space-y-1">
        <li><b>Location:</b> {form.location}</li>
        <li><b>Family Size:</b> {form.familySize}</li>
        {form.specialNeeds && <li><b>Special Needs:</b> {form.specialNeeds}</li>}
        {form.emergencyContacts && <li><b>Emergency Contacts:</b> {form.emergencyContacts}</li>}
        <li><b>Pets:</b> {form.pets ? "Yes" : "No"}</li>
      </ul>
      <p className="mt-4 text-sm text-gray-500">Download or print this plan and keep it accessible for all family members.</p>
    </div>
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-10">
      <div className="w-full max-w-xl p-8 rounded-3xl shadow-2xl bg-white/90 border border-blue-100">
        <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">Personalized Emergency Plan</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1 text-green-700">Location <span className="text-red-500">*</span></label>
            <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="e.g. 123 Main St, Mumbai" className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 bg-green-50 placeholder-gray-400 transition-all" />
            <span className="text-xs text-gray-500">Enter your home or primary residence address.</span>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-green-700">Family Size <span className="text-red-500">*</span></label>
            <input type="number" name="familySize" min={1} value={form.familySize} onChange={handleChange} required placeholder="e.g. 4" className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 bg-green-50 placeholder-gray-400 transition-all" />
            <span className="text-xs text-gray-500">Total number of people in your household.</span>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-green-700">Special Needs <span className="text-gray-400">(optional)</span></label>
            <textarea name="specialNeeds" value={form.specialNeeds} onChange={handleChange} placeholder="e.g. wheelchair access, medication needs" className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 bg-green-50 placeholder-gray-400 transition-all resize-none min-h-[48px]" />
            <span className="text-xs text-gray-500">Mention any medical, mobility, or other special requirements.</span>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-green-700">Emergency Contacts <span className="text-gray-400">(optional)</span></label>
            <textarea name="emergencyContacts" value={form.emergencyContacts} onChange={handleChange} placeholder="e.g. 9876543210 (Dad), 100 (Police)" className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 bg-green-50 placeholder-gray-400 transition-all resize-none min-h-[48px]" />
            <span className="text-xs text-gray-500">Add important phone numbers for quick access.</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="pets" checked={form.pets} onChange={handleChange} id="pets" className="accent-green-600 w-5 h-5" />
            <label htmlFor="pets" className="font-semibold text-green-700">Include Pets</label>
            <span className="text-xs text-gray-500">Check if you have pets to include in your plan.</span>
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-green-700 hover:to-blue-700 transition-all text-lg tracking-wide">Generate Plan</button>
        </form>
        {submitted && planSummary}
      </div>
    </div>
  );
}
