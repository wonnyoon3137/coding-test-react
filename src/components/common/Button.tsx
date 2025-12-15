const Button = ({ className, children }: { className: string; children: React.ReactNode }) => {
  return <button className={className}>{children}</button>;
};

export default Button;
