import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { YT_SEARCH_SUGGESTION } from "../utils/constants";


const Header = () => {
  const disptach = useDispatch()
  const [query, setQuery] = useState('')
  const [suggestion, setSuggestion] = useState([])
  const [showSuggestion, setShowSuggestion] = useState(false)
  const handleToggle = () => {
    disptach(toggleMenu())
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        getSuggestions();
      } else {
        setSuggestion([]);
      }
    }, 200); 

    return () => clearTimeout(timer);
  }, [query]);

  const getSuggestions = async () => {
    const data = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(YT_SEARCH_SUGGESTION + query)}`)
    const json = await data.json()
    console.log(json)
    setSuggestion(json[1]);
  }
  console.log(query)
  return (
    <div className='grid grid-flow-col p-2'>
      <div className='flex col-span-1 mx-4'>
        <img className='h-8 m-2 cursor-pointer' onClick={handleToggle} alt='hamburger' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png' />
        <Link to={"/"} ><img className='h-8 m-2' alt='logo' src='https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png' /></Link>
      </div>
      <div className="col-span-10">
        <input onChange={(e) => setQuery(e.target.value)} onFocus={() => {setShowSuggestion(true)}} onBlur={() => {setShowSuggestion(false)}} className="border border-black rounded-l-full p-2 w-6/12" type='text' placeholder='Search' />
        <button className="rounded-r-full border border-black bg-gray-400 p-2">Search</button>
        {showSuggestion && suggestion && (
          <ul className="absolute bg-white border border-gray-300 w-6/12 mt-1 rounded-md shadow-lg">
            {suggestion.map((s, i) => (
              <li key={i} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={()=> setQuery(s)}>
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-span-1">
       <FaUser className="text-xl text-gray-700 ml-auto" />
      </div>
    </div>
  )
}

export default Header
