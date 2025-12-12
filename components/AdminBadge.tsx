import React from 'react';
import { Pencil } from 'lucide-react';

interface AdminBadgeProps {
  label?: string;
  className?: string;
}

const AdminBadge: React.FC<AdminBadgeProps> = ({ label = "Update me", className = "" }) => {
  return (
    <span className={`inline-flex items-center gap-1 bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-200 ml-2 cursor-help select-none ${className}`} title="This is placeholder data. Admins should update this.">
      <Pencil size={10} />
      {label}
    </span>
  );
};

export default AdminBadge;
