import { FileText } from 'lucide-react';

export function Reports() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="bg-blue-50 p-6 rounded-full mb-4">
                <FileText className="h-12 w-12 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Raporlar Sayfası Hazırlanıyor</h2>
            <p className="text-gray-500 max-w-md">
                Bu modül henüz geliştirme aşamasındadır. Yakında detaylı raporlama özellikleri eklenecektir.
            </p>
        </div>
    );
}
