import clsx from "clsx";
import React from "react";

const SectionDiv = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={clsx(className, "max-w-[1150px] w-full mx-auto px-5 lg:px-0")}
    >
      {children}
    </div>
  );
};

export default SectionDiv;
