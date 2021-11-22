export function ValidateEmail(mail) {
    let rex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (rex.test(mail)) {
        return true
    }
    return false
}

export function ValidYoutubeLink(url){
    let yt = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(yt)){
        return url.match(yt)[1];
    }
    return false;
}