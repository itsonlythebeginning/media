import { MdDeleteForever } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import {useRemovePhotoMutation} from '../store/store.jsx';


function PhotosListItem({photo}) {


    const [removePhoto, {isLoading, isError}] = useRemovePhotoMutation()


    const handleDelete = () => {
        removePhoto(photo)
    }

    return (
        <div className="relative cursor-pointer">
            <div
                onClick={handleDelete}
                className="absolute inset-0 w-full h-full bg-gray-400 flex items-center justify-center opacity-0 hover:opacity-60">
                {
                    isLoading
                    ? <FaSpinner className="text-5xl scale-500 animate-spin"/>
                    : <MdDeleteForever className="text-5xl scale-500"/>
                }
            </div>
            <img alt="user photo" className="object-cover w-full h-full" src={photo.url}/>
            {isError && "Error Delete Photo..."}
        </div>
    )

}

export default PhotosListItem