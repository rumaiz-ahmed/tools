import { useEffect } from 'react';

export default function AdContainer() {
  useEffect(() => {
    // Load the external script
    const script = document.createElement('script');
    script.src =
      'https://pl28795298.effectivegatecpm.com/624ee3b4a4d6c3a00b4dc1768a217df6/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return <div id="container-624ee3b4a4d6c3a00b4dc1768a217df6"></div>;
}
