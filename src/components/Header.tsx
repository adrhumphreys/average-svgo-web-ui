type Tab = {
  name: string;
  key: string;
};

type Props = {
  tabs: Array<Tab>;
  activeTab: string;
  setActiveTab: (arg0: string) => void;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ tabs, activeTab, setActiveTab }: Props) => {
  return (
    <div className="border-b border-gray-200">
      <div className="sm:flex sm:items-baseline pt-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          SVGO GUI
        </h3>
        <div className="mt-4 sm:mt-0 sm:ml-10">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={classNames(
                  tab.key === activeTab
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={tab.name === activeTab ? "page" : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
