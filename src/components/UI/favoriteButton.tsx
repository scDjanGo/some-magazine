import  {MouseEventHandler} from 'react';

export default function FavoriteButton({ className, favorite, onClick, children }: { className?: string, favorite: boolean, onClick: MouseEventHandler<HTMLDivElement>, children: React.ReactNode }) {
  return (
    <div
      className={`flex items-center justify-center rounded-[4px] cursor-pointer ${favorite && "bg-[#FFC700]"} ${className}}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
