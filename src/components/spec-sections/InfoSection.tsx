import React from 'react';
import { ExternalLink } from 'lucide-react';

interface InfoSectionProps {
  info: {
    title: string;
    version: string;
    description?: string;
    termsOfService?: string;
    contact?: {
      name?: string;
      url?: string;
      email?: string;
    };
    license?: {
      name: string;
      url?: string;
    };
    'x-logo'?: {
      url: string;
      backgroundColor?: string;
      altText?: string;
    };
  };
}

const InfoSection: React.FC<InfoSectionProps> = ({ info }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
        <div className="text-sm text-gray-600">Version: {info.version}</div>
      </div>

      {info.description && (
        <div>
          <h4 className="font-medium mb-1">Description</h4>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{info.description}</p>
        </div>
      )}

      {info['x-logo'] && (
        <div>
          <h4 className="font-medium mb-1">Logo</h4>
          <img
            src={info['x-logo'].url}
            alt={info['x-logo'].altText || 'API Logo'}
            className="max-h-16 object-contain"
            style={{ backgroundColor: info['x-logo'].backgroundColor }}
          />
        </div>
      )}

      {info.contact && Object.keys(info.contact).length > 0 && (
        <div>
          <h4 className="font-medium mb-1">Contact</h4>
          <div className="text-sm space-y-1">
            {info.contact.name && <div>{info.contact.name}</div>}
            {info.contact.email && (
              <div>
                <a href={`mailto:${info.contact.email}`} className="text-blue-600 hover:underline">
                  {info.contact.email}
                </a>
              </div>
            )}
            {info.contact.url && (
              <div>
                <a
                  href={info.contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  {info.contact.url}
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {info.license && (
        <div>
          <h4 className="font-medium mb-1">License</h4>
          <div className="text-sm">
            {info.license.url ? (
              <a
                href={info.license.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                {info.license.name}
                <ExternalLink size={14} className="ml-1" />
              </a>
            ) : (
              info.license.name
            )}
          </div>
        </div>
      )}

      {info.termsOfService && (
        <div>
          <h4 className="font-medium mb-1">Terms of Service</h4>
          <a
            href={info.termsOfService}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline flex items-center"
          >
            View Terms
            <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      )}
    </div>
  );
};

export default InfoSection;