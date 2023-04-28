const Navbar = () => {
  return (
    <nav
      data-cy="header-background"
      className="bg-blue py-8 pl-4 xl:pl-[220px]"
    >
      <a href="/" className="text-white font-bold" data-cy="header-title">
        TO DO LIST APP
      </a>
    </nav>
  );
};

export default Navbar;
