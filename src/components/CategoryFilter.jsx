export default function CategoryFilter({ category, setCategory }){
  const cats = ['All', 'Home decor', 'Showpiece', 'Furniture', 'Paints']
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {cats.map(c => (
        <button key={c}
          onClick={()=>setCategory(c)}
          className={`px-4 py-2 rounded-full border transition ${category===c ? 'bg-purple text-white border-purple' : 'bg-softgrey hover:bg-white border-transparent'}`}>
          {c}
        </button>
      ))}
    </div>
  )
}
