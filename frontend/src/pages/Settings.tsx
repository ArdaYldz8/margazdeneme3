import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
                <SettingsIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ayarlar</h2>
            <p className="text-gray-500 max-w-md">
                Sistem ayarları bu sayfadan yönetilecektir.
            </p>
        </div>
    );
}
