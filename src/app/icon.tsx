import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 120,
  height: 60,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 36,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontFamily: 'serif',
          color: 'transparent',
          backgroundImage: 'linear-gradient(99.37deg, #AF7413 4.77%, #C98C28 19.33%, #E2B744 38.93%, #FFED81 50.54%, #E1C24E 62.1%, #A06008 90.74%)',
          backgroundClip: 'text',
        }}
      >
        Closeté
      </div>
    ),
    {
      ...size,
    }
  );
}
