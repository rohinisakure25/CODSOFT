const Button = ({ children, variant = 'primary', onClick, disabled, type = 'button', className = '' }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-300",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-300"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;