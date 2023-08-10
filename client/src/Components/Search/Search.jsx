import "./Search.css";

const Search = ({ placeholder, icon }) => {
  return (
    <main className="containerSearch">
      <section className="searchBar">
        {icon}
        <input type="text" name="buscar" className="searchTerm" placeholder={placeholder} />
      </section>
    </main>
  );
};

export { Search };
