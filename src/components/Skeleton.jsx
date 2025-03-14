import classNames from 'classnames';
import {twMerge} from 'tailwind-merge';

function Skeleton({times, className}) {

    const boxes = []

    let classes = twMerge(classNames("border mb-5 h-10 bg-gray-200 animate-pulse", className))

    for (let i=0; i < times; i++) {
        boxes.push(<div className={classes} key={i}></div>)
    }

    return (
        <div>
            {boxes}
        </div>
    )

}

export default Skeleton