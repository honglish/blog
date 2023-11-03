import { Grid, Button } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const pagesToShow = 4;
  const currentPageSet = Math.ceil(currentPage / pagesToShow);
  const pageSets = Array.from(
    { length: Math.ceil(totalPages / pagesToShow) },
    (_, index) => index + 1
  );
  const pagesInCurrentSet = pageNumbers.slice(
    (currentPageSet - 1) * pagesToShow,
    currentPageSet * pagesToShow
  );

  const handlePreviousSet = () => {
    if (currentPageSet > 1) {
      onPageChange((currentPageSet - 1) * pagesToShow);
    }
  };

  const handleNextSet = () => {
    if (currentPageSet < pageSets.length) {
      onPageChange(currentPageSet * pagesToShow + 1);
    }
  };

  return (
    <Grid
      gap="4px"
      justifyContent="center"
      templateColumns="repeat(6, 1fr)"
      maxW="400px"
      justifySelf="center"
    >
      <Button
        onClick={handlePreviousSet}
        colorScheme="teal"
        size="sm"
        mr="2"
        isDisabled={currentPageSet === 1}
      >
        Prev
      </Button>

      {pagesInCurrentSet.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          colorScheme={currentPage === pageNumber ? "teal" : "gray"}
          size="sm"
          mr="2"
        >
          {pageNumber}
        </Button>
      ))}

      <Button
        onClick={handleNextSet}
        colorScheme="teal"
        size="sm"
        isDisabled={currentPageSet === pageSets.length}
      >
        Next
      </Button>
    </Grid>
  );
};

export default Pagination;
