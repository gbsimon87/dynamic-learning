import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/theme-context';
import './BrandMark.css';

export default function BrandMark({ className = '' }) {
  const { theme } = useContext(ThemeContext) ?? {};
  const src = theme === 'dark' ? '/bix-logo-dark.svg' : '/bix-logo.svg';
  const [failedSrc, setFailedSrc] = useState(null);
  const failed = failedSrc === src;

  return (
    <span className={`brand-mark ${className}${failed ? ' is-fallback' : ''}`} aria-hidden="true">
      {failed ? 'LB' : (
        <img src={src} alt="" width="46" height="46" onError={() => setFailedSrc(src)} />
      )}
    </span>
  );
}
