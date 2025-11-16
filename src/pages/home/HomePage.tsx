import { useMobile } from '@/hooks/useMobile';
import MobileHome from './MobileHome';
import WebHome from './WebHome';

export default function HomePage() {
  const isMobile = useMobile();

  return isMobile ? <MobileHome /> : <WebHome />;
}
