const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center">
      <small className="my-4 text-xs">MyShop &copy; {currentYear}</small>
    </footer>
  );
};

export default Footer;
