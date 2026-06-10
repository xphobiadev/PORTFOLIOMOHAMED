"use client";

import { useState } from "react";
import { createAboutSkill, updateAboutSkill, deleteAboutSkill } from "@/lib/actions/about";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";

export function SkillsEditor({ initialSkills }: { initialSkills: any[] }) {
    const [skills, setSkills] = useState<any[]>(initialSkills);
    const [isAdding, setIsAdding] = useState(false);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const [newSkill, setNewSkill] = useState({
        name_fr: "", name_en: "",
        category: "Tools"
    });

    const handleAdd = async () => {
        if (!newSkill.name_fr) return;
        try {
            await createAboutSkill({ ...newSkill, is_visible: true, sort_order: skills.length });
            setIsAdding(false);
            setNewSkill({ name_fr: "", name_en: "", category: "Tools" });
            window.location.reload();
        } catch (e) {
            alert("Failed to add skill");
        }
    };

    const handleUpdateText = async (id: string, baseField: string, value: string) => {
        const fieldName = `${baseField}_${lang}`;
        const updated = skills.map(s => s.id === id ? { ...s, [fieldName]: value } : s);
        setSkills(updated);
        await updateAboutSkill(id, { [fieldName]: value });
    };

    const handleToggle = async (id: string, current: boolean) => {
        const updated = skills.map(s => s.id === id ? { ...s, is_visible: !current } : s);
        setSkills(updated);
        await updateAboutSkill(id, { is_visible: !current });
    };

    const handleDelete = async (id: string) => {
        setSkills(skills.filter(s => s.id !== id));
        await deleteAboutSkill(id);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
                <h4 className="text-white/50">Manage skills by mapping them to predefined categories.</h4>
                <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 rounded bg-mb-gold px-4 py-2 text-xs font-bold text-black border border-mb-gold hover:bg-black hover:text-mb-gold transition-colors">
                    <Plus className="h-4 w-4" /> Add Skill
                </button>
            </div>

            <LanguageTabs currentLang={lang} onChange={setLang} />

            {isAdding && (
                <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4 flex items-end gap-4 mt-4">
                    <div className="flex-1">
                        <label className="mb-1 block text-xs text-white/50">Skill Name ({lang.toUpperCase()})</label>
                        <input {...bindField(newSkill, setNewSkill, "name")} className="w-full rounded border border-white/10 bg-black p-2 text-sm" />
                    </div>
                    <div className="flex-1">
                        <label className="mb-1 block text-xs text-white/50">Category (Universal ID)</label>
                        <select value={newSkill.category} onChange={e => setNewSkill({ ...newSkill, category: e.target.value })} className="w-full rounded border border-white/10 bg-black p-2 text-sm">
                            <option value="Tools">Tools</option>
                            <option value="Process">Process</option>
                            <option value="Frameworks">Frameworks</option>
                        </select>
                    </div>
                    <button onClick={handleAdd} className="rounded bg-white px-6 py-2 text-sm text-black font-bold">Save</button>
                </div>
            )}

            <div className="grid gap-2 sm:grid-cols-3 mt-4">
                {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3">
                        <input value={skill[`name_${lang}`] || ""} onChange={e => handleUpdateText(skill.id, "name", e.target.value)} className="bg-transparent text-sm w-32 focus:outline-none focus:border-b" />
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-mb-gold/50 mr-2">{skill.category}</span>
                            <button onClick={() => handleToggle(skill.id, skill.is_visible)} className={`mr-2 ${skill.is_visible ? 'text-green-500' : 'text-white/20'}`}><Eye size={14} /></button>
                            <button onClick={() => handleDelete(skill.id)} className="text-red-500/50 hover:text-red-500"><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
