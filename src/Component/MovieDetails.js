import React, { memo, useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Row, Col, Card, CardImg } from 'reactstrap';
import NoImg from '../img/no-img.jpg';

const MovieDatail = (props) => {
    const [movieDetail, setMovieDetail] = useState({});
    const [castDetail, setCastDetail] = useState([]);
    const [director, setDirector] = useState('');
    const { match } = props;
    const movieId = match.params.id;
    const { poster_path = '', release_date = '', title = '', runtime = 0, overview = '' } = movieDetail;

    useEffect(async () => {
        let baseUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
        let params = { api_key: 'aedaf37b2e5efcb5e791bdd5963aaeb6' };
        try {
            let response = await axios.get(baseUrl, { params: params });
            let castResponse = await axios.get(baseUrl + '/credits', { params: params })
            if (response && response.data) {
                setMovieDetail(response.data);
            }
            if (castResponse && castResponse.data && castResponse.data) {
                let directorArr = castResponse.data.crew.filter(e => e.department.toLowerCase() == "directing") || [];
                if (directorArr.length) {
                    setDirector(directorArr[0].name);
                }
                setCastDetail(castResponse.data.cast);
            }
        } catch (ex) {
            return { error: "" };
        }
    }, [])

    return (
        <div>
            <Header title="Movie Details" />
            <Row className="pad-7 body-cont">
                <Col sm={4} md={3} lg={2}>
                    <Card>
                        <CardImg src={poster_path ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${poster_path}` : (NoImg)} alt="No Images Available"
                            height="378" width="auto" />
                    </Card>
                </Col>
                <Col sm={8} md={9} lg={10} className="pdl-1">
                    <div className="movie-detail-title">
                        {title}
                        <small className="text-muted"> ({movieDetail.vote_average}/10)</small>
                    </div>
                    <div className="header-title">
                        <div>
                            <span>{release_date ? release_date.substring(0, 4) : ''}</span>
                            <span>{runtime ? ` | ${Math.trunc(runtime / 60)}:${runtime % 60}` : ''}</span>
                            <span>{director ? ` | ${director}` : ''}</span>
                        </div>
                        <div className="mrb-7">
                            <span className="bold-font">Cast: </span>
                            <span>
                                {
                                    castDetail.map((e, index) => {
                                        return (
                                            `${e.name}${(castDetail.length - 1 == index) ? '' : ', '}`
                                        )
                                    })
                                }
                            </span>
                        </div>
                        <div className="mrb-7">
                            <span className="bold-font">Description: </span>
                            <span>{overview}</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default memo(MovieDatail)
