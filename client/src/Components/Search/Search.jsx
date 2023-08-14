import './Search.css'
import { useRef, useEffect } from 'react'

const Search = ({ searchStudent, placeholder, icon }) => {
  const search = useRef()
  const debounceTimeout = useRef(null)

  const handleSearch = () => {
    const searchValue = search.current.value
    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      searchStudent(searchValue)
    }, 300)
  }

  const evnt = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimeout.current)
    }
  }, [])

  return (
    <form className="flex items-center relative" method="get" onChange={handleSearch} onSubmit={evnt}>
      <input type="text" name="buscar" className="shadow-md outline-none rounded-xl p-[10px] w-[100%]" placeholder={placeholder} ref={search} autoComplete='off'/>
      {icon}
    </form>
  )
}

export { Search }
