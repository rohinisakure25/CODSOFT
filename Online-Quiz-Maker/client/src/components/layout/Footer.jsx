const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">QuizMaker</p>
          <p className="text-gray-400 text-sm">
            Create, share, and take quizzes online
          </p>
          <p className="text-gray-500 text-xs mt-4">
            &copy; {new Date().getFullYear()} QuizMaker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;