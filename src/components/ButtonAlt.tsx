import { Icon } from "@iconify/react";

type ButtonProps = {
    title: string;
    className?: string;
    icon?: string;
    onClick?: () => void; 
};

export const Button = ({ title, className, icon, onClick }: ButtonProps) => {
    return (
        <div
            onClick={onClick} 
            className={`text-center h-fit cursor-pointer border-[0.5px] hover:bg-primary/10 hover:text-white border-primary/10 flex justify-center items-center gap-2 text-xs sm:text-sm ${className} p-6 px-4`}
        >
            {icon && <Icon icon={icon} width={20} className="cursor-pointer" />}
            <p className="sm:block">{title}</p>
        </div>
    );
};
