interface AdContainerProps {
  /** Unique identifier for this ad placement */
  id?: string;
}

export function AdContainer({ id }: AdContainerProps) {
  // The AdSterra script is loaded globally in __root.tsx
  // This component just renders the container div where the ad will be displayed
  // The container ID format must match what the AdSterra script expects
  const containerId = id
    ? `container-${id}`
    : 'container-624ee3b4a4d6c3a00b4dc1768a217df6';

  return (
    <div className="my-6 flex justify-center">
      <div
        id={containerId}
        className="ad-container"
        style={{
          minWidth: '320px',
          minHeight: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </div>
  );
}

export default AdContainer;
