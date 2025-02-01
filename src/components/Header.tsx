import { Plane, Search, Bell, Menu } from "lucide-react";

export const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="flex items-center gap-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                FlightBoard
              </span>
            </div>
          </div>

          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border-0 bg-gray-50 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Search flights..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <button className="rounded-full bg-gray-50 p-2 text-gray-500 hover:text-gray-600">
              <Bell className="h-5 w-5" />
            </button>
            <button className="rounded-full bg-gray-50 p-2 text-gray-500 hover:text-gray-600">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
