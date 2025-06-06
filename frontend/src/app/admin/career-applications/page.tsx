'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';

// Başvuru durumu renkleri ve ikonları
const statusConfig = {
  'Beklemede': {
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    icon: Clock,
  },
  'İncelendi': {
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Eye,
  },
  'Reddedildi': {
    color: 'bg-red-50 text-red-700 border-red-200',
    icon: XCircle,
  },
  'Kabul Edildi': {
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: CheckCircle,
  },
};

// Örnek veri (backend entegrasyonu sonrası kaldırılacak)
const mockApplications = [
  {
    id: 1,
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '0532 123 4567',
    address: 'Kadıköy, İstanbul',
    gender: 'Erkek',
    cvUrl: '/cvs/ahmet-yilmaz.pdf',
    status: 'Beklemede',
    notes: 'İlk görüşme yapılacak',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  },
  // Daha fazla örnek veri eklenebilir
];

export default function CareerApplicationsPage() {
  const router = useRouter();
  const [selectedApplication, setSelectedApplication] = useState<typeof mockApplications[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const handleViewApplication = (application: typeof mockApplications[0]) => {
    setSelectedApplication(application);
    setIsViewModalOpen(true);
  };

  const handleStatusChange = async (applicationId: number, newStatus: string) => {
    // Backend entegrasyonu sonrası implement edilecek
    console.log(`Başvuru ${applicationId} durumu ${newStatus} olarak güncellendi`);
  };

  const handleAddNote = async (applicationId: number, note: string) => {
    // Backend entegrasyonu sonrası implement edilecek
    console.log(`Başvuru ${applicationId} için not eklendi: ${note}`);
  };

  // Filtreleme ve arama
  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = 
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm);
    
    const matchesStatus = !statusFilter || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Başlık ve Filtreler */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Kariyer Başvuruları</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Arama */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Ad, soyad, e-posta veya telefon ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Durum Filtresi */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
            >
              <option value="">Tüm Durumlar</option>
              <option value="Beklemede">Beklemede</option>
              <option value="İncelendi">İncelendi</option>
              <option value="Reddedildi">Reddedildi</option>
              <option value="Kabul Edildi">Kabul Edildi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Başvurular Tablosu */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Ad Soyad</TableHead>
                <TableHead className="font-semibold">E-posta</TableHead>
                <TableHead className="font-semibold">Telefon</TableHead>
                <TableHead className="font-semibold">Başvuru Tarihi</TableHead>
                <TableHead className="font-semibold">Durum</TableHead>
                <TableHead className="font-semibold text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => {
                const StatusIcon = statusConfig[application.status as keyof typeof statusConfig].icon;
                return (
                  <TableRow key={application.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {`${application.firstName} ${application.lastName}`}
                    </TableCell>
                    <TableCell className="text-gray-600">{application.email}</TableCell>
                    <TableCell className="text-gray-600">{application.phone}</TableCell>
                    <TableCell className="text-gray-600">
                      {format(application.createdAt, 'dd MMMM yyyy', { locale: tr })}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`${statusConfig[application.status as keyof typeof statusConfig].color} border px-3 py-1 rounded-full flex items-center gap-1.5`}
                      >
                        <StatusIcon className="h-4 w-4" />
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewApplication(application)}
                        className="flex items-center gap-1.5 hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4" />
                        Detay
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Başvuru Detay Modalı */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Başvuru Detayları
            </DialogTitle>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-6">
              {/* Kişisel Bilgiler */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kişisel Bilgiler</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ad Soyad</label>
                    <p className="mt-1 text-gray-900">{`${selectedApplication.firstName} ${selectedApplication.lastName}`}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">E-posta</label>
                    <p className="mt-1 text-gray-900">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Telefon</label>
                    <p className="mt-1 text-gray-900">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Cinsiyet</label>
                    <p className="mt-1 text-gray-900">{selectedApplication.gender}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Adres</label>
                    <p className="mt-1 text-gray-900">{selectedApplication.address}</p>
                  </div>
                </div>
              </div>

              {/* CV ve Durum */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">CV</h3>
                  {selectedApplication.cvUrl ? (
                    <a
                      href={selectedApplication.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500"
                    >
                      <FileText className="h-5 w-5" />
                      <span>CV'yi Görüntüle</span>
                    </a>
                  ) : (
                    <p className="text-gray-500">CV yüklenmemiş</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Başvuru Durumu</h3>
                  <select
                    value={selectedApplication.status}
                    onChange={(e) => handleStatusChange(selectedApplication.id, e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="Beklemede">Beklemede</option>
                    <option value="İncelendi">İncelendi</option>
                    <option value="Reddedildi">Reddedildi</option>
                    <option value="Kabul Edildi">Kabul Edildi</option>
                  </select>
                </div>
              </div>

              {/* Notlar */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notlar</h3>
                <textarea
                  value={selectedApplication.notes || ''}
                  onChange={(e) => handleAddNote(selectedApplication.id, e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Başvuru ile ilgili notlar..."
                />
              </div>

              {/* Tarih Bilgileri */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500 bg-gray-50 rounded-lg p-6">
                <div>
                  <span className="font-medium">Başvuru Tarihi: </span>
                  {format(selectedApplication.createdAt, 'dd MMMM yyyy HH:mm', { locale: tr })}
                </div>
                <div>
                  <span className="font-medium">Son Güncelleme: </span>
                  {format(selectedApplication.updatedAt, 'dd MMMM yyyy HH:mm', { locale: tr })}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 