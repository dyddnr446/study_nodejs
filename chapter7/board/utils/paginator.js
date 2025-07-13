import lodash from 'lodash'
const PAGE_LIST_SIZE = 10;

//총 개수, 페이지, 한 페이지에 표시하는 게시물 개수를 매개변수로 받음
export default ({totalCount, page, perPage = 10 }) =>{
    const PER_PAGE = perPage;
    const totalPage = Math.ceil(totalCount/PER_PAGE);

    //시작 페이지 목 * PAGE_LIST_SIZE + 1
    let quotient = parseInt(page/PAGE_LIST_SIZE);
    if (page % PAGE_LIST_SIZE === 0){
        quotient-=1;
    }
    const startPage = quotient * PAGE_LIST_SIZE + 1;
    //23페이지 start = 21, 30 < 23 totalPage
    //끝 페이지 : startPage + PAGE_LIST_SIZE - 1
    const endPage = startPage + PAGE_LIST_SIZE - 1 < totalPage ? startPage + PAGE_LIST_SIZE - 1 : totalPage;
    const isFirstPage = page === 1;
    const isLastPage = page === totalPage;
    const hasPrev = page > 1;
    const hasNext = page < totalPage;

    const paginator = {
        pageList: lodash.range(startPage, endPage+1),
        page,
        prevPage : page -1,
        nextPage : page +1,
        startPage,
        LastPage : totalPage,
        hasPrev,
        hasNext,
        isFirstPage,
        isLastPage,
    };
    return paginator;
}