import React from 'react';

function VideoPlayer({src, startTime, endTime}) {
    return <video width={'100%'}>
        <source src={src}/>
    </video>
}

export default VideoPlayer;
