import { Spin, cn } from 'xui'
import React from 'react'

export default ({ border, children, className, ...props}) => children ? 
    <div className="relative">
        {children}
        <div className="absolute inset-0 flex items-center justify-center bg-white/20">
            <Spin className={cn("w-8 h-8", className)} {...props} /> 
        </div>
    </div>
    : 
    <div className={"w-full p-8" + (border ? " border rounded-md" : "")}>
        <Spin className={cn("m-auto w-8 h-8", className)} {...props} />
    </div>
