import React from "react";

type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="px-[10px] py-[10px] md:py-[30px] md:px-[36px] bg-[#fbf9f0]">
      {children}
    </div>
  );
};
