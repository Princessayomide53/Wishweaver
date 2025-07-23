// components/ThreeDModel.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const CardModel = () => {
  const { scene } = useGLTF('/model/card.glb');
  return <primitive object={scene} scale={1.5} />;
};

const ThreeDModel = () => {
  return (
    <div className='w-full h-[35rem]'>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <CardModel />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
