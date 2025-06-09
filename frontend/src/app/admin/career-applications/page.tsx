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
import { CheckCircleIcon, XCircleIcon, EyeIcon } from '@heroicons/react/24/outline';

interface CareerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  listingTitle: string;
  cvUrl: string;
  applicationDate: string;
  status: 'pending' | 'reviewed' | 'rejected';
  notes?: string;
}

export default function CareerApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<CareerApplication | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const getStatusBadgeColor = (status: CareerApplication['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: CareerApplication['status']) => {
    switch (status) {
      case 'pending':
        return 'İncelenmedi';
      case 'reviewed':
        return 'İncelendi';
      case 'rejected':
        return 'Reddedildi';
      default:
        return 'Bilinmiyor';
    }
  };

  const handleStatusChange = (applicationId: string, newStatus: CareerApplication['status']) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  // Filtreleme ve arama
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      `${app.fullName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm);
    
    const matchesStatus = !statusFilter || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">İlan Başvuruları</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
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

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
            >
              <option value="">Tüm Durumlar</option>
              <option value="pending">İncelenmedi</option>
              <option value="reviewed">İncelendi</option>
              <option value="rejected">Reddedildi</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Başvuran</TableHead>
                <TableHead className="font-semibold">İlan</TableHead>
                <TableHead className="font-semibold">Başvuru Tarihi</TableHead>
                <TableHead className="font-semibold">Durum</TableHead>
                <TableHead className="font-semibold text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-gray-500">
                    Henüz başvuru bulunmuyor.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((application) => {
                  return (
                    <TableRow key={application.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {application.fullName}
                      </TableCell>
                      <TableCell className="text-gray-600">{application.listingTitle}</TableCell>
                      <TableCell className="text-gray-600">
                        {format(new Date(application.applicationDate), 'dd MMMM yyyy', { locale: tr })}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(application.status)}`}>
                          {getStatusText(application.status)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedApplication(application);
                            setIsDetailModalOpen(true);
                          }}
                          className="flex items-center gap-1.5 hover:bg-gray-50"
                        >
                          <EyeIcon className="h-4 w-4" />
                          Detay
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {isDetailModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-medium">Başvuru Detayları</h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Kapat</span>
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">İsim Soyisim</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedApplication.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">E-posta</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedApplication.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Telefon</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedApplication.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Başvuru Tarihi</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {format(new Date(selectedApplication.applicationDate), 'dd MMMM yyyy', { locale: tr })}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Başvurulan İlan</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedApplication.listingTitle}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Durum</label>
                  <span className={`mt-1 inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${getStatusBadgeColor(selectedApplication.status)}`}>
                    {getStatusText(selectedApplication.status)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">CV/Özgeçmiş</label>
                <a
                  href={selectedApplication.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  CV'yi Görüntüle
                </a>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notlar
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Başvuru hakkında notlar..."
                  value={selectedApplication.notes || ''}
                  onChange={(e) => {
                    setSelectedApplication({
                      ...selectedApplication,
                      notes: e.target.value
                    });
                  }}
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Kapat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Notları kaydet
                    setIsDetailModalOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-vera-600 border border-transparent rounded-md hover:bg-vera-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vera-500"
                >
                  Notları Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 