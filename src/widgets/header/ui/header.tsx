import { FC } from "react";

// Ui
import imgLogo from "shared/assets/img/done.png";

export const Header: FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => {
  return (
    <div className="flex justify-between pb-8 pt-6">
      <div className="flex items-center">
        <div className="mr-3 w-12">
          <img src={imgLogo} />
        </div>
        <div>
          <div className="font-sans text-2xl font-bold">{title}</div>
          <p className="font-sans text-sm">{subtitle}</p>
        </div>
      </div>
      {/* <div>Настройки</div> */}
    </div>
  );
};

export default Header;
