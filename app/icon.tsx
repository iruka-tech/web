import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
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
          borderRadius: '6px',
          color: '#4a3c33',
          border: '1px solid rgba(133, 104, 79, 0.26)',
          fontFamily: 'sans-serif',
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            border: '2px solid rgba(164, 118, 76, 0.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
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
