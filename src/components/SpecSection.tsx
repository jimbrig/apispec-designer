import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface SpecSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const SpecSection: React.FC<SpecSectionProps> = ({
  id,
  title,
  icon,
  isActive,
  onToggle,
  children
}) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        {isActive ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {isActive && (
        <div className="px-4 py-3 bg-gray-50">{children}</div>
      )}
    </div>
  );
};

export default SpecSection;