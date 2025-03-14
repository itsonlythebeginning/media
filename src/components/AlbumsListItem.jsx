import {useState} from 'react';
import Button from './Button.jsx';
import { MdDeleteForever } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import {useRemoveAlbumMutation} from '../store/store.jsx';
import classNames from 'classnames';
import PhotosList from './PhotosList.jsx';


function AlbumsListItem({album}) {

    const [removeAlbum, {isLoading, isError}] = useRemoveAlbumMutation()

    const [expanded, setExpanded] = useState(false)


    const handleRemoveAlbum = () => {
        removeAlbum(album)
    }

    const handleClick = () => {
        setExpanded(!expanded)
    }


    let classes = classNames("font-bold text-green-800 text-xl", isLoading ? "opacity-35" : "opacity-100")

    return (
        <div className="mb-5">

            <div className="flex flex-ror items-center border h-13 bg-green-100 p-3 mb-2">
                <Button
                    disabled={isLoading}
                    onClick={handleRemoveAlbum}
                    className="mr-3 text-2xl">
                    {
                        isLoading
                            ? <FaSpinner className="scale-110 animate-spin"/>
                            : <MdDeleteForever className="scale-150"/>
                    }
                </Button>
                <h3 className={classes}>{album.title}</h3>
                <Button onClick={handleClick} className="ml-auto text-xl">
                    {
                        expanded
                            ? <FaArrowDown/>
                            : <FaArrowLeft/>
                    }
                </Button>
                {isError && "Error remove user..."}
            </div>

            {expanded && <PhotosList album={album}/>}

        </div>
    )

}


export default AlbumsListItem