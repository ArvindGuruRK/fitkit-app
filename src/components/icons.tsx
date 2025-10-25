import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path d="M228.43,105.48,151.87,25.36a16,16,0,0,0-23.74,0L49.57,105.48a16,16,0,0,0,0,23.74l78.56,80.12a16,16,0,0,0,23.74,0l78.56-80.12A16,16,0,0,0,228.43,105.48ZM140,185.1,64.89,128,140,70.9,215.11,128Z"></path>
    </svg>
  ),
  running: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.33 16.03h3.21a2 2 0 0 0 1.8-1.1l1.41-3.51a2.1 2.1 0 0 0 .1-.55c0-.63-.26-1.23-.74-1.66l-1.92-1.74a2.27 2.27 0 0 0-1.68-.67h-4.2a2 2 0 0 0-2 2v2.5a.5.5 0 0 1-1 0V10a2 2 0 0 0-2-2H2.5"/><path d="m3.5 10-1.2 5.3a2 2 0 0 0 2 2.7h5.1"/><circle cx="12" cy="5" r="1"/><path d="M16 19.5 14 22l-1.5-1.5"/></svg>
  ),
  yoga: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.6 10c.8-.8.8-2 0-2.8l-1.8-1.8a2 2 0 0 0-2.8 0l-4.4 4.4c-.8.8-.8 2 0 2.8l1.8 1.8a2 2 0 0 0 2.8 0Z"/><path d="M12 12 6.4 6.4"/><path d="m11.5 21.5 3.4-3.4"/><path d="m5.5 15.5 3.4-3.4"/><path d="M18 12.5a4.5 4.5 0 1 1-6.4-6.4 4.5 4.5 0 0 1 6.4 6.4Z"/><path d="M14 2H9"/><path d="M22 10V5"/><path d="M2 14h5"/><path d="M10 22v-5"/></svg>
  ),
  weightlifting: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 6h12"/><path d="M12 6V4"/><path d="M10 4h4"/><rect width="4" height="6" x="2" y="14" rx="1"/><rect width="4" height="6" x="18" y="14" rx="1"/><path d="M6 16.5h12"/><path d="M12 12V6"/><path d="M10.4 12a2 2 0 1 0 3.2 0"/></svg>
  ),
};
