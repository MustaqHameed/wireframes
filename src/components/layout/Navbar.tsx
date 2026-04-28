import React from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Globe, LogIn, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export const Navbar = ({ onStaffLogin }: { onStaffLogin: () => void }) => {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { title: t('Visitors', 'Visiteurs'), href: '#' },
    { title: t('Business', 'Affaires'), href: '#' },
    { title: t('Residents', 'Résidents'), href: '#' },
    { title: t('Town Hall', 'Hôtel de Ville'), href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-tighter text-primary">
              Annapolis Royal
            </span>
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink href={item.href} className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 border-l pl-6 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'FR' : 'EN'}</span>
            </Button>
            <Button variant="outline" size="sm" onClick={onStaffLogin} className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>{t('Staff Portal', 'Portail Staff')}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-2">
           <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            >
              <Globe className="h-4 w-4" />
            </Button>
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              }
            />
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <a key={item.title} href={item.href} className="text-lg font-medium hover:text-primary">
                    {item.title}
                  </a>
                ))}
                <Separator />
                <Button variant="outline" onClick={onStaffLogin} className="w-full justify-start gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>{t('Staff Portal', 'Portail Staff')}</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const Separator = () => <div className="h-px w-full bg-border" />;
