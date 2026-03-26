import { Bell, Moon, Shield, HelpCircle, ChevronRight, Globe, Lock } from 'lucide-react';

const SettingsView = () => {
  const sections = [
    {
      title: "Account",
      items: [
        { icon: Shield, label: "Security", description: "Fingerprint, Security alerts" },
        { icon: Lock, label: "Privacy", description: "Last seen, Profile photo" },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", description: "Messages, Group & call tones" },
        { icon: Moon, label: "Dark Mode", description: "Off", hasToggle: true },
        { icon: Globe, label: "App Language", description: "English" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", description: "FAQ, Contact us" },
      ]
    }
  ];

  return (
    <div className="w-full md:w-[350px] bg-white border-r border-gray-100 flex flex-col h-full shrink-0 overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-text-primary mb-8">Settings</h1>
        
        <div className="space-y-8 overflow-y-auto scrollbar-hide pb-20">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest pl-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    className="w-full flex items-center p-3 rounded-2xl hover:bg-bg-main transition-all group lg:hover:pl-4 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-bg-main group-hover:bg-white rounded-xl flex items-center justify-center text-text-secondary group-hover:text-primary shadow-sm mr-4 transition-all">
                      <item.icon size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-text-primary">{item.label}</p>
                      <p className="text-[11px] text-text-secondary">{item.description}</p>
                    </div>
                    {item.hasToggle ? (
                      <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                      </div>
                    ) : (
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-all" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
