import React from "react";
import { Search, Plus } from "lucide-react";

export function DataTable({
    title,
    description,
    data,
    columns,
    onAdd,
    onEdit,
    onDelete
}: {
    title: string;
    description: string;
    data: any[];
    columns: { key: string; label: string; render?: (val: any, row: any) => React.ReactNode }[];
    onAdd?: () => void;
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
}) {
    const [search, setSearch] = React.useState("");

    const filteredData = data.filter((row) =>
        Object.values(row).some((val) =>
            String(val).toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-display text-4xl font-bold">{title}</h1>
                    <p className="mt-2 text-white/45">{description}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-10 w-64 rounded-full border border-white/10 bg-[#161616] pl-10 pr-4 text-sm text-white outline-none focus:border-mb-gold/50"
                        />
                    </div>
                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-mb-gold px-5 text-sm font-medium text-black hover:bg-mb-gold2"
                        >
                            <Plus size={16} />
                            Add New
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#121212]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-white/40">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key} className="px-6 py-4 font-medium uppercase tracking-wider">
                                        {col.label}
                                    </th>
                                ))}
                                {(onEdit || onDelete) && (
                                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-right">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredData.map((row, i) => (
                                <tr key={row.id || i} className="transition-colors hover:bg-white/[0.02]">
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-6 py-4">
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </td>
                                    ))}
                                    {(onEdit || onDelete) && (
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                {onEdit && (
                                                    <button
                                                        onClick={() => onEdit(row)}
                                                        className="text-white/40 transition hover:text-mb-gold"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        onClick={() => onDelete(row)}
                                                        className="text-white/40 transition hover:text-mb-red"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-white/40">
                                        No data found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
