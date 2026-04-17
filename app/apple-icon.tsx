import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f6efe6',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '32px',
          color: '#4a3c33',
          border: '3px solid rgba(133, 104, 79, 0.26)',
          fontFamily: 'sans-serif',
          fontSize: 104,
          fontWeight: 500,
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 999,
            border: '8px solid rgba(164, 118, 76, 0.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              backgroundColor: '#a46f47',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
