import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const Paginate = ({pages, page, isAdmin = false, keyword = '', loc}) => {

    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  return (
    pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer onClick={topFunction}
                key={x + 1}
                to={
                    !isAdmin
                    ? (keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x + 1}`)
                    : loc === 'orderlist' 
                    ? `/admin/orderlist/${x + 1}` 
                    : loc === 'profile' 
                    ? `/profile/${x + 1}`
                    : `/admin/productlist/${x + 1}`
                }>
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>

            ))}
        </Pagination>
    )
  )
}

export default Paginate