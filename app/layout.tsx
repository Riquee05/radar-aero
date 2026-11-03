import type { Metadata } from 'next';
export const metadata:Metadata={title:'Radar Aero · O céu em movimento',description:'Aeronaves, aeroportos e trajetórias observadas no Brasil.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body style={{margin:0}}>{children}</body></html>;}
