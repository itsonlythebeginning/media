import Button from './Button.jsx';
import UsersListItem from './UsersListItem.jsx';
import {changeTerm, fetchUsers, addUser, addRandomUser} from '../store/store.jsx';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Skeleton from './Skeleton.jsx';
import classNames from 'classnames';


function UsersList() {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [isAddUser, setIsAddUser] = useState(false)
    const [errorAdd, setErrorAdd] = useState(null)

    const {data, term} = useSelector( (state) => state.users)


    useEffect( () => {
        setIsLoading(true)
        dispatch(fetchUsers())
            .unwrap()
            .then( () => {
                setIsLoading(false)
            } )
            .catch( (err) => {
                setIsLoading(false)
                setError(err)
            } )

    }, [dispatch] )



    const handleChange = (event) => {
        dispatch(changeTerm(event.target.value))
    }

    const handleAddUser = (event) => {
        event.preventDefault()

        setIsAddUser(true)
        dispatch(addUser(term))
            .unwrap()
            .then( () => {
                setIsAddUser(false)
            } )
            .catch( (err) => {
                setIsAddUser(false)
                setErrorAdd(err)
            } )

        dispatch(changeTerm(""))
    }


    const handleAddRandomUser = () => {
        setIsAddUser(true)
        dispatch(addRandomUser())
            .unwrap()
            .then( () => {
                setIsAddUser(false)
            } )
            .catch( (err) => {
                setIsAddUser(false)
                setErrorAdd(err)
            } )
    }



    let content

    if (isLoading) {
        content = <Skeleton className="h-17" times={6}/>
    }
    else if (error) {
        content = <>Error fetching data...</>
    }
    else {
        content = data?.map(function (user) {
            return <UsersListItem key={user.id} user={user}/>
        })
    }


    return (
        <div>
            <div className="flex flex-row items-center justify-between border p-4 mb-5">
                <h2 className="text-2xl text-red-700 font-bold">List of Users</h2>
                <form onSubmit={handleAddUser} className="flex flex-row items-center border-4 p-4">
                    <input
                        className="p-1 mr-3 text-xl border"
                        type="text"
                        value={term}
                        onChange={handleChange}
                        placeholder="Enter User"
                    />
                    <Button
                        disabled={isAddUser}
                        className={classNames("bg-red-200 w-30", isAddUser ? "cursor-wait" : "")}>
                        + ADD USER
                    </Button>
                </form>
                <Button
                    onClick={handleAddRandomUser}
                    disabled={isAddUser}
                    className={classNames("bg-red-200 w-48", isAddUser ? "cursor-wait" : "")}>
                    + ADD RANDOM USER
                </Button>
            </div>

            <div className="border p-4">
                {content}
                {errorAdd && "Error add user"}
                {isAddUser && <Skeleton className="h-17" times={1}/>}
            </div>
        </div>
    )

}

export default UsersList