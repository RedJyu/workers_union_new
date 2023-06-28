function generatePaginationHTML(currentPage, totalPages) {
  let paginationHTML = '';

  if (currentPage > 1) {
    paginationHTML += `<a ID="pagination" href="?page=${
      currentPage - 1
    }"><i class="fas fa-chevron-left"></i></a> `;
  }

  if (totalPages <= 3) {
    for (let page = 1; page <= totalPages; page++) {
      if (page === currentPage) {
        paginationHTML += `<span class="current-page">${page}</span> `;
      } else {
        paginationHTML += `<a ID="pagination" href="?page=${page}">${page}</a> `;
      }
    }
  } else {
    if (currentPage <= 2) {
      for (let page = 1; page <= 3; page++) {
        if (page === currentPage) {
          paginationHTML += `<span class="current-page">${page}</span> `;
        } else {
          paginationHTML += `<a ID="pagination" href="?page=${page}">${page}</a> `;
        }
      }
      paginationHTML += `<a ID="pagination" href="?page=${totalPages}">${totalPages}</a> `;
    } else if (currentPage >= totalPages - 1) {
      paginationHTML += `<a ID="pagination" href="?page=1">1</a> `;
      paginationHTML += `<span class="ellipsis">...</span> `;
      for (let page = totalPages - 2; page <= totalPages; page++) {
        if (page === currentPage) {
          paginationHTML += `<span class="current-page">${page}</span> `;
        } else {
          paginationHTML += `<a ID="pagination" href="?page=${page}">${page}</a> `;
        }
      }
    } else {
      paginationHTML += `<a ID="pagination" href="?page=1">1</a> `;
      paginationHTML += `<a ID="pagination" href="?page=${currentPage - 1}">${
        currentPage - 1
      }</a> `;
      paginationHTML += `<span class="current-page">${currentPage}</span> `;
      paginationHTML += `<a ID="pagination" href="?page=${currentPage + 1}">${
        currentPage + 1
      }</a> `;
      paginationHTML += `<span class="ellipsis">...</span> `;
      paginationHTML += `<a ID="pagination" href="?page=${totalPages}">${totalPages}</a> `;
    }
  }

  if (currentPage < totalPages) {
    paginationHTML += `<a ID="pagination" href="?page=${
      currentPage + 1
    }"><i class="fas fa-chevron-right"></i></a> `;
  }

  return paginationHTML;
}

export default generatePaginationHTML;
