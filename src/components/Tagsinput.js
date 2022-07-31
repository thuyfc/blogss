import { useState } from "react";


function Tagsinput({onChange}) {
    const [tags, setTagss] = useState([])
    const handleTags = (e) => {
   
    onChange(tags);
  }
    const addTag = (e) => {

        if (e.key === 'Enter') {
            setTagss([...tags, e.target.value])
            e.target.value = ""
        }
    }
    const removetag = removetag => {
        const newTags = tags.filter(tag => tag !== removetag)
        setTagss(newTags)
    }
    return (
        <div className="w-full rounded-lg p-1.5 border" >

            {tags.map((tag, index) => {
                return (
                    <div key={index} className="ml-2 bg-slate-200 inline-block p-0.5 rounded-md">
                        <span className="">{tag}</span>
                        <span className="font-bold cursor-pointer" onClick={() => removetag(tag)}> &times;</span>

                    </div>
                )
            })}
            <input onKeyDown={addTag} onChange={handleTags}
                type="text" className="border-none outline-none" placeholder="tag" />

        </div>
    );
};

export default Tagsinput;