import classNames from 'classnames';
import { twMerge } from 'tailwind-merge'


function Button({
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    className,
    ...rest

    }) {


    const classes =  twMerge(classNames(rest.className, "flex items-center px-3 py-1.5 border cursor-pointer", className,{
        "border-blue-500 bg-blue-500 text-white cursor-pointer" : primary,
        "border-gray-900 bg-gray-900 text-white" : secondary,
        "border-green-500 bg-green-500 text-white" : success,
        "border-yellow-400 bg-yellow-400 text-white" : warning,
        "border-red-500 bg-red-500" : danger,
        "rounded-full" : rounded,
        "bg-white" : outline,
        "text-blue-500" : outline && primary,
        "text-gray-900" : outline && secondary,
        "text-green-600" : outline && success,
        "text-yellow-400" : outline && warning,
        "text-red-500" : outline && danger,
        "opacity-35" : rest.disabled
    }))

    return <button {...rest} className={classes}>{children}</button>

}





export default Button