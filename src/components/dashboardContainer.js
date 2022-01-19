import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faSyncAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { ADD, REMOVE } from './likedMedia';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import getSingleMedia from '../services/getSingleMedia';

function DashboardContainer() {

    const dispatch = useDispatch();
    const likedMedia = useSelector((state) => state.likedMedia.mediaFiles);

    const [isLoading, setIsLoading] = useState(false);

    const [media, setMedia] = useState({
        date: "",
        description: "",
        url: "",
        isImage: true,
        title: "",
    });

    useEffect(() => {
        getMedia(0, "");
    }, []);

    /**
     * 
     * @param {*} getType 
     *  0 for today's pic
     *  1 for random
     *  2 for specific date
     */
    const getMedia = (getType, date) => {
        setIsLoading(true);

        getSingleMedia(getType, (getType === 2) ? date : "").then(output => {
            let response = ((getType !== 0) ? output[0] : output);
            setMedia({
                date: response.date,
                description: response.explanation,
                url: response.url,
                isImage: response.media_type === "image",
                title: response.title,
            })
            
            setIsLoading(false);
        });
    }

    const onDateInput = (date) => {
        let year = date.getFullYear();
        let month = Number(date.getMonth()) + 1;
        let day = Number(date.getDate());

        let newDate =  year + "-" + ((month < 10) ? "0" : "") + month + "-" + ((day < 10) ? "0" : "") + day;

        getMedia(2, newDate);
    }

    const stringToDate = (stringDate) => {
        let year = Number(stringDate.slice(0, 4));
        let month = Number(stringDate.slice(5, 7)) - 1;
        let day = Number(stringDate.slice(8, 10));

        return new Date(year, month, day);
    }

    const checkLike = (date) => {
        for (var i = 0; i < likedMedia.length; i++){
            if (likedMedia[i].date === date){
                return true;
            }
        }

        return false;
    }

    const likeToggle = () => {
        if (!checkLike(media.date)){
            dispatch(ADD(media));
        } else {
            dispatch(REMOVE(media.date));
        }
    }

    const onSharePress = () => {
        navigator.clipboard.writeText(media.url);
    }

    return (
        <div className="container">
            <div className="dashboardInputContainer">
                <div className="dateInput">
                    <h6>Search by Date</h6>
                    <ReactDatePicker
                        selected={stringToDate(media.date)}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date) => onDateInput(date)}
                        minDate={new Date("01-01-2015")}
                        maxDate={new Date()}
                        showYearDropdown
                    />
                </div>
                <button className="btn btn-primary" onClick={() => getMedia(0, "")}>Today's Image</button>
            </div>
            <a href={media.url} target="_blank" rel="noreferrer">
                <img className="spaceImage" src={media.url} alt={"Image from " + media.date}/>
            </a>
            <div className="titlerow">
                <h4>{media.title}</h4>
                <div className="likeRefreshShare">
                    <button type="button" 
                            className={"btn btn-" + ((checkLike(media.date)) ? "outline-" : "") + "primary"} 
                            onClick={() => likeToggle()}
                            title={(checkLike(media.date)) ? "Unlike" : "Like"}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </button>
                    <button type="button" 
                            className="btn btn-primary" 
                            onClick={() => getMedia(1, "")}
                            title="Change Image">
                        {isLoading ? <FontAwesomeIcon icon={faSyncAlt} spin /> : <FontAwesomeIcon icon={faSyncAlt} />}
                    </button>
                    <button type="button" 
                            className="btn btn-primary" 
                            onClick={() => onSharePress()}
                            title="Get Shareable Link">
                        <FontAwesomeIcon icon={faShareAlt} />
                    </button>
                </div>
            </div>
            <h6>{media.date}</h6>
            <details>
                    <summary>Description</summary>
                    <div className="details-content">
                        <p>{media.description}</p>
                    </div>
            </details>
        </div>
    );
}
 
export default DashboardContainer;