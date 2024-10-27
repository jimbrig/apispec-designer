import React from 'react';
import { Tag as TagIcon } from 'lucide-react';

interface Tag {
  name: string;
  description?: string;
  externalDocs?: {
    description?: string;
    url: string;
  };
}

interface TagsSectionProps {
  tags: Tag[];
}

const TagsSection: React.FC<TagsSectionProps> = ({ tags }) => {
  if (!tags.length) {
    return (
      <div className="text-sm text-gray-500">
        No tags defined.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tags.map((tag) => (
        <div key={tag.name} className="border rounded-md p-3">
          <div className="flex items-center space-x-2 mb-2">
            <TagIcon size={16} />
            <span className="font-medium">{tag.name}</span>
          </div>
          {tag.description && (
            <p className="text-sm text-gray-600 mb-2">{tag.description}</p>
          )}
          {tag.externalDocs && (
            <a
              href={tag.externalDocs.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              {tag.externalDocs.description || 'External documentation'}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default TagsSection;