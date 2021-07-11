import React, { Fragment, memo, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, CardImg, Row, Col } from 'reactstrap';
import { useDebouncedCallback } from 'use-debounce';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Header from "./Header";
import NoImg from '../img/no-img.jpg';

const MovieList = () => {
    const history = useHistory();
    const [searchValue, setSearchValue] = useState("");
    const [movieList, setMovieList] = useState([]);
    const debounced = useDebouncedCallback((event) => {
        let { value } = event.target;
        setSearchValue(value);
    },
        // delay in ms
        500
    );

    //get movie list
    useEffect(async () => {
        let baseUrl = 'https://api.themoviedb.org/3/';
        let params = { api_key: 'aedaf37b2e5efcb5e791bdd5963aaeb6' };
        try {
            if (searchValue) {
                baseUrl = baseUrl + 'search/movie';
                params = Object.assign(params, { query: searchValue })
            } else {
                baseUrl = baseUrl + 'movie/upcoming/'
            }
            let response = await axios.get(baseUrl, { params: params });
            if (response && response.data && response.data.results) {
                setMovieList(response.data.results)
            }
        } catch (ex) {
            return { error: "" };
        }
    }, [searchValue])

    const onMovieDetailClick = (id) => {
        history.push(`/movie-details/${id}`)
    }

    return (
        <Fragment>
            <Header onSearch={debounced} value={searchValue} />
            <Row className="pad-7 body-cont">
                {
                    movieList.map((e) => {
                        return (
                            <div className="pad-7 width-20" key={e.id}>
                                <Card>
                                    <CardImg onClick={() => onMovieDetailClick(e.id)} src={(e.poster_path) ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${e.poster_path}` : (NoImg)} alt="No Images Available" height="378" width="auto" className="cursor-pnt" />
                                    <CardBody className="card-body-min-ht">
                                        <Row>
                                            <Col sm="10" md="10" lg="10">
                                                <CardTitle tag="h6" onClick={() => onMovieDetailClick(e.id)} className="cursor-pnt">{e.title}</CardTitle>
                                            </Col>
                                            <Col sm="2" md="2" lg="2">
                                                <CardText className="text-rt">
                                                    <small className="text-muted">({e.vote_average}/10)</small>
                                                </CardText>
                                            </Col>
                                        </Row>
                                        <CardText className="movie-desc">{e.overview}</CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })
                }
            </Row >
        </Fragment>
    )
}

export default memo(MovieList)