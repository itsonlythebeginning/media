import Button from './Button.jsx';
import PhotosListItem from './PhotosListItem.jsx';
import {useFetchPhotosQuery, useAddPhotoMutation} from '../store/store.jsx';
import Skeleton from './Skeleton.jsx';
import classNames from 'classnames';

function PhotosList({album}) {


    const {data, isLoading, isFetching, error} = useFetchPhotosQuery(album)

    const [addPhoto, {isLoading:isLoadingAdd, isError: isErrorAdd}] = useAddPhotoMutation()


    const handleAddPhoto = () => {
        addPhoto(album)
    }



    let content

    content = data?.map(function (photo) {
        return <PhotosListItem key={photo.id} photo={photo}/>
    })



    return (
        <div>

            <div className="flex flex-row items-center justify-between border mb-2 p-4">
                <h2 className="text-xl font-bold text-pink-500">Photos in {album.title}</h2>
                <Button
                    disabled={isLoadingAdd}
                    onClick={handleAddPhoto}
                    className={classNames("bg-pink-300", isLoadingAdd ? "cursor-wait" : "")}>
                    +ADD PHOTO
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 border p-4">
                {content}
                {isLoading && <Skeleton className="h-30 w-200" times={3}/>}
                {error && "Error Fetching Photos..."}
            </div>

        </div>
    )

}

export default PhotosList