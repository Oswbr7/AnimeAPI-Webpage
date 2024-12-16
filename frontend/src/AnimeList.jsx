import React from "react";

const AnimeList = ({animes, updateAnime, updateCallback}) => {
    const onDelete = async (id) => {
        try{
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_anime/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            }else {
                console.error("Failed to delete")
            }
        }catch (error){
            alert(error)
        }
    }

    return <div>
        <h2>MANGA ON DEMAND</h2>
        <div className="anime-cards-container">
        {animes.map((anime) => (
        <div key={anime.id} className="anime-card">
            <img src={anime.image_url} alt={`${anime.name}`} className="anime-image" />
            <div className="anime-details">
                <h3 className="anime-name">{anime.name}</h3>
                <p className="anime-author">Author: {anime.author}</p>
                <p className="anime-description">{anime.description}</p>
                <p className="anime-released">Released: {anime.released}</p>
                <p className="anime-finished">Finished: {anime.is_finished ? "Yes" : "No"}</p>
                <p className="anime-volumes">Volumes: {anime.volumes}</p>
                <div className="anime-actions">
                    <button onClick={() => updateAnime(anime)}>Update</button>
                    <button onClick={() => onDelete(anime.id)}>Delete</button>
                </div>
            </div>
        </div>
    ))}
</div>
    </div>
}

export default AnimeList