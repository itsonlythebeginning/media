import Button from './Button.jsx';
import { MdDeleteForever } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import {useState} from 'react';
import {removeUser} from '../store/store.jsx';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import AlbumsList from './AlbumsList.jsx';

function UsersListItem({user}) {

    const dispatch = useDispatch()


    const [isRemoveUser, setIsRemoveUser] = useState(false)
    const [errorRemove, setErrorRemove] = useState(null)

    const [expanded, setExpanded] = useState(false)

    const handleRemoveUser = (user) => {
        setIsRemoveUser(true)
        dispatch(removeUser(user))
            .unwrap()
            .then( () => {
                setIsRemoveUser(false)
            } )
            .catch( (err) => {
                setIsRemoveUser(false)
                setErrorRemove(err)
            } )
    }


    const handleClick = () => {
        setExpanded(!expanded)
    }



    let classes = classNames("text-2xl font-bold text-blue-700", isRemoveUser ? "opacity-35" : "opacity-100")

    return (
        <div className="mb-8 last:mb-0">

            <div className="flex flex-row items-center bg-blue-100 border p-3 mb-2">
                <Button
                    disabled={isRemoveUser}
                    onClick={() => {
                        handleRemoveUser(user)
                    }}
                    className="mr-3 text-3xl"
                >
                    {
                        isRemoveUser
                            ? <FaSpinner className="scale-110 animate-spin"/>
                            : <MdDeleteForever className="scale-150"/>
                    }
                </Button>
                <h3 className={classes}>{user.name}</h3>
                {errorRemove && "Error remove User"}
                <Button onClick={handleClick} className="ml-auto text-3xl">
                    {
                        expanded
                            ? <FaArrowDown/>
                            : <FaArrowLeft/>
                    }
                </Button>
            </div>

            {expanded && <AlbumsList user={user}/>}

        </div>
    )

}

export default UsersListItem