import React from "react";
type PageHeaderProps = {
  title?: string;
  subTitle?: string;
  extra?: React.ReactNode;
  titleHeadBtn?: string;
  className?: string;
};

export const PageHeader = ({
  title,
  subTitle,
  extra,
  titleHeadBtn,
  className = "",
}: PageHeaderProps) => {
  function handleNavigate() {}
  return (
    <div className={`flex justify-between ${className}`}>
      <div className="pb-[15px] md:pb-[55px]">
        {titleHeadBtn && (
          <span className="cursor-pointer" onClick={handleNavigate}>
            <img src={titleHeadBtn} alt="" />
          </span>
        )}
        <h2 className="text-[2.125rem]  font-semibold">{title}</h2>
        <p className="text-textColor">{subTitle}</p>
      </div>
      {extra}
    </div>
  );
};
