const Navbar = () => {
  return (
    <nav
      data-cy="header-background"
      className="bg-blue py-5 lg:py-8 pl-5 lg:pl-[220px]"
    >
      <a href="/" className="text-white font-bold" data-cy="header-title">
        TO DO LIST APP
      </a>
    </nav>
  );
};

export default Navbar;
