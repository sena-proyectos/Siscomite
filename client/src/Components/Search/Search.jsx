import "./Search.css";

const Search = ({ placeholder, icon }) => {
  return (
    <main className="flex items-center relative">
        <input type="text" name="buscar" className="shadow-md outline-none rounded-xl p-[10px] w-[100%]" placeholder={placeholder}/>
        {icon}
    </main>
  );
};

export { Search };
