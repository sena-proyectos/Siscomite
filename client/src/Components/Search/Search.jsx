import "./Search.css";

const Search = ({ placeholder, icon }) => {
  return (
    <main className="containerSearch">
      <section className="searchBar">
        <i class="fi fi-rr-settings-sliders" id="iconSearch"></i>
        <input type="text" name="buscar" className="searchTerm" placeholder={placeholder} />
      </section>
    </main>
  );
};

export { Search };
