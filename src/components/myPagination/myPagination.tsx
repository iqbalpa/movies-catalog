import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationNextDouble,
  PaginationPreviousDouble,
} from '@/components/ui/pagination';

interface IMyPagination {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  handleClickPrev: () => void;
  handleClickNext: () => void;
}

const MyPagination: React.FC<IMyPagination> = ({
  currentPage,
  setCurrentPage,
  handleClickNext,
  handleClickPrev,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPreviousDouble
            onClick={() => setCurrentPage(1)}
            className="hover:cursor-pointer"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            onClick={handleClickPrev}
            className="hover:cursor-pointer"
          />
        </PaginationItem>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>
        {currentPage < 500 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={handleClickNext}
            className="hover:cursor-pointer"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNextDouble
            onClick={() => setCurrentPage(500)}
            className="hover:cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MyPagination;
