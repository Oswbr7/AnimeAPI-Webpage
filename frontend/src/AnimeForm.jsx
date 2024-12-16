import { useState } from "react";

const AnimeForm = ({existingAnime = {}, updateCallback}) => {
    const [name, setName] = useState(existingAnime.name || "")
    const [author, setAuthor] = useState(existingAnime.author || "")
    const [description, setDescription] = useState(existingAnime.description || "")
    const [released, setReleased] = useState(existingAnime.released || "")
    const [is_finished, setIs_finished] = useState(existingAnime.is_finished || "")
    const [volumes, setVolumes] = useState(existingAnime.volumes || "")
    const [image_url, setImage_url] = useState(existingAnime.image_url || "")

    const updating = Object.entries(existingAnime).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name,
            author,
            description,
            released,
            is_finished,
            volumes,
            image_url
        }
        
        const url = "http://127.0.0.1:5000/" + [updating ? `update_anime/${existingAnime.id}` : "create_anime"]
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        }else{
            updateCallback()
        }
    }

    return (
    <form action="" onSubmit={onSubmit} className="anime-form">
        <div>
            <label htmlFor="name">Name: </label>
            <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="author">Author: </label>
            <input 
                type="text" 
                id="author" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="description">Description: </label>
            <input 
                className="input-description"
                type="text" 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="released">Released Year: </label>
            <input 
                type="text" 
                id="released" 
                value={released} 
                onChange={(e) => setReleased(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="is_finished">Is Finished?: </label>
            <select 
                id="is_finished" 
                value={is_finished} 
                onChange={(e) => setIs_finished(e.target.value === "true")}
            >
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>
        <div>
            <label htmlFor="volumes">Volumes: </label>
            <input 
                type="text" 
                id="volumes" 
                value={volumes} 
                onChange={(e) => setVolumes(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="image_url">Image Url: </label>
            <input 
                type="url" 
                id="image_url" 
                value={image_url} 
                onChange={(e) => setImage_url(e.target.value)}
            />
        </div>
        <button type="submit">{updating ? "Update" : "Create"} </button>
    </form>
    )
};

export default AnimeForm