export function convertCurrentDate() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}

export function valid_youtube_link(url){
    let yt = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(yt)){
        return url.match(yt)[1];
    }
    return false;
}


