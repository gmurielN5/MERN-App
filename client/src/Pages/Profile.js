import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

import { AuthContext } from "../Context/AuthContext"

import FilterButton from "../Components/Article/FilterSelector/FilterButton"

import CardPost from "../Components/Article/Card/Card"

const FILTER_MAP = {
  drafts: (article) => article.status === "Draft",
  published: (article) => article.status === "Published",
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

const Profile = () => {
  const { store, dispatch } = useContext(AuthContext)
  const { user } = store

  const [filteredArticles, setFilteredArticles] = useState(user.articles)
  const [filter, setFilter] = useState()

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const handleFilter = (filteredData) => {
    if (!filter) {
      return filteredData
    }
    const filtered = filteredData.filter(FILTER_MAP[filter])
    return filtered
  }

  useEffect(() => {
    let filteredData = handleFilter(user.articles)
    setFilteredArticles(filteredData)
  }, [user.articles, filter])

  return (
    <Container fluid>
      <Row className="border-bottom p-2">
        <Col>
          <h5 className="d-none d-sm-block py-2">your stories</h5>
        </Col>
        <Col className="d-flex justify-content-end align-items-baseline">
          {filterList}
        </Col>
      </Row>

      <Container className="p-4">
        <Row>
          {filteredArticles.length > 0 ? (
            <Col className="pt-5 px-0">
              {filteredArticles.map((article, i) => (
                <Col key={i} className="mb-5">
                  <CardPost
                    article={article}
                    author={user}
                    index={i}
                    thumbnail
                    dispatch={dispatch}
                  />
                </Col>
              ))}
            </Col>
          ) : (
            <Col className="pt-5 px-0">
              <Link to={"/dashboard/new"}>
                <p className="text-center">Write your first article</p>
              </Link>
            </Col>
          )}
        </Row>
      </Container>
    </Container>
  )
}

export default Profile
