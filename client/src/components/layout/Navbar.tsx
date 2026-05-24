import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShoppingBag, User as UserIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const items = useCartStore((state) => state.items);
  const { user, logout } = useAuthStore();

  const toggleLang = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">LADY.</span>
        </Link>



        {/* Actions */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <Button variant="ghost" size="sm" onClick={toggleLang}>
            {i18n.language === 'ar' ? 'English' : 'العربية'}
          </Button>

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm hidden md:inline-block">{user.name}</span>
              <Button variant="ghost" size="icon" onClick={() => logout()}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <UserIcon className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
