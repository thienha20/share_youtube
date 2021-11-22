import * as React from "react"
import {useEffect, useState, memo, useMemo} from "react"
import allActions from "../../../store/actions"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import {getYoutubeInfo} from "../../../store/ajax"
import Grid from "@mui/material/Grid"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined"
import {getParamsAsObject} from "../../../utils/url"

const Videos = () => {
    const parsed = getParamsAsObject(window.location.search)
    const paramsInit = useMemo(() => {
        return {
            sort: {
                timestamp: -1
            },
            itemPerPage: 5,
            ...parsed
        }
    }, [parsed])
    const [videoList, setVideoList] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()
    let rows = useSelector(state => state.shares.data)
    let params = useSelector(state => state.shares.params)
    let startParams = useSelector(state => state.shares.startParams)
    let pageTotal = Math.ceil((params && params.total ? params.total : (rows ? rows.length : 0)) / paramsInit.itemPerPage)

    useEffect(() => {
        return () => dispatch(allActions.shares.setStart())
    }, [])

    useEffect(() => {
        if (startParams) {
            let par = {...paramsInit, loading: true}
            dispatch(allActions.shares.shareList(par))
        }
    }, [params, paramsInit, dispatch, startParams])

    useEffect(() => {
        async function fetchData() {
            if (rows) {
                let code = rows.map(i => i.youtube_code)
                let rs = await getYoutubeInfo(code)
                setVideoList(rs)
            }
        }

        fetchData()
    }, [rows, setVideoList])

    const handleChangePage = (event, newPage) => {
        let currentPage = parseInt(newPage) + 1
        if (params.page !== currentPage) {
            dispatch(allActions.shares.setParams({...params, page: currentPage}, history))
        }
    }

    return (
        <>
            {rows ? rows.map((i, k) => (
                    <Grid container spacing={2} sx={{mt: 1}} key={k}>
                        <Grid item xs sm container>
                            <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${i.youtube_code}`}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="title" component="h4" color={"#e91e63"}>
                                        {videoList?.snippet ? videoList.snippet[i.youtube_code]?.title : ""}
                                    </Typography>
                                    <Typography gutterBottom variant="title" component="h5">
                                        shared by: {i.User?.email}
                                    </Typography>
                                    <Typography gutterBottom variant="icon" component="div" fontSize={"small"}>
                                        <ThumbUpIcon fontSize={"small"}
                                                     style={{verticalAlign: "sub"}}/> {videoList?.statistics ? videoList.statistics[i.youtube_code]?.likeCount : 0}
                                        <ThumbDownIcon fontSize={"small"} sx={{ml: 2}}
                                                       style={{verticalAlign: "sub"}}/> {videoList?.statistics ? videoList.statistics[i.youtube_code]?.dislikeCount : 0}
                                        <ModeCommentOutlinedIcon fontSize={"small"} sx={{ml: 2}}
                                                                 style={{verticalAlign: "sub"}}/> {videoList?.statistics ? videoList.statistics[i.youtube_code]?.commentCount : 0}
                                    </Typography>
                                    <Typography variant="description" component="div"
                                                title={videoList?.snippet ? videoList.snippet[i.youtube_code]?.description : ""}
                                                style={{overflow: "hidden", maxHeight: "220px"}}>
                                        {videoList?.snippet ? videoList.snippet[i.youtube_code]?.description : ""}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            ) : null}
            {pageTotal > 1 ? <Pagination count={pageTotal} page={params.page ? parseInt(params.page) : 1} sx={{mt: 2}}
                                         onChange={(e, page) => handleChangePage(e, page - 1)}/> : null}
        </>
    )
}

export default Videos