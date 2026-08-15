interface PoweredByCoreLabProps {
    className?: string;
}

export function PoweredByCoreLab({ className }: PoweredByCoreLabProps) {
    return (

     <a   href = "https://www.onecorelab.com"
      target = "_blank"
    rel = "noopener noreferrer"
    className={`inline-flex w-full items-center justify-center gap-1 text-xs font-medium tracking-wide text-velvet/40 transition-colors hover:text-velvet/70 ${className ?? ""}`
}
    >
      <span>Powered by</span>
       <span>
        <span className="text-velvet/70">one</span>
        <span className="font-semibold" style={{ color: "#4169E1" }}>
         CoreLab
       </span>
      </span>
    </a >
  );
}