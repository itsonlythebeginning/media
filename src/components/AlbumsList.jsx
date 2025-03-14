import {useFetchAlbumsQuery, useLazyFetchAlbumsQuery, useAddAlbumMutation, useAddRandomAlbumMutation} from '../store/store.jsx';
import Skeleton from './Skeleton.jsx';
import AlbumsListItem from './AlbumsListItem.jsx';
import {useState} from 'react';
import Button from './Button.jsx';
import classNames from 'classnames';


function AlbumsList({user}) {


    const [term, setTerm] = useState("")

    const {data, isLoading, isFetching, error} = useFetchAlbumsQuery(user)
    const [addUser, {isLoading: isLoadingAdd, isError: isErrorAdd}] = useAddAlbumMutation()

    const [addRandomUser,  {isLoading: isLoadingAddRandom, isError: isErrorAddRandom}] = useAddRandomAlbumMutation()


    const handleChange = (event) => {
        setTerm(event.target.value)
    }

    const handleAddAlbum = (event) => {
        event.preventDefault()
        addUser({term, user})
        setTerm("")
    }

    const handleAddRandomAlbum = () => {
        addRandomUser(user)
    }



    let content

    if (isLoading) {
        content = <Skeleton className="h-15" times={3}/>
    }
    else if (error) {
        content = <>Error fetching Albums...</>
    }
    else {
        content = data?.map(function (album) {
            return <AlbumsListItem key={album.id} album={album}/>
        })
    }


    return (
        <div className="border p-5">

            <div className="flex flex-row items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-green-700">Albums for {user.name}</h2>
                <form onSubmit={handleAddAlbum} className="flex flex-row items-center border-3 p-4">
                    <input
                        className="p-1 mr-3 text-xl border"
                        type="text"
                        value={term}
                        onChange={handleChange}
                        placeholder="Enter Album"
                    />
                    <Button
                        disabled={isLoadingAdd}
                        className={classNames("bg-green-200 w-35", isLoadingAdd ? "cursor-wait" : "")}>
                        + ADD ALBUM
                    </Button>
                </form>
                <Button
                    onClick={handleAddRandomAlbum}
                    disabled={isLoadingAddRandom}
                    className={classNames("bg-green-200 w-48", isLoadingAddRandom ? "cursor-wait" : "")}>
                    + ADD RAND ALBUM
                </Button>
            </div>

            <div>
                {content}

                {isLoadingAdd && <Skeleton className="h-13" times={1}/>}
                {isLoadingAddRandom && <Skeleton className="h-13" times={1}/>}

                {isErrorAdd && <div>Error Fetching Add User...</div>}
                {isErrorAddRandom && <div>Error Fetching Add Random User...</div>}
            </div>

        </div>
    )

}


export default AlbumsList