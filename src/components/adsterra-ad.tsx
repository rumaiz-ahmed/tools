import { useEffect, useId, type FC } from 'react';

interface AdSenseProps {
  /** Your Google AdSense publisher ID (ca-pub-XXXXXXXXXXXX) */
  publisherId?: string;
  /** The ad slot ID from AdSense (e.g., '1234567890') */
  adSlot?: string;
  /** Ad format (default: 'display') */
  format?: 'display' | 'inarticle' | 'fluid';
  /** Ad style */
  className?: string;
}

/**
 * Google AdSense Ad Component
 * 
 * Usage:
 * 1. Get your publisher ID from https://adsense.google.com
 * 2. Create ad units in AdSense dashboard
 * 3. Pass your publisherId and adSlot to this component
 * 
 * Note: Ads will only show on production (not localhost)
 */
export const AdSenseAd: FC<AdSenseProps> = ({
  publisherId = 'ca-pub-XXXXXXXXXXXX',
  adSlot = '1234567890',
  format = 'display',
  className = 'my-6',
}) => {
  const containerId = useId();

  useEffect(() => {
    try {
      // @ts-expect-error - adsbygoogle is loaded from external script
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      // AdBlock or other issues - silently fail
      console.warn('AdSense could not load:', e);
    }
  }, []);

  return (
    <div className={`flex justify-center ${className}`}>
      <ins
        id={`adsense-${containerId.replace(/:/g, '-')}`}
        className="adsbygoogle"
        style={{
          display: 'block',
          minWidth: '320px',
          minHeight: '50px',
        }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

/**
 * @deprecated Use AdSenseAd instead. Kept for backwards compatibility.
 */
export const AdContainer = AdSenseAd;

export default AdSenseAd;
