import {h} from "preact";

export default function({user,clickEvent}) {
  let color = user.color;
  let interior = (user.photo_url)? <img src={user.photo_url} alt={user.first_name} /> : <span>{p.user.first_name.charAt(0)}</span>;
  return(
    <div style={{backgroundColor: {color}} >
      {interior}
    </div>
  )
}
