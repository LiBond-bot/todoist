import { FC } from "react";

export const Title: FC<{
  titleName: string;
  fontSize: "text-3xl" | "text-2xl" | "text-xl" | "text-lg" | "text-base";
}> = ({ titleName, fontSize }) => {
  return (
    <>
      <div className={"pb-4 font-sans font-bold " + fontSize}>{titleName}</div>
    </>
  );
};
