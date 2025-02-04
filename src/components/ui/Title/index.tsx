interface TitleProps {
    heading: string;
    className?: string;
}

export default function Title({heading, className}: TitleProps) { 
    
    return <h1 className={`font-bold text-3xl ${className}`}>{heading}</h1>
}