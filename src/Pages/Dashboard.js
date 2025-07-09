import  { Component } from "react";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import SortableHeader from "../components/SortableHeader";
import "./style.css"; 

class Dashboard extends Component {
  state = {
      allComments: [],
      filteredComments: [],
      loading: true,
      error: null,
      currentPage: parseInt(localStorage.getItem("currentPage"), 10) || 1,
      pageSize: parseInt(localStorage.getItem("pageSize"), 10) || 10,
      searchTerm: localStorage.getItem("searchTerm") || "",
      sortConfig:
        JSON.parse(localStorage.getItem("sortConfig")) || { key: null, direction: "none" },
    };
  

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/comments");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      this.setState({ allComments: data, loading: false }, this.applyFilters);
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { allComments, searchTerm, sortConfig, currentPage, pageSize } = this.state;

    // Persist state to localStorage when these change
    if (
      prevState.currentPage !== currentPage ||
      prevState.pageSize !== pageSize ||
      prevState.searchTerm !== searchTerm ||
      JSON.stringify(prevState.sortConfig) !== JSON.stringify(sortConfig)
    ) {
      localStorage.setItem("currentPage", currentPage.toString());
      localStorage.setItem("pageSize", pageSize.toString());
      localStorage.setItem("searchTerm", searchTerm);
      localStorage.setItem("sortConfig", JSON.stringify(sortConfig));
    }

    // Applying filters when dependencies change
    if (
      prevState.allComments !== allComments ||
      prevState.searchTerm !== searchTerm ||
      JSON.stringify(prevState.sortConfig) !== JSON.stringify(sortConfig)
    ) {
      this.applyFilters();
    }
  }

  applyFilters = () => {
    const { allComments, searchTerm, sortConfig } = this.state;
    let filtered = [...allComments];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((comment) =>
        comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortConfig.key && sortConfig.direction !== "none") {
      filtered.sort((a, b) => {
        const aValue = String(a[sortConfig.key]).toLowerCase();
        const bValue = String(b[sortConfig.key]).toLowerCase();
        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    this.setState({ filteredComments: filtered, currentPage: 1 });
  };

  handlePageChange = (page) => {
    const totalPages = Math.ceil(this.state.filteredComments.length / this.state.pageSize);
    if (page >= 1 && page <= totalPages) {
      this.setState({ currentPage: page });
    }
  };

  handlePageSizeChange = (newSize) => {
  this.setState({ pageSize: newSize, currentPage: 1 });
};

  handleSearchChange = (value) => {
    this.setState({ searchTerm: value });
  };

  handleSort = (key) => {
    let direction = "ascending";
    const { sortConfig } = this.state;
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") direction = "descending";
      else if (sortConfig.direction === "descending") direction = "none";
      else direction = "ascending";
    }
    this.setState({ sortConfig: { key, direction } });
  };

  getCurrentPageComments = () => {
    const { filteredComments, currentPage, pageSize } = this.state;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredComments.slice(startIndex, endIndex);
  };

  render() {
    const {
      loading,
      error,
      sortConfig,
      currentPage,
      filteredComments,
      pageSize,
      allComments,
    } = this.state;

    const totalPages = Math.ceil(filteredComments.length / pageSize);

    if (loading) {
      return (
        <div className="spinner-container">
          <div className="loader-circles">
            <div></div><div></div><div></div><div></div>
          </div>
          <p className="loading-text">Loading comments data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <p className="error-text">Error: {error}</p>
        </div>
      );
    }

    return (
      <div className="dashboard-container">
        <div className="controls-container">
          <div className="sort-buttons">
            {["postId", "name", "email"].map((key) => (
              <button
                key={key}
                onClick={() => this.handleSort(key)}
                className={`sort-button ${
                  sortConfig.key === key && sortConfig.direction !== "none"
                    ? "active"
                    : ""
                }`}
              >
                Sort {key === "postId" ? "Post ID" : key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                {sortConfig.key === key && sortConfig.direction !== "none"
                  ? sortConfig.direction === "ascending"
                    ? "▲"
                    : "▼"
                  : ""}
              </button>
            ))}
          </div>
          <div className="search-bar-container">
            <SearchBar
              searchTerm={this.state.searchTerm}
              onSearchChange={this.handleSearchChange}
              placeholder="Search name, email, comment"
            />
          </div>
        </div>

        <div className="table-container">
          <table className="comments-table">
            <thead>
              <tr>
                <SortableHeader
                  columnKey="postId"
                  columnName="Post ID"
                  sortConfig={sortConfig}
                  onSort={this.handleSort}
                />
                <SortableHeader
                  columnKey="name"
                  columnName="Name"
                  sortConfig={sortConfig}
                  onSort={this.handleSort}
                />
                <SortableHeader
                  columnKey="email"
                  columnName="Email"
                  sortConfig={sortConfig}
                  onSort={this.handleSort}
                />
                <th className="table-header">Comment</th>
              </tr>
            </thead>
            <tbody>
              {this.getCurrentPageComments().map((comment) => (
                <tr key={comment.id} className="table-row">
                  <td>{comment.postId}</td>
                  <td>{comment.name}</td>
                  <td>{comment.email}</td>
                  <td>{comment.body}</td>
                </tr>
              ))}
              {this.getCurrentPageComments().length === 0 && (
                <tr>
                  <td colSpan="4" className="no-comments">
                    No comments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={this.handlePageSizeChange}
          filteredCommentsLength={filteredComments.length}
          totalItems={allComments.length}
        />
      </div>
    );
  }
}

export default Dashboard;
