'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

const kurumsalMenu = [
  { name: 'Vera Gayrimenkul', href: '/kurumsal/vera-gayrimenkul' },
  { name: 'Vera Grup', href: '/kurumsal/vera-grup' },
  { name: 'Hizmet Politikası', href: '/kurumsal/hizmet-politikasi' },
  { name: 'KVKK', href: '/kurumsal/kvkk' },
  
];

const hizmetlerMenu = [
  { name: 'Değerleme', href: '/hizmetler/degerleme' },
  { name: 'Danışmanlık', href: '/hizmetler/danismanlik' },
  { name: 'Analiz', href: '/hizmetler/analiz' },
];

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Kurumsal', href: '/kurumsal', dropdown: kurumsalMenu },
  { name: 'Ekibimiz', href: '/ekibimiz' },
  { name: 'Hizmetler', href: '/hizmetler', dropdown: hizmetlerMenu },
  { name: 'Referanslar', href: '/referanslar' },
  { name: 'Kariyer', href: '/kariyer' },
  { name: 'İlanlar', href: '/ilanlar' },
  { name: 'İletişim', href: '/iletisim' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-vera-600/100 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:pl-16 lg:pr-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Vera Gayrimenkul</span>
            <img className="h-12 w-auto" src="/logo.png?v=2" alt="Vera Gayrimenkul" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ana menüyü aç</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            item.dropdown ? (
              <Menu as="div" className="relative inline-block text-left" key={item.name}>
                <Menu.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-white hover:text-gray-200">
                  {item.name}
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Menu.Items className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        {item.dropdown.map((subItem) => (
                          <Menu.Item key={subItem.name}>
                            {({ active }) => (
                              <Link
                                href={subItem.href}
                                className={classNames(
                                  active ? 'bg-gray-50' : '',
                                  '-m-3 block rounded-md p-3 hover:bg-gray-50'
                                )}
                              >
                                <p className="text-base font-medium text-gray-900">{subItem.name}</p>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white hover:text-gray-200"
              >
                {item.name}
              </Link>
            )
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Vera Gayrimenkul</span>
              <img className="h-10 w-auto" src="/logo.png?v=2" alt="Vera Gayrimenkul" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Menüyü kapat</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div className="space-y-2">
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        <div className="pl-4 space-y-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
} 