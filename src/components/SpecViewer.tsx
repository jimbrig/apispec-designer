import React from 'react';
import { observer } from 'mobx-react-lite';
import { useApiStore } from '../stores/ApiStore';
import { 
  Info, Server, Tag, Shield, Route, Database, 
  Component, ChevronRight, ChevronDown 
} from 'lucide-react';
import SpecSection from './SpecSection';
import InfoSection from './spec-sections/InfoSection';
import ServersSection from './spec-sections/ServersSection';
import TagsSection from './spec-sections/TagsSection';
import SecuritySection from './spec-sections/SecuritySection';
import PathsSection from './spec-sections/PathsSection';
import ComponentsSection from './spec-sections/ComponentsSection';

const SpecViewer: React.FC = observer(() => {
  const apiStore = useApiStore();
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  const sections = [
    {
      id: 'info',
      title: 'API Info',
      icon: <Info size={18} />,
      content: <InfoSection info={apiStore.apiSpec.info} />
    },
    {
      id: 'servers',
      title: 'Servers',
      icon: <Server size={18} />,
      content: <ServersSection servers={apiStore.apiSpec.servers || []} />
    },
    {
      id: 'tags',
      title: 'Tags',
      icon: <Tag size={18} />,
      content: <TagsSection tags={apiStore.apiSpec.tags || []} />
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={18} />,
      content: <SecuritySection security={apiStore.apiSpec.security || []} />
    },
    {
      id: 'paths',
      title: 'Paths',
      icon: <Route size={18} />,
      content: <PathsSection paths={apiStore.apiSpec.paths || {}} />
    },
    {
      id: 'components',
      title: 'Components',
      icon: <Component size={18} />,
      content: <ComponentsSection components={apiStore.apiSpec.components || {}} />
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {sections.map((section) => (
        <SpecSection
          key={section.id}
          id={section.id}
          title={section.title}
          icon={section.icon}
          isActive={activeSection === section.id}
          onToggle={() => setActiveSection(activeSection === section.id ? null : section.id)}
        >
          {section.content}
        </SpecSection>
      ))}
    </div>
  );
});

export default SpecViewer;