import React from "react";

const ElzeroCircle: React.FC = () => {
  return (
    <div className="relative mt-30 ml-20 flex items-center justify-center w-72 h-72">
      {/* الحلقة الزرقاء */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(
            #2196f3 0deg 160deg,
            transparent 160deg 200deg,
            #2196f3 200deg 360deg
          )`,
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 18px), black calc(100% - 18px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 18px), black calc(100% - 18px))",
          transform: "scale(1.06) rotate(-20deg)",
        }}
      />

      {/* الحلقة الوردية */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(
            #e91e63 0deg 200deg,
            transparent 200deg 240deg,
            #e91e63 240deg 360deg
          )`,
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 18px), black calc(100% - 18px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 18px), black calc(100% - 18px))",
          transform: "scale(0.95) rotate(-20deg)",
        }}
      />

      {/* الدائرة الداخلية */}
      <div className="flex items-center justify-center w-60 h-60 bg-gray-200 rounded-full">
        <span className="text-2xl font-bold text-black">Elzero</span>
      </div>
    </div>
  );
};

export default ElzeroCircle;