import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { REMOVE } from './likedMedia';

function ImageListItem({item}) {

    const dispatch = useDispatch();
    
    const onSharePress = () => {
        navigator.clipboard.writeText(item.url);
    }

    const onRemovePress = () => {
        dispatch(REMOVE(item.date));
    }

    return (
        <div className="imageListItem">
            <div className="content">
                <a href={item.url} target="_blank" rel="noreferrer">
                    <img className="image" src={item.url} alt={"Image from " + item.date}/>
                </a>
                <div className="info">
                    <h5>{item.title}</h5>
                    <h6>{item.date}</h6>
                </div>
            </div>
            <div className="buttons">
                <button type="button" 
                        className="btn btn-primary" 
                        onClick={() => onSharePress()}
                        title="Get Shareable Link">
                    <FontAwesomeIcon icon={faShareAlt} />
                </button>
                <button type="button" 
                        className="btn btn-danger" 
                        onClick={() => onRemovePress()}
                        title="Unlike">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    );
}

export default ImageListItem;