import {useState,useEffect} from 'react'

const ProfileCard = ({item,fetchData})=>{
const [loadedImage,setloadedImage] = useState('')

useEffect(() => {
    fetchData(item).then((image)=>
   { image && image.b64Content ? setloadedImage(`data:image/png;base64,${image.b64Content}`) : setloadedImage('https://via.placeholder.com/300') }
    )             
},[])

    return ( 

        <li key={item.id} className="card">
               {item.image_id && (
                        <img src={loadedImage} 
                        height={'300px'}
                        width={'200px'}
                        alt={item.denomination} />
                    )}
        <h2>{item.denomination}</h2>
        <p>Name: {item.name}</p>
        <p>Surname: {item.surname}</p>
        <p>Gender: {item.gender}</p>
        <p>Profile Type: {item.profile_type}</p>
        <p>TJM: {item.tjm}</p>
        <p>stars:  {item.stars_count} </p>
        <p>Specialities: {item.specialities.join(', ')}</p>
     
        
    </li> 
    )
}

export default ProfileCard