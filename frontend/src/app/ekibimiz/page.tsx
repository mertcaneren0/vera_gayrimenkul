'use client';

import { useState, useEffect } from 'react';

interface TeamMember {
  id: string;
  fullName: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

export default function EkibimizPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch team members
  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team');
      const result = await response.json();
      if (result.success) {
        setTeamMembers(result.data);
      }
    } catch (error) {
      console.error('Ekip üyeleri alınırken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ekibimiz
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Deneyimli ve profesyonel ekibimizle, gayrimenkul ihtiyaçlarınıza en uygun çözümleri sunuyoruz. 
            Her biri alanında uzman olan ekip üyelerimiz, sizlere en kaliteli hizmeti sağlamak için burada.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="mx-auto mt-20 max-w-2xl lg:mx-0 lg:max-w-none">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-vera-600"></div>
              <p className="mt-4 text-gray-500">Ekip üyeleri yükleniyor...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">Henüz ekip üyesi bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="group">
                  <div className="aspect-w-3 aspect-h-3 overflow-hidden rounded-2xl">
                    <img
                      src={member.image}
                      alt={member.fullName}
                      className="h-80 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {member.fullName}
                    </h3>
                    <p className="text-base leading-7 text-vera-600 font-medium">
                      {member.title}
                    </p>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Siz de Ekibimize Katılın
            </h3>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Gayrimenkul sektöründe kariyer yapmak istiyorsanız, profesyonel ekibimizin bir parçası olabilirsiniz.
            </p>
            <div className="mt-8">
              <a
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-md bg-vera-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-vera-700 focus:outline-none focus:ring-2 focus:ring-vera-500 focus:ring-offset-2 transition-colors duration-200"
              >
                İletişime Geçin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 