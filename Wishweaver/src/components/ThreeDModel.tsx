// components/ThreeDModel.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, useGLTF } from '@react-three/drei';

const CardModel = () => {
  const { scene } = useGLTF('/model/card.glb');
  return <primitive object={scene} scale={1.5} />;
};

const ThreeDModel = ({ message }: { message: string }) => {
  const getFontSize = (msg: string) => {
    if (msg.length < 20) return 0.3;
    if (msg.length < 40) return 0.22;
    if (msg.length < 60) return 0.18;
    return 0.15;
  };
  return (
    <div className='w-full h-[35rem]'>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <CardModel />

          {message && (
            <Text
              position={[0, 0.5, 0.1]}
              fontSize={getFontSize(message)}
              color='black'
              anchorX='center'
              anchorY='middle'
              maxWidth={1.2}
              lineHeight={1.2}
              textAlign='center'
            >
              {message}
            </Text>
          )}
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
