import React from 'react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">LADY.</h3>
            <p className="text-sm text-muted-foreground">
              Luxury Iraqi Fashion.
            </p>
          </div>
          {/* Links can go here */}
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © 2024 LADY. All rights reserved. IQD / COD.
        </div>
      </div>
    </footer>
  );
}
