
import Button from './Button'

const ButtonList = () => {
  const list = [
    "All", "Movies", "Songs", "My Mixes", "Trending", "Live", 
    "Gaming", "News", "Sports", "Education", "Music", "Podcasts", 
    "Comedy", "Technology", "Fashion", "Travel", "DIY", "Food", 
    "Health", "Finance", "Documentaries"
  ];
  return (
    <div className='flex overflow-x-auto scrollbar-hide'>
      {list.map((item, index) => (
        <Button key={index} name={item} />
      ))}
    </div>
  )
}

export default ButtonList;
