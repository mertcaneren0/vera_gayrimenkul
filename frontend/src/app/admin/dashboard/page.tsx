"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  HomeIcon, 
  BriefcaseIcon, 
  UserGroupIcon, 
  ClipboardDocumentListIcon 
} from "@heroicons/react/24/outline";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Burada ileride auth kontrolü yapılacak
  useEffect(() => {
    // Eğer giriş yapılmamışsa login sayfasına yönlendir
    // (Şimdilik sahte kontrol, ileride gerçek auth ile değiştirilecek)
    // if (!isLoggedIn) router.push("/admin/login");
  }, [router]);

  const actions = [
    {
      title: "İlan Ekle/Düzenle",
      description: "Gayrimenkul ilanlarını yönetin, yeni ilan ekleyin veya mevcut ilanları düzenleyin",
      icon: HomeIcon,
      href: "/admin/listings",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Kariyer Başvuruları",
      description: "Kariyer sayfasına yapılan başvuruları görüntüleyin ve yönetin",
      icon: BriefcaseIcon,
      href: "/admin/career-applications",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Ekibi Düzenle",
      description: "Vera Grup ekibini yönetin, yeni üye ekleyin veya mevcut üyeleri düzenleyin",
      icon: UserGroupIcon,
      href: "/admin/team",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "İlan Başvuruları",
      description: "Gayrimenkul ilanlarına yapılan başvuruları görüntüleyin ve yönetin",
      icon: ClipboardDocumentListIcon,
      href: "/admin/listing-applications",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Paneli
          </h1>
          <p className="mt-2 text-gray-600">
            Vera Grup Gayrimenkul yönetim paneli
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {actions.map((action) => (
            <button
              key={action.title}
              onClick={() => router.push(action.href)}
              className={`relative group rounded-lg p-6 text-left transition-all duration-200 ${action.color} shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <action.icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">
                    {action.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/90">
                    {action.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-sm font-medium text-white/90 group-hover:text-white">
                  Yönet →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 