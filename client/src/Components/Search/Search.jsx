import "./Search.css"

const Search = ({placeholder, icon}) => {
  return (
    <main className="containerSearch">
      <section className="searchBar">
         
        <input type="text" name="buscar" className="searchTerm" placeholder={placeholder} icon={icon} />
      </section>
    </main>
  );
};

export { Search };
