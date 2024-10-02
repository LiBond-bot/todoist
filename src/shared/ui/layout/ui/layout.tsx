import React, { FC } from "react";

export const Layout: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="px-8 pb-8">{children}</div>;
};
