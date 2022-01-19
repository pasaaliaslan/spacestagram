import ImageListItem from "./imageListItem";
import { useSelector } from "react-redux";

function ImageList(lst) {

    const likedMedia = useSelector((state) => state.likedMedia.mediaFiles);

    return (
        <div className="imageListContainer">
            <h4>Liked Images</h4>
            <hr/>
            {
                likedMedia.map(image => (<ImageListItem item={image} key={image.date}/>))
            }
        </div>
    )
}

export default ImageList;