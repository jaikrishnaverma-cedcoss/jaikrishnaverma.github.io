import React from 'react'
type MyProps = {
    msg: {
        id?: string
        createdAt: string
        txt: string
        uid: string
        userPic: string
    }
    align: string
    name:string
}
export const ChatElement = ({ msg, align ,name}: MyProps) => {
    return (
        <>
        <p className='labelDate m-0 mx-3 text-secondary bold' style={{float:(align=='msg-right')?'right':'left'}}>{`name:${name}   ${msg.createdAt}`}</p>
        <div className={`col-12 my-1 d-flex label-relative ${align}`}>
            
            <div className="d-flex  py-2 " style={{ minWidth: '40%' }}>
                <div className='d-flex align-items-start'>
                    <img src={msg.userPic} alt="" className="profile rounded-circle card mx-2" />
                </div>
                <p className='m-1 pe-2'>{msg.txt}</p>
            </div>
        </div>
        </>
       
    )
}
