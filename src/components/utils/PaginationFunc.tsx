import Pagination from "react-js-pagination";
import { Flex } from "@chakra-ui/react";
import styles from '/styles/pagination.module.css';

export default function PaginationFunc(props:any) {
  return (
    <Flex flexDirection={'row'}>
      <Pagination
        activePage={props.page}
        itemsCountPerPage={10}
        totalItemsCount={props.dataLength}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={props.activePage}
        itemClass={styles.pagination}
        activeClass={styles.active}
      />
    </Flex>
  )
}